import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { content, type SiteContent } from '../data/content'
import type { Language } from '../types'

interface LanguageContextValue {
  lang: Language
  dir: 'ltr' | 'rtl'
  isRtl: boolean
  t: SiteContent
  setLang: (language: Language) => void
  toggleLang: () => void
  formatDate: (isoDate: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = 'zavi-language'

function readStoredLanguage(): Language {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'ar') return stored
  } catch {
    /* storage may be unavailable — fall back to English */
  }
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(readStoredLanguage)
  const dir = lang === 'ar' ? 'rtl' : 'ltr'
  const t = content[lang]

  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = dir
    document.title = t.meta.title

    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (description) description.content = t.meta.description

    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
    if (ogTitle) ogTitle.content = t.meta.title

    const ogDescription = document.querySelector<HTMLMetaElement>(
      'meta[property="og:description"]',
    )
    if (ogDescription) ogDescription.content = t.meta.description

    const ogLocale = document.querySelector<HTMLMetaElement>('meta[property="og:locale"]')
    if (ogLocale) ogLocale.content = lang === 'ar' ? 'ar_OM' : 'en_OM'

    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore storage errors */
    }
  }, [lang, dir, t])

  const setLang = useCallback((language: Language) => setLangState(language), [])
  const toggleLang = useCallback(
    () => setLangState((current) => (current === 'en' ? 'ar' : 'en')),
    [],
  )

  const formatDate = useCallback(
    (isoDate: string) => {
      if (!isoDate) return ''
      const date = new Date(`${isoDate}T00:00:00`)
      if (Number.isNaN(date.getTime())) return isoDate
      return new Intl.DateTimeFormat(t.locale, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(date)
    },
    [t.locale],
  )

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, dir, isRtl: dir === 'rtl', t, setLang, toggleLang, formatDate }),
    [lang, dir, t, setLang, toggleLang, formatDate],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider')
  return context
}
