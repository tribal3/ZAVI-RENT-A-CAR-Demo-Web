import type {
  CategoryFilter,
  FuelType,
  Language,
  LocationId,
  Transmission,
  VehicleCategory,
} from '../types'

export interface SiteContent {
  locale: string
  meta: { title: string; description: string }
  nav: {
    home: string
    skip: string
    fleet: string
    about: string
    why: string
    explore: string
    contact: string
    book: string
    call: string
    openMenu: string
    closeMenu: string
  }
  hero: {
    eyebrow: string
    titleTop: string
    titleBottom: string
    lead: string
    primaryCta: string
    secondaryCta: string
    note: string
    imageAlt: string
  }
  search: {
    title: string
    hint: string
    pickupLocation: string
    pickup: string
    returnLabel: string
    pickupDate: string
    pickupTime: string
    returnDate: string
    returnTime: string
    category: string
    allCategories: string
    button: string
    locations: Record<LocationId, string>
    dateError: string
    note: string
  }
  trust: {
    ratingLabel: string
    reviews: string
    sourceNote: string
    baseValue: string
    baseLabel: string
    contactValue: string
    contactLabel: string
  }
  fleet: {
    eyebrow: string
    title: string
    lead: string
    disclaimer: string
    sample: string
    perDay: string
    seatsLabel: string
    transmissionLabel: string
    fuelLabel: string
    enquire: string
    enquireShort: string
    illustrative: string
    filters: Record<CategoryFilter, string>
    categories: Record<VehicleCategory, string>
    transmissions: Record<Transmission, string>
    fuels: Record<FuelType, string>
    empty: string
    resultNote: (category: string, dates: string) => string
  }
  steps: {
    eyebrow: string
    title: string
    lead: string
    items: { title: string; text: string }[]
    note: string
  }
  why: {
    eyebrow: string
    title: string
    lead: string
    items: { title: string; text: string }[]
  }
  about: {
    eyebrow: string
    title: string
    paragraphs: string[]
    stats: { value: string; label: string }[]
    note: string
    imageAlt: string
  }
  explore: {
    eyebrow: string
    title: string
    lead: string
    note: string
  }
  contact: {
    eyebrow: string
    title: string
    lead: string
    detailsTitle: string
    phoneLabel: string
    whatsappLabel: string
    whatsappHint: string
    locationLabel: string
    address: string
    directions: string
    mapTitle: string
    formTitle: string
    formLead: string
    fields: {
      name: string
      phone: string
      pickupDate: string
      returnDate: string
      category: string
      namePlaceholder: string
      phonePlaceholder: string
    }
    allCategories: string
    submit: string
    privacy: string
    prefilled: (vehicle: string) => string
    errors: {
      name: string
      phone: string
      pickup: string
      return: string
      dateOrder: string
    }
    success: {
      title: string
      body: string
      call: string
      whatsapp: string
      edit: string
      details: string
    }
  }
  footer: {
    tagline: string
    fleetTitle: string
    companyTitle: string
    contactTitle: string
    disclaimer: string
    illustrative: string
    rights: string
    credit: string
  }
  language: { label: string; en: string; ar: string }
}

