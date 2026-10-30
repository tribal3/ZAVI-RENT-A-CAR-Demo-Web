import { useLanguage } from '../i18n/LanguageContext'
import { vehicles } from '../data/vehicles'
import type { CategoryFilter, SearchState, Vehicle } from '../types'
import { IconArrow, IconFuel, IconGear, IconShield, IconUsers } from './Icons'

interface FleetProps {
  filter: CategoryFilter
  onFilterChange: (filter: CategoryFilter) => void
  onEnquire: (vehicle: Vehicle) => void
  search: SearchState | null
}

const FILTERS: CategoryFilter[] = ['all', 'economy', 'sedan', 'suv', 'family', 'luxury']

export function Fleet({ filter, onFilterChange, onEnquire, search }: FleetProps) {
  const { t, lang, formatDate } = useLanguage()
  const filtered = vehicles.filter(
    (vehicle) => filter === 'all' || vehicle.category === filter,
  )
  const hasDates = Boolean(search?.pickupDate && search?.returnDate)
  const dateSummary =
    search && hasDates
      ? `${formatDate(search.pickupDate)} – ${formatDate(search.returnDate)}`
      : ''

  return (
    <section className="section fleet" id="fleet" aria-labelledby="fleet-title">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">{t.fleet.eyebrow}</p>
            <h2 id="fleet-title" className="section-title">
              {t.fleet.title}
            </h2>
          </div>
          <p className="section-lead">{t.fleet.lead}</p>
        </div>

        <div className="fleet__toolbar">
          <div className="chips" role="group" aria-label={t.search.category}>
            {FILTERS.map((key) => (
              <button
                key={key}
                type="button"
                className={`chip${filter === key ? ' is-active' : ''}`}
                aria-pressed={filter === key}
                onClick={() => onFilterChange(key)}
              >
                {t.fleet.filters[key]}
              </button>
            ))}
          </div>
          {search && (
            <p className="fleet__result">
              {t.fleet.resultNote(t.fleet.filters[filter], dateSummary)}
            </p>
          )}
        </div>

        <div className="fleet__grid">
          {filtered.map((vehicle) => (
            <article className="car-card" key={vehicle.id}>
              <div className="car-card__media">
                <img
                  src={vehicle.image}
                  alt={vehicle.imageAlt[lang]}
                  width={1000}
                  height={640}
                  loading="lazy"
                  decoding="async"
                />
                <span className="car-card__category">
                  {t.fleet.categories[vehicle.category]}
                </span>
                <span className="car-card__illustrative">{t.fleet.illustrative}</span>
              </div>

              <div className="car-card__body">
                <div className="car-card__heading">
                  <h3>{vehicle.name[lang]}</h3>
                  <span className="car-card__sample">{t.fleet.sample}</span>
                </div>

                <ul className="car-card__specs">
                  <li>
                    <IconUsers size={17} />
                    <span>
                      {vehicle.seats} {t.fleet.seatsLabel}
                    </span>
                  </li>
                  <li>
                    <IconGear size={17} />
                    <span>{t.fleet.transmissions[vehicle.transmission]}</span>
                  </li>
                  <li>
                    <IconFuel size={17} />
                    <span>{t.fleet.fuels[vehicle.fuel]}</span>
                  </li>
                </ul>

                <div className="car-card__footer">
                  <p className="car-card__price">
                    <span className="car-card__amount">
                      {vehicle.pricePerDay}
                      <small>{t.fleet.perDay}</small>
                    </span>
                  </p>
                  <button
                    type="button"
                    className="car-card__action"
                    onClick={() => onEnquire(vehicle)}
                    aria-label={`${t.fleet.enquire}: ${vehicle.name[lang]}`}
                  >
                    <span>{t.fleet.enquireShort}</span>
                    <IconArrow size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && <p className="fleet__empty">{t.fleet.empty}</p>}

        <p className="fleet__disclaimer">
          <IconShield size={18} />
          <span>{t.fleet.disclaimer}</span>
        </p>
      </div>
    </section>
  )
}
