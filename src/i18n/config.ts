import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './en.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      // Placeholders for other languages
      hi: { translation: {} },
      bn: { translation: {} },
      es: { translation: {} }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
