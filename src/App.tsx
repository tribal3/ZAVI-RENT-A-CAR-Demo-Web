import { useCallback, useState } from 'react'
import { About } from './components/About'
import { BookingSearch } from './components/BookingSearch'
import { Contact } from './components/Contact'
import { ExploreOman } from './components/ExploreOman'
import { Fleet } from './components/Fleet'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { IconWhatsApp } from './components/Icons'
import { Navbar } from './components/Navbar'
import { RentalSteps } from './components/RentalSteps'
import { TrustStrip } from './components/TrustStrip'
import { WhyChoose } from './components/WhyChoose'
import { BUSINESS } from './data/vehicles'
import { LanguageProvider, useLanguage } from './i18n/LanguageContext'
import type {
  CategoryFilter,
  EnquiryPrefill,
  SearchState,
  Vehicle,
} from './types'

function scrollToSection(id: string) {
  const target = document.getElementById(id)
  if (!target) return
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({
    behavior: reduceMotion ? 'auto' : 'smooth',
    block: 'start',
  })
}

function Site() {
  const { t, lang } = useLanguage()
  const [filter, setFilter] = useState<CategoryFilter>('all')
  const [search, setSearch] = useState<SearchState | null>(null)
  const [enquiry, setEnquiry] = useState<EnquiryPrefill | null>(null)

  const handleSearch = useCallback((next: SearchState) => {
    setSearch(next)
    setFilter(next.category)
    scrollToSection('fleet')
  }, [])

  const handleEnquire = useCallback(
    (vehicle: Vehicle) => {
      setEnquiry({
        requestId: Date.now(),
        vehicleId: vehicle.id,
        vehicleName: vehicle.name[lang],
        category: vehicle.category,
        pickupDate: search?.pickupDate ?? '',
        returnDate: search?.returnDate ?? '',
      })
      scrollToSection('contact')
    },
    [lang, search],
  )

  return (
    <>
      <a className="skip-link" href="#main">
        {t.nav.skip}
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <BookingSearch onSearch={handleSearch} />
        <TrustStrip />
        <Fleet
          filter={filter}
          onFilterChange={setFilter}
          onEnquire={handleEnquire}
          search={search}
        />
        <RentalSteps />
        <About />
        <WhyChoose />
        <ExploreOman />
        <Contact enquiry={enquiry} />
      </main>
      <Footer />
      <a
        className="whatsapp-fab"
        href={BUSINESS.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.contact.whatsappLabel}
      >
        <IconWhatsApp size={25} />
      </a>
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <Site />
    </LanguageProvider>
  )
}
