import {Decoration, EditorView, ViewPlugin} from '@codemirror/view'
import {CharCategory, combineConfig, Facet, findClusterBreak, Prec, RangeSetBuilder,} from '@codemirror/state'
import {RegExpCursor, SearchCursor} from '@codemirror/search'
import {chain} from 'lodash-es'
import colors from 'vuetify/util/colors'

const logLanguageConfigFacet = Facet.define({
    combine(configs) {
        return combineConfig(configs, {
            logLevels: [
                {name: 'TRACE', color: 'fatal'},
                {name: 'DEBUG', color: 'info'},
                {name: 'INFO', color: 'success'},
                {name: 'WARN', color: 'warning'},
                {name: 'ERROR', color: 'error'},
            ],
        })
    },
})

export function logLanguage(config) {
    return config
        ? [logLanguageConfigFacet.of(config), logLanguageExtensions]
        : [logLanguageExtensions]
}

function stringWordTest(doc, categorizer) {
    return (from, to, buf, bufPos) => {
        if (bufPos > from || bufPos + buf.length < to) {
            bufPos = Math.max(0, from - 2)
            buf = doc.sliceString(bufPos, Math.min(doc.length, to + 2))
        }
        return (
            (categorizer(charBefore(buf, from - bufPos)) !== CharCategory.Word ||
                categorizer(charAfter(buf, from - bufPos)) !== CharCategory.Word) &&
            (categorizer(charAfter(buf, to - bufPos)) !== CharCategory.Word ||
                categorizer(charBefore(buf, to - bufPos)) !== CharCategory.Word)
        )
    }
}

function charBefore(str, index) {
    return str.slice(findClusterBreak(str, index, false), index)
}

function charAfter(str, index) {
    return str.slice(index, findClusterBreak(str, index))
}

const searchHighlighter = ViewPlugin.fromClass(
    class {
        decorations
        view

        constructor(view) {
            const config = view.state.facet(logLanguageConfigFacet)
            this.view = view
            this.decorations = this.highlight(config)
        }

        update(update) {
            if (update.docChanged || update.selectionSet || update.viewportChanged) {
                const config = update.state.facet(logLanguageConfigFacet)
                this.decorations = this.highlight(config)
            }
        }

        highlightLogLevel(logLevel, state, from, to, add) {
            const cursor = new SearchCursor(
                state.doc,
                logLevel.name,
                Math.max(0, from - logLevel.name.length),
                Math.min(to + logLevel.name.length, state.doc.length),
                undefined,
                stringWordTest(state.doc, state.charCategorizer(state.selection.main.head)),
            )
            while (!cursor.next().done) {
                add(cursor.value.from, cursor.value.to)
            }
        }

        highlightTimestamp(state, from, to, add) {
            const cursor = new RegExpCursor(
                state.doc,
                '\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}\\+\\d{2}:\\d{2}',
                {},
                Math.max(0, from),
                Math.min(to, state.doc.length),
            )
            while (!cursor.next().done) {
                add(cursor.value.from, cursor.value.to)
            }
        }

        highlight(config) {
            if (!config.logLevels?.length) {
                return Decoration.none
            }

            const {view} = this

            const rangeDecorations = []
            for (let i = 0, ranges = view.visibleRanges, l = ranges.length; i < l; i += 1) {
                let {from, to} = ranges[i]
                while (i < l - 1 && to > ranges[i + 1].from - 2 * 250) to = ranges[++i].to

                this.highlightTimestamp(view.state, from, to, (from, to) => {
                    rangeDecorations.push({
                        from,
                        to,
                        decoration: Decoration.mark({class: `cm-logLanguage cm-logLanguage-timestamp`}),
                    })
                })

                for (const logLevel of config.logLevels) {
                    this.highlightLogLevel(logLevel, view.state, from, to, (from, to) => {
                        rangeDecorations.push({
                            from,
                            to,
                            decoration: Decoration.mark({
                                class: `cm-logLanguage cm-logLanguage-${logLevel.color}`,
                            }),
                        })
                    })
                }
            }

            const builder = new RangeSetBuilder()
            chain(rangeDecorations)
                .sortBy('from')
                .forEach(({from, to, decoration}) => builder.add(from, to, decoration))
                .value()
            return builder.finish()
        }
    },
    {
        decorations: (v) => v.decorations,
    },
)

const baseTheme = EditorView.baseTheme({
    '.cm-logLanguage-timestamp': {color: colors.yellow.base},
    '.cm-logLanguage-info': {color: colors.blue.base},
    '.cm-logLanguage-success': {color: colors.blue.base},
    '.cm-logLanguage-warning': {color: 'primary'},
    '.cm-logLanguage-error': {color: 'red'},
    '.cm-logLanguage-fatal': {color: 'primary'},
    '.cm-logLanguage-green': {color: colors.amber.base},
})

const logLanguageExtensions = [Prec.lowest(searchHighlighter), baseTheme]
