import {
  CharCategory,
  combineConfig,
  Facet,
  findClusterBreak,
  Prec,
  RangeSetBuilder,
  StateEffect,
  StateField,
} from '@codemirror/state'
import { SearchCursor } from '@codemirror/search'
import { Decoration, EditorView, ViewPlugin } from '@codemirror/view'

const searchHighlightConfigFacet = Facet.define({
  combine(configs) {
    return combineConfig(configs, {
      caseSensitive: false,
      literal: false,
      wholeWord: false,
    })
  },
})

export class SearchHighlightQuery {
  constructor(config) {
    this.search = config.search
    this.caseSensitive = !!config.caseSensitive
    this.literal = !!config.literal
    this.valid = !!this.search
    this.unquoted = this.unquoted(this.search)
    this.wholeWord = !!config.wholeWord
  }

  unquote(text) {
    return this.literal
      ? text
      : text.replace(/\\([nrt\\])/g, (_, ch) =>
          ch == 'n' ? '\n' : ch == 'r' ? '\r' : ch == 't' ? '\t' : '\\',
        )
  }

  eq(other) {
    return (
      this.search === other.search &&
      this.caseSensitive === other.caseSensitive &&
      this.wholeWord === other.wholeWord
    )
  }

  create() {
    return new StringQuery(this)
  }
}

export function searchHighlight(config) {
  return config ? [searchHighlightConfigFacet.of(config), searchExtensions] : searchExtensions
}

function stringCursor(spec, state, from, to) {
  return new SearchCursor(
    state.doc,
    spec.unquoted,
    from,
    to,
    spec.caseSensitive ? undefined : (x) => x.toLowerCase(),
    spec.wholeWord
      ? stringWordTest(state.doc, state.charCategorizer(state.selection.main.head))
      : undefined,
  )
}

function stringWordTest(doc, categorier) {
  return (from, to, buf, bufPos) => {
    if (bufPos > from || bufPos + buf.length < to) {
      bufPos = Math.max(0, from - 2)
      buf = doc.sliceString(bufPos, Math.min(doc.length, to + 2))
    }
    return (
      (categorier(charBefore(buf, from - bufPos)) != CharCategory.Word ||
        categorier(charAfter(buf, from - bufPos)) != CharCategory.Word) &&
      (categorier(charBefore(buf, to - bufPos)) != CharCategory.Word ||
        categorier(charAfter(buf, to - bufPos)) != CharCategory.Word)
    )
  }
}

class StringQuery {
  constructor(spec) {
    this.spec = spec
  }

  highlight(state, from, to, add) {
    let cursor = stringCursor(
      this.spec,
      state,
      Math.max(0, from - this.spec.unquoted.length),
      Math.min(to + this.spec.unquoted.length, state.doc.length),
    )
    while (!cursor.next().done) {
      add(cursor.value.from, cursor.value.to)
    }
  }
}

function charBefore(str, index) {
  return str.slice(findClusterBreak(str, index, false), index)
}

function charAfter(str, index) {
  return str.slice(index, findClusterBreak(str, index))
}

export const setSearchQuery = StateEffect.define()

const searchState = StateField.define({
  create(state) {
    return new SearchState(defaultQuery(state).create())
  },
  update(value, tr) {
    for (let effect of tr.effects) {
      if (effect.is(setSearchQuery)) {
        value = new SearchState(effect.value.create())
      }
    }
    return value
  },
})

export function getSearchQuery(state) {
  let curState = state.field(searchState, false)
  return curState ? curState.query.spec : defaultQuery(state)
}

class SearchState {
  constructor(query) {
    this.query = query
  }
}

const matchMark = Decoration.mark({ class: 'cm-searchMatch' }),
  selectedMatchMark = Decoration.mark({ class: 'cm-searchMatch cm-searchMatch-selected' })

const searchHighlighter = ViewPlugin.fromClass(
  class {
    decorations

    constructor(view) {
      this.view = view
      this.decorations = this.highlight(view.state.field(searchState))
    }

    update(update) {
      let state = update.state.field(searchState)
      if (
        state != update.startState.field(searchState) ||
        update.docChanged ||
        update.selectionSet ||
        update.viewportChanged
      ) {
        this.decorations = this.highlight(state)
      }
    }

    highlight({ query }) {
      if (!query.spec.valid) return Decoration.none
      let { view } = this
      let builder = new RangeSetBuilder()
      for (let i = 0, ranges = view.visibleRanges, l = ranges.length; i < l; i++) {
        let { from, to } = ranges[i]
        while (i < l - 1 && to > ranges[i + 1].from - 2 * 250) to = ranges[++i].to
        query.highlight(view.state, from, to, (from, to) => {
          let selected = view.state.selection.ranges.some((r) => r.from == from && r.to == to)
          builder.add(from, to, selected ? selectedMatchMark : matchMark)
        })
      }
      return builder.finish()
    }
  },
)

function defaultQuery(state, fallback) {
  let sel = state.selection.main
  let selText = sel.empty || sel.to > sel.from + 100 ? '' : state.sliceDoc(sel.from, sel.to)
  if (fallback && !selText) return fallback
  let config = state.facet(searchHighlightConfigFacet)
  return new SearchHighlightQuery({
    search: (fallback?.literal ?? config.literal) ? selText : selText.replace(/\n/g, '\\n'),
    caseSensitive: fallback?.caseSensitive ?? config.caseSensitive,
    literal: fallback?.literal ?? config.literal,
    wholeWord: fallback?.wholeWord ?? config.wholeWord,
  })
}

const baseTheme = EditorView.baseTheme({
  '.cm-panel.cm-search': {
    padding: '2px 6px 4px',
    position: 'relative',
    '& [name=close]': {
      position: 'absolute',
      top: '0',
      right: '4px',
      backgroundColor: 'inherit',
      border: 'none',
      font: 'inherit',
      padding: 0,
      margin: 0,
    },
    '& input, & button, & label': {
      margin: '.2em .6em .2em 0',
    },
    '& input[type=checkbox]': {
      marginRight: '.2em',
    },
    '& label': {
      fontSize: '80%',
      whiteSpace: 'pre',
    },
  },

  '&light .cm-searchMatch': { backgroundColor: '#ffff0054' },
  '&dark .cm-searchMatch': { backgroundColor: '#00ffff8a' },

  '&light .cm-searchMatch-selected': { backgroundColor: '#ff6a0054' },
  '&dark .cm-searchMatch-selected': { backgroundColor: '#ff00ff8a' },
})

const searchExtensions = [searchState, Prec.lowest(searchHighlighter), baseTheme]
