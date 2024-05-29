import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import en from "./locales/en/translation.json";
import ru from "./locales/ru/translation.json";
import uz from "./locales/uz/translation.json";

export const supportedLngs = {
  en: 'en',
  ru: 'ru',
  uz: 'uz'
}

const resources = {
  en: {
    translation: {
      ...en
    }
  },
  ru: {
    translation: {
      ...ru
    }
  },
  uz: {
    translation: {
      ...uz
    }
  }
}
i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    interpolation: {
      escapeValue: false
    },
  })

export default i18next;