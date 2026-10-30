import { useLanguage } from '../i18n/LanguageContext'
import { IconCalendar, IconCategory, IconChat, IconHeart, IconPhone } from './Icons'

const ICONS = [IconPhone, IconCategory, IconCalendar, IconHeart, IconChat]

export function WhyChoose() {
  const { t } = useLanguage()

  return (
    <section className="section why" id="why" aria-labelledby="why-title">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">{t.why.eyebrow}</p>
            <h2 id="why-title" className="section-title">
              {t.why.title}
            </h2>
          </div>
          <p className="section-lead">{t.why.lead}</p>
        </div>

        <ul className="why__grid">
          {t.why.items.map((item, index) => {
            const Icon = ICONS[index] ?? IconChat
            return (
              <li className="why-card" key={item.title}>
                <span className="why-card__icon">
                  <Icon size={22} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
