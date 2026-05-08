import { useSelector } from 'react-redux'

export const useTranslate = () => {
  const { locale, dictionaries } = useSelector(state => state.i18n)

  return key => dictionaries?.[locale]?.[key] || key
}
