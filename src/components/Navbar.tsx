import { useEffect, useState } from 'react'
import { BUSINESS } from '../data/vehicles'
import { useLanguage } from '../i18n/LanguageContext'
import { IconClose, IconMenu, IconPhone, IconWhatsApp } from './Icons'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Logo } from './Logo'

export function Navbar() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const links = [
    { href: '#home', label: t.nav.home },
    { href: '#fleet', label: t.nav.fleet },
    { href: '#about', label: t.nav.about },
    { href: '#why', label: t.nav.why },
    { href: '#explore', label: t.nav.explore },
    { href: '#contact', label: t.nav.contact },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [open])

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="site-header__inner container">
        <Logo />

        <nav className="desktop-nav" aria-label="Primary">
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <a
            className="header-icon"
            href={BUSINESS.phoneHref}
            aria-label={`${t.nav.call} ${BUSINESS.phoneDisplay}`}
          >
            <IconPhone size={18} />
          </a>
          <LanguageSwitcher />
          <a className="btn btn--gold btn--sm header-cta" href="#contact">
            {t.nav.book}
          </a>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <IconClose size={24} /> : <IconMenu size={24} />}
          </button>
        </div>
      </div>

      <div className={`mobile-nav${open ? ' is-open' : ''}`} id="mobile-menu" hidden={!open}>
        <nav aria-label="Primary">
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-nav__footer">
          <LanguageSwitcher full />
          <a className="btn btn--gold" href="#contact" onClick={() => setOpen(false)}>
            {t.nav.book}
          </a>
          <div className="mobile-nav__contact">
            <a href={BUSINESS.phoneHref}>
              <IconPhone size={17} /> {BUSINESS.phoneDisplay}
            </a>
            <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer">
              <IconWhatsApp size={17} /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {open && (
        <button
          type="button"
          className="nav-scrim"
          aria-label={t.nav.closeMenu}
          tabIndex={-1}
          onClick={() => setOpen(false)}
        />
      )}
    </header>
  )
}
