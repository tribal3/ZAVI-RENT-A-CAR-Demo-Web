import { useLanguage } from '../i18n/LanguageContext'

interface LogoProps {
  variant?: 'light' | 'dark'
  className?: string
}

export function Logo({ variant = 'light', className = '' }: LogoProps) {
  const { lang } = useLanguage()

  return (
    <a
      className={`logo logo--${variant} ${className}`.trim()}
      href="#home"
      aria-label="ZAVI RENT A CAR — home"
    >
      <span className="logo__mark">
        <svg viewBox="0 0 44 44" aria-hidden="true" focusable="false">
          <rect
            x="0.8"
            y="0.8"
            width="42.4"
            height="42.4"
            rx="10"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.32"
          />
          <path
            d="M13 14h18L13 30h18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinejoin="miter"
          />
          <path d="M13 35h18" fill="none" stroke="#c7a15f" strokeWidth="2.2" />
        </svg>
      </span>
      <span className="logo__text">
        {lang === 'ar' ? (
          <>
            <strong className="logo__name logo__name--ar">زاوي</strong>
            <span className="logo__sub">لتأجير السيارات</span>
          </>
        ) : (
          <>
            <strong className="logo__name">ZAVI</strong>
            <span className="logo__sub">Rent a Car</span>
          </>
        )}
      </span>
    </a>
  )
}
