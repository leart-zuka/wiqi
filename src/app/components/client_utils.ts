/**
 * Switches locale from de to en and vice versa
 * @param locale current locale (language)
 * @param pathName current path of the website which the user is on
 * @returns new pathName with switched out locale
 */
export function replaceLocale(locale: string, pathName: string) {
  return locale === "de"
    ? pathName.replace(locale, "en")
    : pathName.replace(locale, "de");
}
