import { translations } from "./translations";

export function useTranslations(lang: string = "en") {
  const normalizedLang = (
    ["en", "fr"].includes(lang) ? lang : "en"
  ) as keyof typeof translations;
  return function translate(
    key: keyof (typeof translations)[typeof normalizedLang]
  ) {
    return translations[normalizedLang][key];
  };
}
