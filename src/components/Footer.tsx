import { BUSINESS } from '../data/vehicles'
import { useLanguage } from '../i18n/LanguageContext'
import { IconArrow, IconPhone, IconPin, IconWhatsApp } from './Icons'
import { Logo } from './Logo'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <div className="container footer__top">
        <div className="footer__brand">
          <Logo />
          <p>{t.footer.tagline}</p>
          <div className="footer__contact">
            <a href={BUSINESS.phoneHref}>
              <IconPhone size={17} />
              {BUSINESS.phoneDisplay}
            </a>
            <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer">
              <IconWhatsApp size={17} />
              WhatsApp
            </a>
          </div>
        </div>

        <div className="footer__cols">
          <div>
            <h3>{t.footer.fleetTitle}</h3>
            <ul>
              <li>
                <a href="#fleet">{t.nav.fleet}</a>
              </li>
              <li>
                <a href="#how-it-works">{t.steps.eyebrow}</a>
              </li>
              <li>
                <a href="#explore">{t.nav.explore}</a>
              </li>
            </ul>
          </div>

          <div>
            <h3>{t.footer.companyTitle}</h3>
            <ul>
              <li>
                <a href="#about">{t.nav.about}</a>
              </li>
              <li>
                <a href="#why">{t.nav.why}</a>
              </li>
              <li>
                <a href="#contact">{t.nav.contact}</a>
              </li>
            </ul>
          </div>

          <div>
            <h3>{t.footer.contactTitle}</h3>
            <address>
              <a
                className="footer__address"
                href={BUSINESS.directions}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconPin size={17} />
                <span>{t.contact.address}</span>
                <IconArrow size={15} />
              </a>
            </address>
          </div>
        </div>
      </div>

      <div className="container footer__bottom">
        <p className="footer__disclaimer">{t.footer.disclaimer}</p>
        <p className="footer__illustrative">{t.footer.illustrative}</p>
        <div className="footer__meta">
          <span>{t.footer.rights}</span>
          <span>{t.footer.credit}</span>
        </div>
      </div>
    </footer>
  )
}
