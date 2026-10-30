export type Language = 'en' | 'ar'

export type Localized = Record<Language, string>

export type VehicleCategory = 'economy' | 'sedan' | 'suv' | 'luxury' | 'family'

export type CategoryFilter = VehicleCategory | 'all'

export type Transmission = 'automatic' | 'manual'

export type FuelType = 'petrol' | 'electric' | 'hybrid'

export type LocationId = 'seeb' | 'other'

export interface Vehicle {
  id: string
  name: Localized
  category: VehicleCategory
  seats: number
  transmission: Transmission
  fuel: FuelType
  /** Sample daily rate in OMR — illustrative only. */
  pricePerDay: number
  image: string
  imageAlt: Localized
}

export interface Destination {
  id: string
  name: Localized
  description: Localized
  image: string
  imageAlt: Localized
}

export interface SearchState {
  pickupLocation: LocationId
  pickupDate: string
  pickupTime: string
  returnDate: string
  returnTime: string
  category: CategoryFilter
}

export interface BookingFormData {
  name: string
  phone: string
  pickupDate: string
  returnDate: string
  category: CategoryFilter
}

export interface EnquiryPrefill {
  requestId: number
  vehicleId: string
  vehicleName: string
  category: VehicleCategory
  pickupDate: string
  returnDate: string
}

export type FormErrors = Partial<Record<keyof BookingFormData, string>>
