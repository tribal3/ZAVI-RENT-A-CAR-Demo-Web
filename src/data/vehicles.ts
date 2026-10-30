import type { Destination, Vehicle } from '../types'

/**
 * Illustrative fleet examples for the TRIBAL³ concept site.
 * These are not confirmed ZAVI RENT A CAR inventory, prices or availability.
 */
export const vehicles: Vehicle[] = [
  {
    id: 'polo',
    name: { en: 'Volkswagen Polo', ar: 'فولكس فاجن بولو' },
    category: 'economy',
    seats: 5,
    transmission: 'automatic',
    fuel: 'petrol',
    pricePerDay: 18,
    image: '/images/cars/economy-polo.jpg',
    imageAlt: {
      en: 'Blue compact hatchback parked on a quiet street',
      ar: 'سيارة هاتشباك صغيرة زرقاء متوقفة في شارع هادئ',
    },
  },
  {
    id: 'fiat-500',
    name: { en: 'Fiat 500', ar: 'فيات 500' },
    category: 'economy',
    seats: 4,
    transmission: 'automatic',
    fuel: 'petrol',
    pricePerDay: 15,
    image: '/images/cars/economy-fiat.jpg',
    imageAlt: {
      en: 'Light blue city car parked beside a stone building',
      ar: 'سيارة مدينة زرقاء فاتحة متوقفة بجانب مبنى حجري',
    },
  },
  {
    id: 'camry',
    name: { en: 'Toyota Camry', ar: 'تويوتا كامري' },
    category: 'sedan',
    seats: 5,
    transmission: 'automatic',
    fuel: 'petrol',
    pricePerDay: 25,
    image: '/images/cars/sedan-camry.jpg',
    imageAlt: {
      en: 'Grey mid-size sedan parked in an urban setting',
      ar: 'سيارة سيدان رمادية متوسطة الحجم متوقفة في المدينة',
    },
  },
  {
    id: 'accent',
    name: { en: 'Hyundai Accent', ar: 'هيونداي أكسنت' },
    category: 'sedan',
    seats: 5,
    transmission: 'automatic',
    fuel: 'petrol',
    pricePerDay: 19,
    image: '/images/cars/sedan-accent.jpg',
    imageAlt: {
      en: 'Black compact sedan driving past green trees',
      ar: 'سيارة سيدان سوداء صغيرة تسير بجانب أشجار خضراء',
    },
  },
  {
    id: 'model-3',
    name: { en: 'Tesla Model 3', ar: 'تسلا موديل 3' },
    category: 'sedan',
    seats: 5,
    transmission: 'automatic',
    fuel: 'electric',
    pricePerDay: 32,
    image: '/images/cars/sedan-model3.jpg',
    imageAlt: {
      en: 'White electric sedan on a highway at dusk',
      ar: 'سيارة كهربائية بيضاء على طريق سريع عند الغروب',
    },
  },
  {
    id: 'range-rover',
    name: { en: 'Land Rover Range Rover', ar: 'لاند روفر رينج روفر' },
    category: 'suv',
    seats: 5,
    transmission: 'automatic',
    fuel: 'petrol',
    pricePerDay: 55,
    image: '/images/cars/suv-rangerover.jpg',
    imageAlt: {
      en: 'Black luxury SUV parked in front of a modern garage',
      ar: 'سيارة دفع رباعي فخمة سوداء متوقفة أمام مرآب حديث',
    },
  },
  {
    id: 'crv',
    name: { en: 'Honda CR-V', ar: 'هوندا CR-V' },
    category: 'suv',
    seats: 5,
    transmission: 'automatic',
    fuel: 'petrol',
    pricePerDay: 30,
    image: '/images/cars/suv-crv.jpg',
    imageAlt: {
      en: 'White family SUV on a mountain road',
      ar: 'سيارة دفع رباعي بيضاء عائلية على طريق جبلي',
    },
  },
  {
    id: 'expedition',
    name: { en: 'Ford Expedition', ar: 'فورد إكسبيديشن' },
    category: 'family',
    seats: 7,
    transmission: 'automatic',
    fuel: 'petrol',
    pricePerDay: 45,
    image: '/images/cars/family-expedition.jpg',
    imageAlt: {
      en: 'Large white seven-seat SUV on a desert track',
      ar: 'سيارة دفع رباعي بيضاء كبيرة بسبعة مقاعد على مسار صحراوي',
    },
  },
  {
    id: 'amg-gt',
    name: { en: 'Mercedes-AMG GT', ar: 'مرسيدس AMG GT' },
    category: 'luxury',
    seats: 2,
    transmission: 'automatic',
    fuel: 'petrol',
    pricePerDay: 75,
    image: '/images/cars/luxury-amg.jpg',
    imageAlt: {
      en: 'Silver performance coupe parked on a race circuit',
      ar: 'سيارة كوبيه فضية عالية الأداء متوقفة على حلبة سباق',
    },
  },
  {
    id: 'm4',
    name: { en: 'BMW M4', ar: 'بي إم دبليو M4' },
    category: 'luxury',
    seats: 4,
    transmission: 'automatic',
    fuel: 'petrol',
    pricePerDay: 65,
    image: '/images/cars/luxury-m4.jpg',
    imageAlt: {
      en: 'Red performance coupe in front of a glass showroom',
      ar: 'سيارة كوبيه حمراء عالية الأداء أمام صالة عرض زجاجية',
    },
  },
  {
    id: 'camaro',
    name: { en: 'Chevrolet Camaro', ar: 'شيفروليه كامارو' },
    category: 'luxury',
    seats: 4,
    transmission: 'automatic',
    fuel: 'petrol',
    pricePerDay: 58,
    image: '/images/cars/luxury-camaro.jpg',
    imageAlt: {
      en: 'Blue sports coupe in a desert landscape at sunset',
      ar: 'سيارة رياضية زرقاء في مشهد صحراوي عند الغروب',
    },
  },
]