const en: SiteContent = {
  locale: 'en-GB',
  meta: {
    title: 'ZAVI Rent a Car | Car Rental in Seeb, Muscat, Oman',
    description:
      'Car rental in Seeb, Oman. Explore economy, sedan, SUV, family and luxury car categories, then confirm your rental directly with ZAVI by phone or WhatsApp.',
  },
  nav: {
    home: 'Home',
    skip: 'Skip to content',
    fleet: 'Our Fleet',
    about: 'About Us',
    why: 'Why Choose Us',
    explore: 'Explore Oman',
    contact: 'Contact',
    book: 'Book Your Car',
    call: 'Call',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  hero: {
    eyebrow: 'Car rental · Seeb, Sultanate of Oman',
    titleTop: 'Your Journey,',
    titleBottom: 'Your Way.',
    lead: 'Premium car rental in Seeb, Muscat — a considered fleet for city drives, business trips, family visits and weekends exploring Oman.',
    primaryCta: 'Explore Our Fleet',
    secondaryCta: 'Book Your Car',
    note: 'Booking requests are confirmed directly with ZAVI by phone or WhatsApp.',
    imageAlt: 'A dark luxury sedan driving along an open road at dusk',
  },
  search: {
    title: 'Find your car',
    hint: 'Tell us what you need. Availability and rates are confirmed by ZAVI.',
    pickupLocation: 'Pickup location',
    pickup: 'Pickup',
    returnLabel: 'Return',
    pickupDate: 'Pickup date',
    pickupTime: 'Time',
    returnDate: 'Return date',
    returnTime: 'Time',
    category: 'Vehicle category',
    allCategories: 'All categories',
    button: 'Search cars',
    locations: {
      seeb: 'Seeb — Al Shamaliya 116',
      other: 'Other location — to discuss',
    },
    dateError: 'Please check your pickup and return dates.',
    note: 'Illustrative search. Nothing is reserved until ZAVI confirms.',
  },
  trust: {
    ratingLabel: 'Google rating',
    reviews: '368 Google reviews',
    sourceNote:
      "Based on ZAVI RENT A CAR's public Google business listing. No review text or testimonial is reproduced in this concept.",
    baseValue: 'Seeb',
    baseLabel: 'Al Shamaliya 116, Oman',
    contactValue: '+968 9268 4651',
    contactLabel: 'Call or WhatsApp',
  },
  fleet: {
    eyebrow: 'Our Fleet',
    title: 'A car for every kind of journey.',
    lead: 'From a compact city car to a seven-seat family SUV, here is how a ZAVI fleet could be presented. Filter by category to explore.',
    disclaimer:
      'Illustrative examples only. Vehicles, specifications and OMR prices shown are part of this website concept — not confirmed ZAVI inventory, rates or availability.',
    sample: 'Sample',
    perDay: 'OMR / day',
    seatsLabel: 'Seats',
    transmissionLabel: 'Transmission',
    fuelLabel: 'Fuel',
    enquire: 'Enquire about this car',
    enquireShort: 'Enquire',
    illustrative: 'Illustrative example',
    filters: {
      all: 'All cars',
      economy: 'Economy',
      sedan: 'Sedan',
      suv: 'SUV',
      luxury: 'Luxury',
      family: 'Family Cars',
    },
    categories: {
      economy: 'Economy',
      sedan: 'Sedan',
      suv: 'SUV',
      luxury: 'Luxury',
      family: 'Family',
    },
    transmissions: { automatic: 'Automatic', manual: 'Manual' },
    fuels: { petrol: 'Petrol', electric: 'Electric', hybrid: 'Hybrid' },
    empty: 'No sample cars in this category yet.',
    resultNote: (category, dates) =>
      dates ? `${category} · ${dates}` : `${category} · all dates`,
  },
  steps: {
    eyebrow: 'Rental Experience',
    title: 'Rental, made simple.',
    lead: 'No account, no long forms. Three clear steps from browsing to a confirmed rental.',
    items: [
      {
        title: 'Choose Your Car',
        text: 'Browse the sample fleet and pick the category that suits your trip — economy, sedan, SUV, family or luxury.',
      },
      {
        title: 'Select Rental Dates',
        text: 'Choose your pickup and return dates and times so ZAVI can check what is available for your stay.',
      },
      {
        title: 'Contact Us to Confirm',
        text: 'Call or message ZAVI to confirm availability, the daily rate and the rental terms before you collect the car.',
      },
    ],
    note: 'Submitting an enquiry through this concept site does not create a reservation. All rentals are subject to confirmation by ZAVI.',
  },
  why: {
    eyebrow: 'Why Choose ZAVI',
    title: 'A local rental, handled personally.',
    lead: 'A straightforward way to arrange a car in Oman — with a real person on the other end of the conversation.',
    items: [
      {
        title: 'Convenient rental enquiries',
        text: 'Start with a call or a WhatsApp message. No online account and no complicated checkout.',
      },
      {
        title: 'Multiple vehicle categories',
        text: 'Economy, sedan, SUV, family and luxury categories give you room to match the car to the trip.',
      },
      {
        title: 'Flexible rental options',
        text: 'Discuss your dates and plans directly with ZAVI. Rental periods and terms are agreed and confirmed with the business.',
      },
      {
        title: 'Customer-focused service',
        text: 'A Seeb-based business, with enquiries handled directly by the team rather than an automated system.',
      },
      {
        title: 'Easy communication',
        text: 'Reach ZAVI by phone, WhatsApp or the enquiry form. Share your dates and preferred car in a couple of minutes.',
      },
    ],
  },
  about: {
    eyebrow: 'About ZAVI',
    title: 'A local car rental business in Seeb.',
    paragraphs: [
      'ZAVI RENT A CAR (زاوي لتأجير السيارات) is a car rental business based in Seeb, Al Shamaliya 116, Oman. This website is an independent concept showing how that service could be presented online: clear categories, a calm booking flow and direct contact with the business.',
      'ZAVI is a rental business, not a tour operator. Everything here is designed to help you ask the right questions — availability, daily rate, documents and pickup arrangements — and get an answer from the team directly.',
    ],
    stats: [
      { value: '5.0', label: 'Google rating' },
      { value: '368', label: 'Google reviews' },
      { value: 'Seeb', label: 'Al Shamaliya 116, Oman' },
    ],
    note: 'Rating and review count are taken from ZAVI\'s public Google business listing. Vehicle examples and prices on this site are illustrative demo content.',
    imageAlt: 'A white Honda CR-V SUV on a mountain road',
  },
  explore: {
    eyebrow: 'Explore Oman',
    title: 'See more of Oman, on your own schedule.',
    lead: 'Collect your car in Seeb and take the coast road, head inland to the mountains, or plan a slower weekend through the wadis. A rental keeps the itinerary yours.',
    note: 'Destination notes are for inspiration only. ZAVI provides car rental, not guided tours.',
  },
  contact: {
    eyebrow: 'Contact & Booking',
    title: "Let's get you on the road.",
    lead: 'Call or WhatsApp ZAVI to check availability and confirm your rental. The form below is a front-end demo that helps you prepare the details — it does not send anything to ZAVI.',
    detailsTitle: 'Talk to ZAVI',
    phoneLabel: 'Phone',
    whatsappLabel: 'WhatsApp enquiry',
    whatsappHint: 'Message ZAVI with your dates and preferred car category.',
    locationLabel: 'Location',
    address: 'Seeb, Al Shamaliya 116, Oman',
    directions: 'Get directions',
    mapTitle: 'Map showing Seeb, Al Shamaliya 116, Oman',
    formTitle: 'Booking enquiry',
    formLead: 'Prepare your details, then confirm by phone or WhatsApp.',
    fields: {
      name: 'Full name',
      phone: 'Phone number',
      pickupDate: 'Pickup date',
      returnDate: 'Return date',
      category: 'Preferred vehicle category',
      namePlaceholder: 'Your name',
      phonePlaceholder: '+968 9xxx xxxx',
    },
    allCategories: 'No preference',
    submit: 'Prepare enquiry',
    privacy: 'Demo form — your details stay in this browser and are not sent or stored.',
    prefilled: (vehicle) => `Enquiring about the ${vehicle} (illustrative example).`,
    errors: {
      name: 'Please enter your name.',
      phone: 'Please enter a valid phone number.',
      pickup: 'Please choose a pickup date.',
      return: 'Please choose a return date.',
      dateOrder: 'The return date must be after the pickup date.',
    },
    success: {
      title: 'Enquiry prepared — demo only',
      body: 'Your details were checked in this browser, but nothing has been sent to ZAVI and no booking has been made. To confirm availability and rental terms, contact ZAVI directly:',
      call: 'Call ZAVI',
      whatsapp: 'Continue on WhatsApp',
      edit: 'Edit details',
      details: 'Your details',
    },
  },
  footer: {
    tagline: 'Car rental in Seeb, Oman. Your journey, your way.',
    fleetTitle: 'Explore',
    companyTitle: 'Company',
    contactTitle: 'Contact',
    disclaimer:
      'Independent website concept designed by TRIBAL³ for presentation purposes. This is not the official ZAVI RENT A CAR website.',
    illustrative:
      'Vehicle examples, sample prices and availability are illustrative and subject to confirmation by ZAVI.',
    rights: '© 2026 TRIBAL³. All rights reserved.',
    credit: 'Concept & design — TRIBAL³',
  },
  language: { label: 'Language', en: 'English', ar: 'العربية' },
}

const ar: SiteContent = {
  locale: 'ar-OM',
  meta: {
    title: 'زاوي لتأجير السيارات | تأجير سيارات في السيب ومسقط، عُمان',
    description:
      'زاوي لتأجير السيارات في السيب، عُمان. استكشف فئات الاقتصادية والسيدان والدفع الرباعي والعائلية والفخمة، ثم أكّد حجزك مباشرة مع زاوي عبر الهاتف أو واتساب.',
  },
  nav: {
    home: 'الرئيسية',
    skip: 'تخطَّ إلى المحتوى',
    fleet: 'أسطولنا',
    about: 'من نحن',
    why: 'لماذا زاوي',
    explore: 'اكتشف عُمان',
    contact: 'تواصل معنا',
    book: 'احجز سيارتك',
    call: 'اتصل',
    openMenu: 'فتح القائمة',
    closeMenu: 'إغلاق القائمة',
  },
  hero: {
    eyebrow: 'تأجير سيارات · السيب، سلطنة عُمان',
    titleTop: 'رحلتك،',
    titleBottom: 'على طريقتك.',
    lead: 'تأجير سيارات في السيب بمسقط — أسطول مختار لرحلات المدينة وأعمال العمل وزيارات العائلة وعطلات استكشاف عُمان.',
    primaryCta: 'استكشف أسطولنا',
    secondaryCta: 'احجز سيارتك',
    note: 'تُؤكَّد طلبات الحجز مباشرة مع زاوي عبر الهاتف أو واتساب.',
    imageAlt: 'سيارة سيدان فخمة داكنة تسير على طريق مفتوح عند الغروب',
  },
  search: {
    title: 'ابحث عن سيارتك',
    hint: 'أخبرنا بما تحتاجه. يؤكد فريق زاوي التوافر والأسعار.',
    pickupLocation: 'مكان الاستلام',
    pickup: 'الاستلام',
    returnLabel: 'الإرجاع',
    pickupDate: 'تاريخ الاستلام',
    pickupTime: 'الوقت',
    returnDate: 'تاريخ الإرجاع',
    returnTime: 'الوقت',
    category: 'فئة السيارة',
    allCategories: 'جميع الفئات',
    button: 'ابحث عن سيارة',
    locations: {
      seeb: 'السيب — الشمالية ١١٦',
      other: 'موقع آخر — للاتفاق عليه',
    },
    dateError: 'يرجى مراجعة تاريخي الاستلام والإرجاع.',
    note: 'بحث توضيحي. لا يتم حجز أي سيارة قبل تأكيد زاوي.',
  },
  trust: {
    ratingLabel: 'تقييم جوجل',
    reviews: '368 مراجعة على جوجل',
    sourceNote:
      'استنادًا إلى نشاط «زاوي لتأجير السيارات» العام على جوجل. لا تتضمن هذه النسخة أي نصوص مراجعات أو شهادات عملاء.',
    baseValue: 'السيب',
    baseLabel: 'الشمالية ١١٦، عُمان',
    contactValue: '+968 9268 4651',
    contactLabel: 'هاتف أو واتساب',
  },
  fleet: {
    eyebrow: 'أسطولنا',
    title: 'سيارة لكل نوع من الرحلات.',
    lead: 'من سيارة مدينة صغيرة إلى دفع رباعي عائلية بسبعة مقاعد، هكذا يمكن عرض أسطول زاوي. اختر الفئة لاستكشاف الخيارات.',
    disclaimer:
      'أمثلة توضيحية فقط. السيارات والمواصفات والأسعار بالريال العُماني جزء من تصور هذا الموقع، وليست مخزونًا أو أسعارًا أو توافرًا مؤكدًا لدى زاوي.',
    sample: 'نموذجي',
    perDay: 'ريال عُماني / يوم',
    seatsLabel: 'المقاعد',
    transmissionLabel: 'ناقل الحركة',
    fuelLabel: 'الوقود',
    enquire: 'استفسر عن هذه السيارة',
    enquireShort: 'استفسر',
    illustrative: 'مثال توضيحي',
    filters: {
      all: 'جميع السيارات',
      economy: 'اقتصادية',
      sedan: 'سيدان',
      suv: 'دفع رباعي',
      luxury: 'فخمة',
      family: 'عائلية',
    },
    categories: {
      economy: 'اقتصادية',
      sedan: 'سيدان',
      suv: 'دفع رباعي',
      luxury: 'فخمة',
      family: 'عائلية',
    },
    transmissions: { automatic: 'أوتوماتيك', manual: 'يدوي' },
    fuels: { petrol: 'بنزين', electric: 'كهربائي', hybrid: 'هجين' },
    empty: 'لا توجد سيارات نموذجية في هذه الفئة بعد.',
    resultNote: (category, dates) =>
      dates ? `${category} · ${dates}` : `${category} · جميع التواريخ`,
  },
  steps: {
    eyebrow: 'تجربة الإيجار',
    title: 'تأجير بسيط وواضح.',
    lead: 'بدون حساب وبدون نماذج طويلة. ثلاث خطوات من التصفح إلى تأكيد الإيجار.',
    items: [
      {
        title: 'اختر سيارتك',
        text: 'تصفح الأسطول النموذجي واختر الفئة المناسبة لرحلتك — اقتصادية أو سيدان أو دفع رباعي أو عائلية أو فخمة.',
      },
      {
        title: 'حدّد تواريخ الإيجار',
        text: 'اختر تاريخي الاستلام والإرجاع وأوقاتهما حتى يتمكن فريق زاوي من مراجعة ما هو متاح خلال إقامتك.',
      },
      {
        title: 'تواصل معنا للتأكيد',
        text: 'اتصل بزاوي أو راسله لتأكيد التوافر والسعر اليومي وشروط الإيجار قبل استلام السيارة.',
      },
    ],
    note: 'إرسال طلب عبر هذا الموقع التوضيحي لا يُنشئ حجزًا. جميع عمليات الإيجار تخضع لتأكيد زاوي.',
  },
  why: {
    eyebrow: 'لماذا زاوي',
    title: 'إيجار محلي، بمتابعة شخصية.',
    lead: 'طريقة مباشرة لترتيب سيارة في عُمان — مع شخص حقيقي في الطرف الآخر من المحادثة.',
    items: [
      {
        title: 'استفسارات إيجار مريحة',
        text: 'ابدأ بمكالمة أو رسالة واتساب. لا حاجة إلى حساب إلكتروني أو خطوات دفع معقدة.',
      },
      {
        title: 'فئات متعددة من السيارات',
        text: 'فئات اقتصادية وسيدان ودفع رباعي وعائلية وفخمة تمنحك مساحة لاختيار السيارة المناسبة للرحلة.',
      },
      {
        title: 'خيارات إيجار مرنة',
        text: 'ناقش تواريخك وخططك مباشرة مع زاوي. تُتفق مدة الإيجار وشروطه وتُؤكَّد مع المؤسسة.',
      },
      {
        title: 'خدمة تهتم بالعميل',
        text: 'مؤسسة مقرها السيب، يتولى فريقها متابعة الاستفسارات مباشرة بدلًا من نظام آلي.',
      },
      {
        title: 'تواصل سهل',
        text: 'تواصل مع زاوي عبر الهاتف أو واتساب أو نموذج الاستفسار. شارك تواريخك وسيارتك المفضلة في دقيقتين.',
      },
    ],
  },
  about: {
    eyebrow: 'عن زاوي',
    title: 'مؤسسة تأجير سيارات محلية في السيب.',
    paragraphs: [
      '«زاوي لتأجير السيارات» مؤسسة لتأجير السيارات مقرها السيب، الشمالية ١١٦، سلطنة عُمان. هذا الموقع تصور مستقل يوضح كيف يمكن تقديم هذه الخدمة على الإنترنت: فئات واضحة، ومسار حجز هادئ، وتواصل مباشر مع المؤسسة.',
      'زاوي مؤسسة تأجير سيارات وليست منظّم رحلات. صُمم كل شيء هنا ليساعدك على طرح الأسئلة الصحيحة — التوافر والسعر اليومي والمستندات وترتيبات الاستلام — والحصول على إجابة من الفريق مباشرة.',
    ],
    stats: [
      { value: '5.0', label: 'تقييم جوجل' },
      { value: '368', label: 'مراجعة على جوجل' },
      { value: 'السيب', label: 'الشمالية ١١٦، عُمان' },
    ],
    note: 'التقييم وعدد المراجعات مأخوذان من نشاط زاوي العام على جوجل. أمثلة السيارات والأسعار في هذا الموقع محتوى توضيحي للعرض.',
    imageAlt: 'سيارة هوندا CR-V بيضاء على طريق جبلي',
  },
  explore: {
    eyebrow: 'اكتشف عُمان',
    title: 'شاهد المزيد من عُمان، حسب جدولك.',
    lead: 'استلم سيارتك في السيب واسلك الطريق الساحلي، أو اتجه إلى الجبال، أو خطط لعطلة أهدأ بين الوديان. مع سيارة إيجار تبقى الخطة لك.',
    note: 'معلومات الوجهات للإلهام فقط. تقدم زاوي خدمة تأجير السيارات وليست رحلات مرشدة.',
  },
  contact: {
    eyebrow: 'التواصل والحجز',
    title: 'لنبدأ رحلتك.',
    lead: 'اتصل بزاوي أو راسله عبر واتساب للتحقق من التوافر وتأكيد الإيجار. النموذج أدناه تجريبي في الواجهة فقط ويساعدك على تجهيز التفاصيل — ولا يرسل أي شيء إلى زاوي.',
    detailsTitle: 'تحدث مع زاوي',
    phoneLabel: 'الهاتف',
    whatsappLabel: 'استفسار عبر واتساب',
    whatsappHint: 'راسل زاوي بتواريخك وفئة السيارة المفضلة.',
    locationLabel: 'الموقع',
    address: 'السيب، الشمالية ١١٦، سلطنة عُمان',
    directions: 'احصل على الاتجاهات',
    mapTitle: 'خريطة توضح السيب، الشمالية ١١٦، عُمان',
    formTitle: 'طلب حجز',
    formLead: 'جهّز تفاصيلك، ثم أكّد عبر الهاتف أو واتساب.',
    fields: {
      name: 'الاسم الكامل',
      phone: 'رقم الهاتف',
      pickupDate: 'تاريخ الاستلام',
      returnDate: 'تاريخ الإرجاع',
      category: 'فئة السيارة المفضلة',
      namePlaceholder: 'اسمك',
      phonePlaceholder: '+968 9xxx xxxx',
    },
    allCategories: 'بدون تفضيل',
    submit: 'جهّز الطلب',
    privacy: 'نموذج تجريبي — تبقى بياناتك في هذا المتصفح ولا تُرسل أو تُحفظ.',
    prefilled: (vehicle) => `استفسار عن ${vehicle} (مثال توضيحي).`,
    errors: {
      name: 'يرجى إدخال اسمك.',
      phone: 'يرجى إدخال رقم هاتف صحيح.',
      pickup: 'يرجى اختيار تاريخ الاستلام.',
      return: 'يرجى اختيار تاريخ الإرجاع.',
      dateOrder: 'يجب أن يكون تاريخ الإرجاع بعد تاريخ الاستلام.',
    },
    success: {
      title: 'تم تجهيز الطلب — عرض توضيحي فقط',
      body: 'تم التحقق من بياناتك في هذا المتصفح، لكن لم يُرسل أي شيء إلى زاوي ولم يتم أي حجز. لتأكيد التوافر وشروط الإيجار، تواصل مع زاوي مباشرة:',
      call: 'اتصل بزاوي',
      whatsapp: 'تابع عبر واتساب',
      edit: 'تعديل البيانات',
      details: 'بياناتك',
    },
  },
  footer: {
    tagline: 'تأجير سيارات في السيب، عُمان. رحلتك، على طريقتك.',
    fleetTitle: 'استكشف',
    companyTitle: 'المؤسسة',
    contactTitle: 'التواصل',
    disclaimer:
      'تصميم موقع مستقل من TRIBAL³ لأغراض العرض فقط. هذا ليس الموقع الرسمي لزاوي لتأجير السيارات.',
    illustrative:
      'أمثلة السيارات والأسعار النموذجية والتوافر توضيحية وتخضع لتأكيد زاوي.',
    rights: '© 2026 TRIBAL³. جميع الحقوق محفوظة.',
    credit: 'الفكرة والتصميم — TRIBAL³',
  },
  language: { label: 'اللغة', en: 'English', ar: 'العربية' },
}

export const content: Record<Language, SiteContent> = { en, ar }
