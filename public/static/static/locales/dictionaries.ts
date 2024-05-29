import 'server-only'

const dictionaries = {
    en: () => import('./en/hello.json').then((module) => module.default),
    de: () => import('./de/hello.json').then((module) => module.default)
}

export const getDictionary = async (locale) => dictionaries[locale]()
