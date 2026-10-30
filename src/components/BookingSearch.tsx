import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import type { CategoryFilter, LocationId, SearchState, VehicleCategory } from '../types'
import { IconCalendar, IconCategory, IconClock, IconPin } from './Icons'

interface BookingSearchProps {
  onSearch: (search: SearchState) => void
}

function toIsoDate(offsetDays: number) {
  const date = new Date()
  date.setDate(date.getDate() + offsetDays)
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function BookingSearch({ onSearch }: BookingSearchProps) {
  const { t } = useLanguage()
  const [values, setValues] = useState<SearchState>({
    pickupLocation: 'seeb',
    pickupDate: toIsoDate(1),
    pickupTime: '09:00',
    returnDate: toIsoDate(4),
    returnTime: '18:00',
    category: 'all',
  })
  const [error, setError] = useState('')

  const update = (name: keyof SearchState, value: string) => {
    setValues((current) => ({ ...current, [name]: value }))
    setError('')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!values.pickupDate || !values.returnDate || values.returnDate < values.pickupDate) {
      setError(t.search.dateError)
      return
    }
    setError('')
    onSearch(values)
  }

  const categories = Object.entries(t.fleet.categories) as [VehicleCategory, string][]
  const locations = Object.entries(t.search.locations) as [LocationId, string][]
  const today = toIsoDate(0)

  return (
    <div className="booking-wrap container">
      <form className="booking-panel" onSubmit={handleSubmit} aria-labelledby="booking-title">
        <div className="booking-panel__head">
          <h2 id="booking-title">{t.search.title}</h2>
          <p>{t.search.hint}</p>
        </div>

        <div className="booking-panel__grid">
          <div className="bp-field">
            <label className="bp-label" htmlFor="pickup-location">
              {t.search.pickupLocation}
            </label>
            <div className="bp-control">
              <IconPin size={18} className="bp-icon" />
              <select
                id="pickup-location"
                value={values.pickupLocation}
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                  update('pickupLocation', event.target.value)
                }
              >
                {locations.map(([id, label]) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bp-field">
            <span className="bp-label">{t.search.pickup}</span>
            <div className="bp-control bp-control--split">
              <IconCalendar size={18} className="bp-icon" />
              <input
                type="date"
                aria-label={t.search.pickupDate}
                min={today}
                value={values.pickupDate}
                onChange={(event) => update('pickupDate', event.target.value)}
              />
              <span className="bp-control__divider" aria-hidden="true" />
              <IconClock size={17} className="bp-icon" />
              <input
                type="time"
                aria-label={t.search.pickupTime}
                value={values.pickupTime}
                onChange={(event) => update('pickupTime', event.target.value)}
              />
            </div>
          </div>

          <div className="bp-field">
            <span className="bp-label">{t.search.returnLabel}</span>
            <div className="bp-control bp-control--split">
              <IconCalendar size={18} className="bp-icon" />
              <input
                type="date"
                aria-label={t.search.returnDate}
                min={values.pickupDate || today}
                value={values.returnDate}
                onChange={(event) => update('returnDate', event.target.value)}
              />
              <span className="bp-control__divider" aria-hidden="true" />
              <IconClock size={17} className="bp-icon" />
              <input
                type="time"
                aria-label={t.search.returnTime}
                value={values.returnTime}
                onChange={(event) => update('returnTime', event.target.value)}
              />
            </div>
          </div>

          <div className="bp-field">
            <label className="bp-label" htmlFor="search-category">
              {t.search.category}
            </label>
            <div className="bp-control">
              <IconCategory size={18} className="bp-icon" />
              <select
                id="search-category"
                value={values.category}
                onChange={(event) => update('category', event.target.value as CategoryFilter)}
              >
                <option value="all">{t.search.allCategories}</option>
                {categories.map(([id, label]) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn--gold booking-panel__submit">
            {t.search.button}
          </button>
        </div>

        <div className="booking-panel__foot">
          <p className={`booking-panel__note${error ? ' is-error' : ''}`} role={error ? 'alert' : undefined}>
            {error || t.search.note}
          </p>
        </div>
      </form>
    </div>
  )
}
