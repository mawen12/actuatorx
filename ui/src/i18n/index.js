import { createI18n } from 'vue-i18n'
import messages from './locales'
import { datetimeFormats, numberFormats } from './format'

export const i18n = createI18n({
  legacy: false,
  locale: 'en-US',
  fallbackLocale: 'en-US',

  messages,
  datetimeFormats,
  numberFormats,

  globalInjection: true,
})
