import { useLanguage } from '../i18n/LanguageContext'
import { IconArrow } from './Icons'

export function About() {
  const { t } = useLanguage()

  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container about__grid">
        <div className="about__copy">
          <p className="eyebrow">{t.about.eyebrow}</p>
          <h2 id="about-title" className="section-title">
            {t.about.title}
          </h2>
          {t.about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="about__paragraph">
              {paragraph}
            </p>
          ))}
          <a className="link-arrow" href="#contact">
            {t.nav.contact}
            <IconArrow size={17} />
          </a>
        </div>

        <div className="about__media">
          <div className="about__image">
            <img
              src="/images/cars/suv-crv.jpg"
              alt={t.about.imageAlt}
              width={1000}
              height={640}
              loading="lazy"
              decoding="async"
            />
          </div>
          <ul className="about__stats">
            {t.about.stats.map((stat) => (
              <li key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </li>
            ))}
          </ul>
          <p className="about__note">{t.about.note}</p>
        </div>
      </div>
    </section>
  )
}
