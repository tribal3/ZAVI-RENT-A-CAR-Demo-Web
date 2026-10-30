import { useLanguage } from '../i18n/LanguageContext'
import { IconShield } from './Icons'

export function RentalSteps() {
  const { t } = useLanguage()

  return (
    <section className="section steps" id="how-it-works" aria-labelledby="steps-title">
      <div className="container">
        <div className="section-head section-head--light">
          <div>
            <p className="eyebrow eyebrow--gold">{t.steps.eyebrow}</p>
            <h2 id="steps-title" className="section-title">
              {t.steps.title}
            </h2>
          </div>
          <p className="section-lead">{t.steps.lead}</p>
        </div>

        <ol className="steps__list">
          {t.steps.items.map((item, index) => (
            <li className="step" key={item.title}>
              <span className="step__number">{`0${index + 1}`}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>

        <p className="steps__note">
          <IconShield size={18} />
          <span>{t.steps.note}</span>
        </p>
      </div>
    </section>
  )
}
