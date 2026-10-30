import { useLanguage } from '../i18n/LanguageContext'
import { BUSINESS } from '../data/vehicles'
import { IconPhone, IconPin, IconStar } from './Icons'

export function TrustStrip() {
  const { t } = useLanguage()

  return (
    <section className="trust" aria-label={t.trust.ratingLabel}>
      <div className="container trust__inner">
        <div className="trust__rating">
          <div className="trust__stars" aria-label={`${BUSINESS.rating} / 5`}>
            {Array.from({ length: 5 }, (_, index) => (
              <IconStar key={index} size={16} />
            ))}
          </div>
          <p className="trust__score">
            <strong>{BUSINESS.rating}</strong>
            <span>{t.trust.reviews}</span>
          </p>
        </div>

        <div className="trust__item">
          <IconPin size={20} />
          <div>
            <strong>{t.trust.baseValue}</strong>
            <span>{t.trust.baseLabel}</span>
          </div>
        </div>

        <div className="trust__item">
          <IconPhone size={20} />
          <div>
            <a href={BUSINESS.phoneHref}>{t.trust.contactValue}</a>
            <span>{t.trust.contactLabel}</span>
          </div>
        </div>
      </div>
      <p className="container trust__source">{t.trust.sourceNote}</p>
    </section>
  )
}
