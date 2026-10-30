import { useLanguage } from '../i18n/LanguageContext'
import { destinations } from '../data/vehicles'

export function ExploreOman() {
  const { t, lang } = useLanguage()

  return (
    <section className="section explore" id="explore" aria-labelledby="explore-title">
      <div className="container">
        <div className="section-head section-head--light">
          <div>
            <p className="eyebrow eyebrow--gold">{t.explore.eyebrow}</p>
            <h2 id="explore-title" className="section-title">
              {t.explore.title}
            </h2>
          </div>
          <p className="section-lead">{t.explore.lead}</p>
        </div>

        <div className="explore__grid">
          {destinations.map((destination, index) => (
            <article
              className={`dest-card dest-card--${destination.id}`}
              key={destination.id}
            >
              <img
                src={destination.image}
                alt={destination.imageAlt[lang]}
                width={1000}
                height={750}
                loading="lazy"
                decoding="async"
              />
              <div className="dest-card__overlay">
                <span className="dest-card__index">{`0${index + 1}`}</span>
                <div>
                  <h3>{destination.name[lang]}</h3>
                  <p>{destination.description[lang]}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="explore__note">{t.explore.note}</p>
      </div>
    </section>
  )
}
