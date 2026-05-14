import { useSelector } from 'react-redux'
import { DEFAULT_LOCALE } from '../constants/locales'
import { dictionaries } from '../dictionaries'

export const useDictionaryTranslation = () => {
    const currentLocale = useSelector(state => state.app?.locale || DEFAULT_LOCALE)

    const translate = key => {
        const currentDictionary = dictionaries[currentLocale] || dictionaries[DEFAULT_LOCALE]

        return currentDictionary[key] || dictionaries[DEFAULT_LOCALE]?.[key] || key
    }

    return {
        translate,
        currentLocale,
    }
}