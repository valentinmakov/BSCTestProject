import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import XHR from 'i18next-xhr-backend'

import translationEng from '../locales/en/translation.json'
import translationCze from '../locales/cz/translation.json'

i18n
  .use(XHR)
  .use(LanguageDetector)
  .init({
    debug: true,
    lng: 'cz',
    fallbackLng: 'cz',

    keySeparator: false,

    interpolation: {
      escapeValue: false,
    },

    resources: {
      en: {
        translations: translationEng,
      },
      cz: {
        translations: translationCze,
      },
    },
    ns: ['translations'],
    defaultNS: 'translations',
  })

export default i18n
