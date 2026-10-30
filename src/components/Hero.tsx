import { useLanguage } from '../i18n/LanguageContext'
import { IconArrow, IconShield } from './Icons'

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero__media">
        <img
          src="/images/cars/hero.jpg"
          alt={t.hero.imageAlt}
          width={2000}
          height={1250}
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <div className="hero__inner container">
        <div className="hero__content">
          <p className="eyebrow eyebrow--gold">{t.hero.eyebrow}</p>
          <h1 id="hero-title" className="hero__title">
            <span>{t.hero.titleTop}</span>
            <span className="hero__title-accent">{t.hero.titleBottom}</span>
          </h1>
          <p className="hero__lead">{t.hero.lead}</p>
          <div className="hero__actions">
            <a className="btn btn--gold" href="#fleet">
              {t.hero.primaryCta}
              <IconArrow size={18} className="btn__arrow" />
            </a>
            <a className="btn btn--outline-light" href="#contact">
              {t.hero.secondaryCta}
            </a>
          </div>
          <p className="hero__note">
            <IconShield size={17} />
            {t.hero.note}
          </p>
        </div>
      </div>
    </section>
  )
}
