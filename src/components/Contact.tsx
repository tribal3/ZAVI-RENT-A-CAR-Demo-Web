import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react'
import { BUSINESS } from '../data/vehicles'
import { useLanguage } from '../i18n/LanguageContext'
import type {
  BookingFormData,
  CategoryFilter,
  EnquiryPrefill,
  FormErrors,
  VehicleCategory,
} from '../types'
import {
  IconArrow,
  IconCalendar,
  IconCheck,
  IconPhone,
  IconPin,
  IconShield,
  IconWhatsApp,
} from './Icons'

interface ContactProps {
  enquiry: EnquiryPrefill | null
}

const EMPTY_FORM: BookingFormData = {
  name: '',
  phone: '',
  pickupDate: '',
  returnDate: '',
  category: 'all',
}

function toIsoDate(offsetDays: number) {
  const date = new Date()
  date.setDate(date.getDate() + offsetDays)
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function Contact({ enquiry }: ContactProps) {
  const { t, lang, formatDate } = useLanguage()
  const [form, setForm] = useState<BookingFormData>(EMPTY_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const successRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!enquiry) return
    setForm((current) => ({
      ...current,
      category: enquiry.category,
      pickupDate: enquiry.pickupDate || current.pickupDate,
      returnDate: enquiry.returnDate || current.returnDate,
    }))
    setErrors({})
    setSubmitted(false)
  }, [enquiry])

  useEffect(() => {
    if (submitted) successRef.current?.focus()
  }, [submitted])

  const update = (name: keyof BookingFormData, value: string) => {
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => {
      if (!current[name]) return current
      const next = { ...current }
      delete next[name]
      return next
    })
  }

  const validate = () => {
    const next: FormErrors = {}
    if (!form.name.trim()) next.name = t.contact.errors.name

    const digits = form.phone.replace(/\D/g, '')
    if (digits.length < 7 || digits.length > 15) next.phone = t.contact.errors.phone

    if (!form.pickupDate) next.pickupDate = t.contact.errors.pickup
    if (!form.returnDate) next.returnDate = t.contact.errors.return
    else if (form.pickupDate && form.returnDate < form.pickupDate) {
      next.returnDate = t.contact.errors.dateOrder
    }
    return next
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return
    setSubmitted(true)
  }

  const categories = Object.entries(t.fleet.categories) as [VehicleCategory, string][]
  const categoryLabel =
    form.category === 'all'
      ? t.contact.allCategories
      : t.fleet.categories[form.category]

  const whatsappMessage = [
    lang === 'ar'
      ? 'مرحبًا زاوي، أرغب في الاستفسار عن إيجار سيارة.'
      : 'Hello ZAVI, I would like to enquire about a car rental.',
    `${t.contact.fields.name}: ${form.name}`,
    `${t.contact.fields.phone}: ${form.phone}`,
    `${t.contact.fields.pickupDate}: ${formatDate(form.pickupDate)}`,
    `${t.contact.fields.returnDate}: ${formatDate(form.returnDate)}`,
    `${t.contact.fields.category}: ${categoryLabel}`,
    lang === 'ar'
      ? '(تم تجهيزها عبر موقع TRIBAL³ التوضيحي)'
      : '(Prepared on the TRIBAL³ concept website)',
  ].join('\n')

  const whatsappHref = `${BUSINESS.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact__grid">
          <div className="contact__intro">
            <p className="eyebrow">{t.contact.eyebrow}</p>
            <h2 id="contact-title" className="section-title">
              {t.contact.title}
            </h2>
            <p className="contact__lead">{t.contact.lead}</p>

            <div className="contact__details">
              <a className="detail detail--link" href={BUSINESS.phoneHref}>
                <span className="detail__icon">
                  <IconPhone size={20} />
                </span>
                <span>
                  <small>{t.contact.phoneLabel}</small>
                  <strong>{BUSINESS.phoneDisplay}</strong>
                </span>
              </a>

              <a
                className="detail detail--link"
                href={BUSINESS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="detail__icon detail__icon--gold">
                  <IconWhatsApp size={20} />
                </span>
                <span>
                  <small>{t.contact.whatsappLabel}</small>
                  <strong>{t.contact.whatsappHint}</strong>
                </span>
              </a>

              <div className="detail">
                <span className="detail__icon">
                  <IconPin size={20} />
                </span>
                <span>
                  <small>{t.contact.locationLabel}</small>
                  <strong>{t.contact.address}</strong>
                  <a
                    className="detail__directions"
                    href={BUSINESS.directions}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.contact.directions}
                    <IconArrow size={15} />
                  </a>
                </span>
              </div>
            </div>

            <a
              className="map-card"
              href={BUSINESS.directions}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.contact.mapTitle} — ${t.contact.directions}`}
            >
              <span className="map-card__grid" aria-hidden="true" />
              <span className="map-card__pin" aria-hidden="true">
                <IconPin size={22} />
              </span>
              <span className="map-card__caption">
                <small>{t.contact.locationLabel}</small>
                <strong>{t.contact.address}</strong>
                <span className="map-card__link">
                  {t.contact.directions}
                  <IconArrow size={14} />
                </span>
              </span>
            </a>
          </div>

          <div className="contact__card">
            <h3>{t.contact.formTitle}</h3>
            <p className="contact__form-lead">{t.contact.formLead}</p>

            {submitted ? (
              <div className="success" role="status">
                <span className="success__icon">
                  <IconCheck size={26} />
                </span>
                <h4 ref={successRef} tabIndex={-1}>
                  {t.contact.success.title}
                </h4>
                <p>{t.contact.success.body}</p>

                <dl className="success__summary">
                  <div>
                    <dt>{t.contact.success.details}</dt>
                    <dd>
                      {form.name} · {form.phone}
                    </dd>
                  </div>
                  <div>
                    <dt>{t.contact.fields.pickupDate}</dt>
                    <dd>{formatDate(form.pickupDate)}</dd>
                  </div>
                  <div>
                    <dt>{t.contact.fields.returnDate}</dt>
                    <dd>{formatDate(form.returnDate)}</dd>
                  </div>
                  <div>
                    <dt>{t.contact.fields.category}</dt>
                    <dd>{categoryLabel}</dd>
                  </div>
                </dl>

                <div className="success__actions">
                  <a
                    className="btn btn--gold"
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconWhatsApp size={18} />
                    {t.contact.success.whatsapp}
                  </a>
                  <a className="btn btn--outline" href={BUSINESS.phoneHref}>
                    <IconPhone size={17} />
                    {t.contact.success.call}
                  </a>
                </div>
                <button
                  type="button"
                  className="success__edit"
                  onClick={() => setSubmitted(false)}
                >
                  {t.contact.success.edit}
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                {enquiry && (
                  <p className="contact-form__prefill">
                    <IconCheck size={16} />
                    {t.contact.prefilled(enquiry.vehicleName)}
                  </p>
                )}

                <div className="form-row">
                  <div className={`form-field${errors.name ? ' has-error' : ''}`}>
                    <label htmlFor="contact-name">{t.contact.fields.name}</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder={t.contact.fields.namePlaceholder}
                      value={form.name}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        update('name', event.target.value)
                      }
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    />
                    {errors.name && (
                      <span className="form-error" id="contact-name-error" role="alert">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className={`form-field${errors.phone ? ' has-error' : ''}`}>
                    <label htmlFor="contact-phone">{t.contact.fields.phone}</label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder={t.contact.fields.phonePlaceholder}
                      value={form.phone}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        update('phone', event.target.value)
                      }
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                    />
                    {errors.phone && (
                      <span className="form-error" id="contact-phone-error" role="alert">
                        {errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className={`form-field${errors.pickupDate ? ' has-error' : ''}`}>
                    <label htmlFor="contact-pickup">{t.contact.fields.pickupDate}</label>
                    <div className="form-control-icon">
                      <IconCalendar size={18} />
                      <input
                        id="contact-pickup"
                        name="pickupDate"
                        type="date"
                        min={toIsoDate(0)}
                        value={form.pickupDate}
                        onChange={(event) => update('pickupDate', event.target.value)}
                        aria-invalid={Boolean(errors.pickupDate)}
                        aria-describedby={
                          errors.pickupDate ? 'contact-pickup-error' : undefined
                        }
                      />
                    </div>
                    {errors.pickupDate && (
                      <span className="form-error" id="contact-pickup-error" role="alert">
                        {errors.pickupDate}
                      </span>
                    )}
                  </div>

                  <div className={`form-field${errors.returnDate ? ' has-error' : ''}`}>
                    <label htmlFor="contact-return">{t.contact.fields.returnDate}</label>
                    <div className="form-control-icon">
                      <IconCalendar size={18} />
                      <input
                        id="contact-return"
                        name="returnDate"
                        type="date"
                        min={form.pickupDate || toIsoDate(0)}
                        value={form.returnDate}
                        onChange={(event) => update('returnDate', event.target.value)}
                        aria-invalid={Boolean(errors.returnDate)}
                        aria-describedby={
                          errors.returnDate ? 'contact-return-error' : undefined
                        }
                      />
                    </div>
                    {errors.returnDate && (
                      <span className="form-error" id="contact-return-error" role="alert">
                        {errors.returnDate}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="contact-category">{t.contact.fields.category}</label>
                  <select
                    id="contact-category"
                    name="category"
                    value={form.category}
                    onChange={(event) =>
                      update('category', event.target.value as CategoryFilter)
                    }
                  >
                    <option value="all">{t.contact.allCategories}</option>
                    {categories.map(([id, label]) => (
                      <option key={id} value={id}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="btn btn--dark contact-form__submit">
                  {t.contact.submit}
                  <IconArrow size={18} className="btn__arrow" />
                </button>

                <p className="contact-form__privacy">
                  <IconShield size={15} />
                  {t.contact.privacy}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