/** Real Omani destinations, used for travel inspiration only. */
export const destinations: Destination[] = [
  {
    id: 'muscat',
    name: { en: 'Muscat', ar: 'مسقط' },
    description: {
      en: "The capital's corniche, souqs, palaces and coastline are an easy drive from Seeb.",
      ar: 'كورنيش العاصمة وأسواقها وقصورها وساحلها على مسافة قصيرة من السيب.',
    },
    image: '/images/dest/muscat.jpg',
    imageAlt: {
      en: 'Al Alam Palace in Muscat with blue and gold columns',
      ar: 'قصر العلم في مسقط بأعمدته الزرقاء والذهبية',
    },
  },
  {
    id: 'nizwa',
    name: { en: 'Nizwa', ar: 'نزوى' },
    description: {
      en: 'Historic forts, the Friday livestock market and the road into the interior.',
      ar: 'قلاع تاريخية وسوق الجمعة وطريق يؤدي إلى داخل البلاد.',
    },
    image: '/images/dest/nizwa.jpg',
    imageAlt: {
      en: 'Aerial view of Nizwa Fort and the old town',
      ar: 'منظر جوي لقلعة نزوى والبلدة القديمة',
    },
  },
  {
    id: 'jebel-akhdar',
    name: { en: 'Jebel Akhdar', ar: 'الجبل الأخضر' },
    description: {
      en: 'Mountain terraces, cooler air and long views across the Hajar range.',
      ar: 'مدرجات جبلية وهواء أبرد وإطلالات بعيدة على جبال الحجر.',
    },
    image: '/images/dest/jebel-akhdar.jpg',
    imageAlt: {
      en: 'Rocky canyon walls in the Hajar mountains of Oman',
      ar: 'جدران صخرية في وادي ضمن جبال الحجر في عُمان',
    },
  },
  {
    id: 'sur',
    name: { en: 'Sur', ar: 'صور' },
    description: {
      en: 'A dhow-building town on the Sharqiyah coast, south of Muscat.',
      ar: 'مدينة لصناعة السفن الشراعية على ساحل الشرقية، جنوب مسقط.',
    },
    image: '/images/dest/sur.jpg',
    imageAlt: {
      en: 'Turquoise bay and traditional wooden boats at Sur',
      ar: 'خليج فيروزي وقوارب خشبية تقليدية في صور',
    },
  },
  {
    id: 'wadi-shab',
    name: { en: 'Wadi Shab', ar: 'وادي شاب' },
    description: {
      en: 'Palm-lined cliffs and clear pools along the coastal road to Sur.',
      ar: 'جبال تكسوها النخيل وبرك صافية على الطريق الساحلي إلى صور.',
    },
    image: '/images/dest/wadi-shab.jpg',
    imageAlt: {
      en: 'Palm trees and still water in Wadi Shab, Oman',
      ar: 'أشجار نخيل ومياه هادئة في وادي شاب بسلطنة عُمان',
    },
  },
]

export const BUSINESS = {
  phoneDisplay: '+968 9268 4651',
  phoneHref: 'tel:+96892684651',
  whatsapp: 'https://wa.me/96892684651',
  directions:
    'https://www.google.com/maps/dir/?api=1&destination=Seeb%2C+Al+Shamaliya+116%2C+Oman',
  rating: '5.0',
  reviewCount: 368,
} as const
