import { useLanguage } from '../i18n/LanguageContext'

export function LanguageSwitcher({ full = false }: { full?: boolean }) {
  const { lang, setLang, t } = useLanguage()

  return (
    <div className="lang-switch" role="group" aria-label={t.language.label}>
      <button
        type="button"
        className={lang === 'en' ? 'is-active' : ''}
        aria-pressed={lang === 'en'}
        onClick={() => setLang('en')}
        lang="en"
      >
        {full ? t.language.en : 'EN'}
      </button>
      <span className="lang-switch__divider" aria-hidden="true" />
      <button
        type="button"
        className={lang === 'ar' ? 'is-active' : ''}
        aria-pressed={lang === 'ar'}
        onClick={() => setLang('ar')}
        lang="ar"
      >
        {full ? t.language.ar : 'ع'}
      </button>
    </div>
  )
}
