import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translation_en from './en/common.json'
import translation_ja from './ja/common.json'
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    lng: 'en',
    interpolation: {
      escapeValue: false,
      },
    resources: {
        en: {
            translation: translation_en
        },
        ja: {
            translation: translation_ja
        }
    }

  });

export default i18n;