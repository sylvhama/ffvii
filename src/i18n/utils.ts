import { getRelativeLocaleUrl as astroGetRelativeLocaleUrl } from "astro:i18n";
import { translations } from "./translations";

export function useTranslations(lang: string) {
  const normalizedLang = (
    ["en", "fr"].includes(lang) ? lang : "en"
  ) as keyof typeof translations;
  return function translate(
    key: keyof (typeof translations)[typeof normalizedLang]
  ) {
    return translations[normalizedLang][key];
  };
}

export function getOtherLocalePathname(isFrench: boolean, pathname: string) {
  if (!isFrench) {
    const frenchPathname = `/fr${pathname}`;
    return frenchPathname.endsWith("/")
      ? frenchPathname.slice(0, -1)
      : frenchPathname;
  }

  return pathname.replace("fr/", "").replace("/fr", "/");
}

export function getRelativeLocaleUrl(locale: string, path: string) {
  const relativeUrl = astroGetRelativeLocaleUrl(locale, path);
  return relativeUrl.length > 1 && relativeUrl.endsWith("/")
    ? relativeUrl.slice(0, -1)
    : relativeUrl;
}
