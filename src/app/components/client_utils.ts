/**
 * switches locale from de to en and vice verca
 * @param locale current locale (language)
 * @param pathName current path of the website which the user is on
 * @returns new pathName with switched out locale
 */
export function replaceLocale(locale: string, pathName: string) {
  return locale === "de"
    ? pathName.replace(locale, "en")
    : pathName.replace(locale, "de");
}

/**
 * Determine contrasting color
 * @param bgColor current background color
 * @returns contrasting color based on background color
 */
// Determine contrasting color
export function getContrastingColor(bgColor: string) {
  const rgbMatch = bgColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!rgbMatch) return "black"; // Fallback if parsing fails

  const r = parseInt(rgbMatch[1], 10);
  const g = parseInt(rgbMatch[2], 10);
  const b = parseInt(rgbMatch[3], 10);
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 128 ? "black" : "white";
}

/**
 * gets the background color behind a certain HTMLElement of your choice
 * @param nav the HTMLElement of which get the background color behind it
 * @returns the background color behind a given HTMLelement
 */
export function getBackgroundColorBehindNav(nav: HTMLElement): string {
  const originalPointerEvents = nav.style.pointerEvents;
  nav.style.pointerEvents = "none";

  const rect = nav.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const elBehindNav = document.elementFromPoint(
    centerX,
    centerY,
  ) as HTMLElement;

  nav.style.pointerEvents = originalPointerEvents;

  if (!elBehindNav) return "rgb(255, 255, 255)";

  let bgColor = window.getComputedStyle(elBehindNav).backgroundColor;

  let parent = elBehindNav.parentElement;
  while (
    parent &&
    (bgColor === "transparent" || bgColor === "rgba(0, 0, 0, 0)")
  ) {
    bgColor = window.getComputedStyle(parent).backgroundColor;
    parent = parent.parentElement;
  }

  return bgColor;
}
