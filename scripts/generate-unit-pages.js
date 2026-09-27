import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Unit data definitions
const UNITS = [
  {
    id: 'unit-1',
    unitNumber: 1,
    category: 'one-bedroom',
    categoryName: 'غرفة وصالة',
    title: 'الوحدة رقم ١ - شقة الورد الملكية (غرفة مفردة فاخرة)',
    subtitle: 'أجواء عصرية هادئة بالقرب من المسجد النبوي الشريف مع دخول ذكي',
    description: 'شقة فندقية راقية مصممة بعناية لتمنحكم تجربة إقامة استثنائية في المدينة المنورة. تضم غرفة نوم ماستر بسرير ملكي وثير، صالة جلوس مستقلة بشاشة سمارت، ركن ضيافة متكامل، وحمام فندقي فاخر مزود بكافة المستلزمات.',
    status: 'available',
    capacityGuests: 2,
    bedroomsCount: 1,
    bathroomsCount: 1,
    areaSquareMeters: 45,
    featuredImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'سرير كينج ملكي مريح',
      'تكييف سبلت حديث عالي الكفاءة',
      'إنترنت فائق السرعة Wi-Fi مجاني',
      'شاشة تلفزيون ذكية 55 بوصة مع قنوات الحرم',
      'غلاية وشاي ومياه ضيافة مجانية',
      'ثلاجة ميني بار وميكروويف',
      'حمام خاص بمستلزمات نظافة فاخرة',
      'مواقف سيارات خاصة ومجانية',
      'دخول ذكي وسلس على مدار الساعة',
    ],
    floor: 'الطابق الأرضي / الأول',
    viewDescription: 'إطلالة هادئة ومميزة',
  },
  {
    id: 'unit-2',
    unitNumber: 2,
    category: 'villa',
    categoryName: 'فيلا خاصة',
    title: 'الوحدة رقم ٢ - فيلا دار ورد الفندقية الخاصة',
    subtitle: 'فيلا فخمة مستقلة بمدخل خاص، حديقة خارجية، ومرافق استجمام راقية',
    description: 'فيلا خاصة متكاملة الأركان تمنحك وعائلتك تجربة ضيافة استثنائية تجمع بين الفخامة والخصوصية المطلقة في المدينة المنورة. تتميز بمدخل خاص مع موقف سيارات مستقل، وفناء خارجي مزين بزهور الورد الطبيعية وجلسة خارجية هادئة، وصوالين استقبال رخامية فخمة، وغرف نوم متعددة بأسرّة فاخرة، ومطبخ متكامل يلبي كافة التطلعات.',
    status: 'available',
    capacityGuests: 10,
    bedroomsCount: 4,
    bathroomsCount: 4,
    areaSquareMeters: 280,
    featuredImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'فيلا مستقلة بالكامل مع مدخل وبوابة خاصة',
      'فناء وحديقة خارجية بجلسة مزدانة بالورد',
      '٤ غرف نوم ماستر فخمة ومريحة',
      'صالون استقبال واسع ومجلس عربي تراثي أنيق',
      'مطبخ متكامل التجهيز بأجهزة كهربائية فاخرة',
      'موقف سيارات خاص يتسع لعدة مركبات داخل الفيلا',
      'إنترنت عالي السرعة وشاشات تلفزيون عملاقة',
      'خصوصية تامة واستقلالية لا تضاهى',
    ],
    floor: 'دورين مستقلين (أرضي + أول)',
    viewDescription: 'حديقة الفيلا الخاصة وأجواء المدينة الساحرة',
  },
  {
    id: 'unit-3',
    unitNumber: 3,
    category: 'one-bedroom',
    categoryName: 'غرفة وصالة',
    title: 'الوحدة رقم ٣ - شقة الورد الفندقية (غرفة وصالة)',
    subtitle: 'غرفة نوم ماستر فاخرة مع صالة جلوس راقية وإطلالة هادئة',
    description: 'شقة فندقية مصممة بعناية فائقة لتوفر أقصى درجات الراحة والسكينة لزوار المدينة المنورة. يتميز بأثاث فندقي حديث وديكورات مستوحاة من عبق الورد المديني، مع سرير ملكي مريح، صالة معيشة مستقلة بشاشة ذكية، ركن لتحضير الشاي والمشروبات، وحمام رخامي مزود بكافة المستلزمات.',
    status: 'available',
    capacityGuests: 2,
    bedroomsCount: 1,
    bathroomsCount: 1,
    areaSquareMeters: 48,
    featuredImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'سرير كينج ملكي مريح',
      'تكييف سبلت حديث عالي الكفاءة',
      'إنترنت فائق السرعة Wi-Fi مجاني',
      'شاشة تلفزيون ذكية 55 بوصة مع قنوات الحرم',
      'غلاية وشاي ومياه ضيافة مجانية',
      'ثلاجة ميني بار وميكروويف',
      'حمام خاص بمستلزمات نظافة فاخرة',
      'مواقف سيارات خاصة ومجانية',
    ],
    floor: 'الطابق الأول',
    viewDescription: 'إطلالة هادئة ومميزة',
  },
  {
    id: 'unit-4',
    unitNumber: 4,
    category: 'one-bedroom',
    categoryName: 'غرفة مفردة',
    title: 'الوحدة رقم ٤ - شقة الجوري الفندقية (غرفة مفردة)',
    subtitle: 'أجواء عصرية دافئة بلمسات الورد الأحمر ومفروشات مخملية',
    description: 'تم تصميم الوحدة رقم 4 لتناسب الضيوف الباحثين عن الهدوء والخصوصية التامة في المدينة المنورة. تشمل سريراً مريحاً للغاية مع مفارش قطنية فاخرة، إضاءة مدروسة للاسترخاء، طاولة عمل أو طعام، خزانة ملابس واسعة، وخدمة نظافة دورية على أعلى المعايير.',
    status: 'available',
    capacityGuests: 2,
    bedroomsCount: 1,
    bathroomsCount: 1,
    areaSquareMeters: 42,
    featuredImage: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'سرير نوم فاخر مريح للظهر',
      'واي فاي ألياف بصرية سريع',
      'تكييف هادئ قابل للتحكم',
      'شاشة سمارت تدعم يوتيوب وتطبيقات المشاهدة',
      'ركن ضيافة متكامل',
      'حمام مجهز بماء حار ومجفف شعر',
      'دخول ذكي وسلس',
    ],
    floor: 'الطابق الأول',
    viewDescription: 'إطلالة داخلية هادئة مريحة للنوم',
  },
  {
    id: 'unit-5',
    unitNumber: 5,
    category: 'one-bedroom',
    categoryName: 'استوديو واسع',
    title: 'الوحدة رقم ٥ - شقة ستوديو الياسمين الفندقية (غرفة واسعة)',
    subtitle: 'مساحة فسيحة مع ركن جلوس أنيق ومطبخ تحضيري',
    description: 'استوديو رحب يتميز بتدرجات اللون الأبيض والرمادي ولمسات الورد المخملي. يضم ركناً لمشاهدة التلفاز مع كنب مريح يمكن تحويله لسرير إضافي عند الحاجة، مع مطبخ صغير مزود بموقد كهربائي وثلاجة وميكروويف يلبي احتياجات الإقامة الممتدة.',
    status: 'available',
    capacityGuests: 3,
    bedroomsCount: 1,
    bathroomsCount: 1,
    areaSquareMeters: 52,
    featuredImage: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'سرير كينج + أريكة سرير إضافية',
      'مطبخ تحضيري صغير مجهز بالكامل',
      'ثلاجة متوسطة وميكروويف وغلاية',
      'شاشة 55 بوصة بدقة 4K',
      'واي فاي مجاني عالي السرعة',
      'غسالة ملابس وكاوية بخار',
      'خدمة توصيل طلبات سريعة',
    ],
    floor: 'الطابق الثاني',
    viewDescription: 'إطلالة مفتوحة ومشرقة',
  },
  {
    id: 'unit-6',
    unitNumber: 6,
    category: 'one-bedroom',
    categoryName: 'غرفة عائلية',
    title: 'الوحدة رقم ٦ - شقة الروضة الفندقية (غرفة نوم عائلية)',
    subtitle: 'تناغم بين البساطة والرقي مع سريرين منفصلين حسب الرغبة',
    description: 'تعتبر الوحدة رقم 6 خياراً مثالياً للمعتمرين والأصدقاء، حيث تحتوي على سريرين مفردين فائقَي الراحة أو سرير مزدوج حسب الطلب، مع خزانة مدمجة وحمام عصري بدش مطري ومستلزمات شخصية فاخرة.',
    status: 'available',
    capacityGuests: 2,
    bedroomsCount: 1,
    bathroomsCount: 1,
    areaSquareMeters: 45,
    featuredImage: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'خيار سريرين مفردين مريحين',
      'إنترنت عالي السرعة Wi-Fi',
      'مكيف سبليت هادئ',
      'شاشة تلفزيون ذكية',
      'مستلزمات ضيافة وشاي ومياه نقية',
      'مستلزمات استحمام فندقية',
      'موقف مخصص ومظلل',
    ],
    floor: 'الطابق الثاني',
    viewDescription: 'إطلالة أمامية رحبة',
  },
  {
    id: 'unit-8',
    unitNumber: 8,
    category: 'two-bedrooms',
    categoryName: 'غرفتين وصالة',
    title: 'الوحدة رقم ٨ - شقة عائلية فاخرة (غرفتي نوم وصالة واسعة)',
    subtitle: 'إقامة عائلية راقية تسع حتى ٥ أشخاص مع صالة طعام ومطبخ متكامل',
    description: 'شقة فاخرة بمساحة واسعة تضم غرفة نوم رئيسية بسرير كينج مع حمام خاص، وغرفة نوم ثانية بسريرين منفصلين، بالإضافة إلى صالة جلوس عائلية فسيحة وطاولة لتناول الطعام، ومطبخ عصري متكامل الأجهزة. توفر الشقة أجواء الخصوصية التامة للعائلات القادمة لزيارة المسجد النبوي الشريف.',
    status: 'available',
    capacityGuests: 5,
    bedroomsCount: 2,
    bathroomsCount: 2,
    areaSquareMeters: 95,
    featuredImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'غرفتي نوم منفصلتين بالكامل',
      'حمامين مستقلين مجهزين بأحدث التجهيزات',
      'صالة معيشة كبيرة مع طقم كنب فاخر',
      'مطبخ متكامل (فرن، ثلاجة كبيرة، غسالة، ميكروويف، أدوات طبخ)',
      'شاشة 65 بوصة سمارت في الصالة + شاشة في غرفة الماستر',
      'إنترنت سريع جداً مخصص للشقة',
      'مواقف خاصة للسيارات',
      'خدمة التوصيل وتأمين الاحتياجات',
    ],
    floor: 'الطابق الثالث',
    viewDescription: 'إطلالة بانورامية رائعة على معالم المدينة',
  },
  {
    id: 'unit-9',
    unitNumber: 9,
    category: 'three-bedrooms',
    categoryName: 'ثلاث غرف ومجلس',
    title: 'الوحدة رقم ٩ - شقة فندقية ملكية عائلية (٣ غرف نوم ومجلس)',
    subtitle: 'فخامة لا تضاهى للعائلات الكبيرة والوفود في قلب المدينة المنورة',
    description: 'تعتبر الوحدة رقم 9 درة دار ورد للضيافة، حيث تمتد على مساحة شاسعة وتضم ثلاثة غرف نوم مصممة بأعلى درجات الرفاهية: غرفة ماستر ملكية مع حمام جاكوزي، وغرفة ثانية بسرير مزدوج، وغرفة ثالثة بثلاثة أسرة مفردة، بالإضافة إلى مجلس ضيافة عربي أصيل ومطبخ مجهز ومنطقة طعام تستوعب 8 أشخاص.',
    status: 'available',
    capacityGuests: 8,
    bedroomsCount: 3,
    bathroomsCount: 3,
    areaSquareMeters: 145,
    featuredImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      '٣ غرف نوم فندقية فخمة',
      '٣ حمامات مجهزة بأعلى مستوى',
      'مجلس ضيافة عربي مستقل وصالة جلوس حديثة',
      'سفرة طعام راقية تتسع لكامل العائلة',
      'مطبخ متكامل واسع مجهز بجميع الأجهزة والأواني',
      'غسالة ملابس أوتوماتيك وكاوية ومجفف',
      'شاشات ذكية متعددة وإنترنت ألياف ضوئية',
      'موقفين سيارات مخصصين مع مصعد مباشر',
    ],
    floor: 'الطابق الرابع',
    viewDescription: 'إطلالة مفتوحة مع شرفة واسعة مطلة على الأفق',
  },
  {
    id: 'unit-11',
    unitNumber: 11,
    category: 'villa',
    categoryName: 'فيلا مستقلة',
    title: 'الوحدة رقم ١١ - فيلا دار ورد الفندقية المستقلة',
    subtitle: 'فيلا فارهة بمدخل خاص، مجالس رحبة، وحديقة خاصة للعائلات والوفود',
    description: 'فيلا فندقية خاصة توفر أعلى درجات الخصوصية والرفاهية لزوار المسجد النبوي الشريف. تتميز بمدخل خاص وبوابة مستقلة، فناء خارجي وحديقة خاصة، صوالين ومجالس ضيافة واسعة، مطبخ متكامل التجهيز، وغرف نوم فخمة تضمن إقامة مريحة واستثنائية لكافة أفراد العائلة.',
    status: 'available',
    capacityGuests: 10,
    bedroomsCount: 4,
    bathroomsCount: 4,
    areaSquareMeters: 270,
    featuredImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'فيلا مستقلة بالكامل مع مدخل وبوابة خاصة',
      'فناء وحديقة خارجية بجلسة عائلية مريحة',
      '٤ غرف نوم فسيحة بأسرّة فندقية فاخرة',
      'مجلس ضيافة عربي مستقل وصالون استقبال كبير',
      'مطبخ متكامل مجهز بكافة الأجهزة وأدوات الطهي',
      'موقف سيارات خاص مظلل داخل الفيلا',
      'شاشات تلفزيون ذكية وإنترنت فائق السرعة',
      'دخول ذاتي ذكي وخصوصية تامة',
    ],
    floor: 'طابقين مستقلين (أرضي + علوي)',
    viewDescription: 'إطلالة على الحديقة الخاصة وأجواء طيبة الطيبة',
  },
  {
    id: 'unit-12',
    unitNumber: 12,
    category: 'one-bedroom',
    categoryName: 'غرفة وصالة',
    title: 'الوحدة رقم ١٢ - شقة فندقية فاخرة (غرفة وصالة)',
    subtitle: 'إقامة أنيقة مجهزة بالكامل لضيوف وزوار المدينة المنورة',
    description: 'شقة فندقية حديثة تجمع بين الفخامة والعملية، تضم غرفة نوم ماستر بسرير كينج مريح، صالة معيشة رحبة بشاشة ذكية متصلة بالإنترنت، ركن ضيافة متكامل، وحمام فندقي فاخر مزود بكافة المستلزمات اليومية.',
    status: 'available',
    capacityGuests: 2,
    bedroomsCount: 1,
    bathroomsCount: 1,
    areaSquareMeters: 50,
    featuredImage: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'سرير ماستر ملكي فائق الراحة',
      'صالة معيشة أنيقة ومستقلة',
      'شاشة سمارت تدعم يوتيوب وقنوات البث',
      'واي فاي ألياف ضوئية سريع ومجاني',
      'تكييف سبليت عالي الكفاءة',
      'ركن ضيافة مع غلاية ومشروبات ومياه مجانية',
      'حمام خاص بمستلزمات نظافة فاخرة',
      'موقف سيارات مخصص ومجاني',
      'دخول ذكي وسلس على مدار الساعة',
    ],
    floor: 'الطابق الثاني',
    viewDescription: 'إطلالة هادئة ومميزة',
  },
];

const WHATSAPP_NUMBER = '966509993010';
const SITE_THUMBNAIL = 'https://i.postimg.cc/HW9TjbXZ/file-00000000745482089954733c42f52076.png';

function generateUnitHtml(unit) {
  const whatsappText = encodeURIComponent(`السلام عليكم ورحمة الله، رأيت الوحدة رقم "${unit.unitNumber}" فى موقعكم وأود حجزها .`);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`;

  const imagesJson = JSON.stringify(unit.images);

  return `<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${unit.title} | دار ورد للضيافة بالمدينة المنورة</title>
    
    <!-- Meta & SEO Tags -->
    <meta name="description" content="${unit.subtitle} - ${unit.description.slice(0, 140)}..." />
    <meta name="keywords" content="${unit.title}, دار ورد للضيافة, شقق مفروشة المدينة المنورة, حجز شقق المدينة, Dar Ward Hospitality Unit ${unit.unitNumber}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta name="theme-color" content="#881337" />

    <!-- OpenGraph Social Cards -->
    <meta property="og:type" content="hotel" />
    <meta property="og:site_name" content="دار ورد للضيافة - Dar Ward Hospitality" />
    <meta property="og:title" content="${unit.title} | دار ورد للضيافة" />
    <meta property="og:description" content="${unit.subtitle}" />
    <meta property="og:image" content="${unit.featuredImage || SITE_THUMBNAIL}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content="https://darward.com/unit-${unit.unitNumber}.html" />

    <!-- Twitter Cards -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${unit.title}" />
    <meta name="twitter:description" content="${unit.subtitle}" />
    <meta name="twitter:image" content="${unit.featuredImage || SITE_THUMBNAIL}" />

    <!-- Fonts & Icons -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Schema.org JSON-LD -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "HotelRoom",
      "name": "${unit.title}",
      "description": "${unit.description}",
      "image": ${imagesJson},
      "occupancy": {
        "@type": "QuantitativeValue",
        "maxValue": ${unit.capacityGuests},
        "unitText": "Person"
      },
      "numberOfBedrooms": ${unit.bedroomsCount},
      "numberOfBathroomsTotal": ${unit.bathroomsCount},
      "floorSize": {
        "@type": "QuantitativeValue",
        "value": ${unit.areaSquareMeters},
        "unitCode": "MTK"
      },
      "containedInPlace": {
        "@type": "Hotel",
        "name": "دار ورد للضيافة",
        "url": "https://darward.com/"
      }
    }
    </script>
    <style>
      body { font-family: 'Cairo', sans-serif; }
      .font-amiri { font-family: 'Amiri', serif; }
    </style>
  </head>
  <body class="bg-[#faf7f4] text-[#2c1810] selection:bg-[#9f1239] selection:text-white antialiased">
    <!-- Header Navigation -->
    <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <a href="/#units" class="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-50 text-[#881337] hover:bg-rose-100 font-bold text-sm transition-colors">
          <span>← العودة لكافة الوحدات</span>
        </a>

        <a href="/" class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#881337] to-[#be123c] flex items-center justify-center text-white font-bold text-lg shadow">
            🌸
          </div>
          <div>
            <h1 class="font-amiri font-bold text-lg sm:text-xl text-[#881337] leading-tight">دار ورد للضيافة</h1>
            <p class="text-[11px] text-gray-500">المدينة المنورة - حي بني عبد الأشهل</p>
          </div>
        </a>

        <div class="flex items-center gap-2">
          <button onclick="shareUnit()" id="header-share-btn" class="px-3.5 py-2 rounded-xl bg-white hover:bg-rose-50 text-[#881337] border border-rose-200 font-bold text-xs sm:text-sm shadow-sm flex items-center gap-1.5 transition-all">
            <span>🔗</span>
            <span>مشاركة الوحدة</span>
          </button>

          <a href="${whatsappUrl}" target="_blank" class="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs sm:text-sm shadow flex items-center gap-1.5 transition-all">
            <span>حجز فوري عبر واتساب</span>
          </a>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <!-- Breadcrumb -->
      <nav class="flex items-center justify-between text-xs text-gray-500 mb-6">
        <div class="flex items-center gap-2">
          <a href="/" class="hover:text-[#9f1239]">الرئيسية</a>
          <span>/</span>
          <a href="/#units" class="hover:text-[#9f1239]">وحدات الإقامة</a>
          <span>/</span>
          <span class="text-[#881337] font-bold">الوحدة رقم ${unit.unitNumber}</span>
        </div>

        <button onclick="shareUnit()" class="inline-flex items-center gap-1.5 text-xs text-[#881337] font-bold bg-white px-3 py-1.5 rounded-xl border border-rose-200 shadow-sm hover:bg-rose-50 transition-all">
          <span>📤 مشاركة رابط الوحدة</span>
        </button>
      </nav>

      <!-- Unit Title & Badges -->
      <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-3 py-1 rounded-xl bg-gradient-to-r from-[#881337] to-[#9f1239] text-white text-xs font-bold shadow">
              الوحدة رقم ${unit.unitNumber}
            </span>
            <span class="px-3 py-1 rounded-xl bg-rose-100 text-[#881337] text-xs font-bold border border-rose-200">
              ${unit.categoryName}
            </span>
          </div>
          <h2 class="font-amiri text-2xl sm:text-4xl font-bold text-[#2c1810]">
            ${unit.title}
          </h2>
          <p class="text-sm sm:text-base text-gray-600 mt-1">
            ${unit.subtitle}
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button onclick="shareUnit()" id="main-share-btn" class="px-4 py-3 rounded-2xl bg-white hover:bg-rose-50 text-[#881337] font-bold text-sm border-2 border-rose-200 shadow-md flex items-center gap-2 transition-all active:scale-95">
            <span>🔗 مشاركة</span>
          </button>

          <a href="${whatsappUrl}" target="_blank" class="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#881337] to-[#9f1239] text-white font-bold text-sm shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center gap-2">
            <span>طلب حجز هذه الوحدة عبر واتساب</span>
            <span>💬</span>
          </a>
        </div>
      </div>

      <!-- Photo Gallery Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div class="md:col-span-2 h-[340px] sm:h-[440px] rounded-3xl overflow-hidden shadow-xl border border-rose-100 group relative">
          <img id="main-img" src="${unit.images[0]}" alt="${unit.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer" onclick="openLightbox(0)" />
          <div class="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-xl font-bold">
            انقر لتكبير الصور (${unit.images.length} صور)
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-1 gap-4">
          ${unit.images.slice(1, 3).map((img, idx) => `
            <div class="h-[160px] sm:h-[212px] rounded-2xl overflow-hidden shadow-md border border-rose-100 group relative">
              <img src="${img}" alt="${unit.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer" onclick="openLightbox(${idx + 1})" />
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Specs & Details Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <!-- Left 2 Cols: Details & Amenities -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Specs Cards -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-5 rounded-3xl border border-rose-100 shadow-md text-center">
            <div class="p-3 bg-rose-50/60 rounded-2xl">
              <span class="text-xs text-gray-500 block">السعة</span>
              <strong class="text-base text-[#881337]">${unit.capacityGuests} ضيوف</strong>
            </div>
            <div class="p-3 bg-rose-50/60 rounded-2xl">
              <span class="text-xs text-gray-500 block">الغرف</span>
              <strong class="text-base text-[#881337]">${unit.bedroomsCount} غرفة نوم</strong>
            </div>
            <div class="p-3 bg-rose-50/60 rounded-2xl">
              <span class="text-xs text-gray-500 block">الحمامات</span>
              <strong class="text-base text-[#881337]">${unit.bathroomsCount} حمام فاخر</strong>
            </div>
            <div class="p-3 bg-rose-50/60 rounded-2xl">
              <span class="text-xs text-gray-500 block">المساحة</span>
              <strong class="text-base text-[#881337]">${unit.areaSquareMeters} م²</strong>
            </div>
          </div>

          <!-- Description -->
          <div class="bg-white p-6 sm:p-8 rounded-3xl border border-rose-100 shadow-md">
            <h3 class="font-amiri text-2xl font-bold text-[#881337] mb-3">وصف وتفاصيل الوحدة</h3>
            <p class="text-gray-700 leading-relaxed text-sm sm:text-base whitespace-pre-line">
              ${unit.description}
            </p>
          </div>
        </div>

        <!-- Right Col: Booking Box -->
        <div class="space-y-6">
          <div class="bg-gradient-to-b from-white to-[#fffbf7] p-6 sm:p-8 rounded-3xl border-2 border-rose-200 shadow-xl sticky top-28">
            <div class="text-center pb-6 border-b border-rose-100">
              <span class="text-xs text-gray-500 block mb-1">حجز مباشر ومضمون</span>
              <h4 class="font-amiri text-2xl font-bold text-[#881337]">دار ورد للضيافة</h4>
              <p class="text-xs text-emerald-700 font-bold mt-1">أفضل الأسعار بدون عمولات وسيط</p>
            </div>

            <div class="py-6 space-y-3">
              <a href="${whatsappUrl}" target="_blank" class="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all">
                <span>حجز الوحدة رقم ${unit.unitNumber} عبر واتساب</span>
              </a>

              <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('السلام عليكم، أود الاستفسار عن توفر الوحدة رقم ' + unit.unitNumber)}" target="_blank" class="w-full py-3 rounded-2xl bg-stone-900 hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-2 transition-all">
                <span>استفسار عن التوفر والخدمات</span>
              </a>
            </div>

            <div class="pt-4 border-t border-rose-100 text-center text-xs text-gray-500 space-y-1">
              <p>📍 المدينة المنورة - بالقرب من الحرم الشريف</p>
              <p>⚡ دخول ذاتي ذكي متاح 24 ساعة</p>
              <p>📞 هاتف وواتساب: 966509993010+</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Lightbox Modal -->
    <div id="lightbox" class="fixed inset-0 z-[100] bg-black/90 hidden items-center justify-center p-4">
      <button onclick="closeLightbox()" class="absolute top-4 left-4 text-white text-3xl font-bold bg-white/20 w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/40">✕</button>
      <img id="lightbox-img" src="" alt="Fullscreen preview" class="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl" />
      <div class="absolute bottom-6 flex gap-3">
        <button onclick="prevLightbox()" class="px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-sm backdrop-blur-md">السابق</button>
        <button onclick="nextLightbox()" class="px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-sm backdrop-blur-md">التالي</button>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-[#1c100b] text-stone-300 py-10 border-t-4 border-[#9f1239] text-center text-xs">
      <div class="max-w-4xl mx-auto px-4 space-y-3">
        <p class="font-amiri text-lg text-white font-bold">دار ورد للضيافة - المدينة المنورة</p>
        <p class="text-stone-400">وحدات سكنية مفروشة - إيجار يومي وشهري وسنوي بالقرب من المسجد النبوي الشريف</p>
        <div class="pt-4 flex flex-wrap justify-center items-center gap-4 text-stone-400">
          <a href="/#units" class="hover:text-white underline">كافة الوحدات</a>
          <span>•</span>
          <a href="/#location" class="hover:text-white underline">الموقع والخريطة</a>
          <span>•</span>
          <a href="${whatsappUrl}" target="_blank" class="hover:text-white underline">تواصل واتساب</a>
          <span>•</span>
          <a href="https://www.tiktok.com/@darward" target="_blank" class="hover:text-[#25F4EE] flex items-center gap-1 font-bold">TikTok</a>
          <span>•</span>
          <a href="https://www.booking.com" target="_blank" class="hover:text-[#006ce4] flex items-center gap-1 font-bold">Booking.com</a>
          <span>•</span>
          <a href="https://www.airbnb.com" target="_blank" class="hover:text-[#FF5A5F] flex items-center gap-1 font-bold">Airbnb</a>
        </div>
      </div>
    </footer>

    <script>
      const gallery = ${imagesJson};
      let currentIdx = 0;

      function shareUnit() {
        const shareData = {
          title: '${unit.title} - دار ورد للضيافة',
          text: '${unit.subtitle}',
          url: window.location.href,
        };

        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
          navigator.share(shareData).catch(() => {});
        } else {
          navigator.clipboard.writeText(window.location.href).then(() => {
            showToast('✓ تم نسخ رابط الوحدة بنجاح إلى الحافظة');
          }).catch(() => {
            prompt('رابط الوحدة للمشاركة:', window.location.href);
          });
        }
      }

      function showToast(msg) {
        let toast = document.getElementById('share-toast');
        if (!toast) {
          toast = document.createElement('div');
          toast.id = 'share-toast';
          toast.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 z-[110] bg-stone-900/95 text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-2xl shadow-2xl border border-rose-500/40 transition-all duration-300 pointer-events-none opacity-0 translate-y-4';
          document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.classList.remove('opacity-0', 'translate-y-4');
        toast.classList.add('opacity-100', 'translate-y-0');
        setTimeout(() => {
          toast.classList.remove('opacity-100', 'translate-y-0');
          toast.classList.add('opacity-0', 'translate-y-4');
        }, 3000);
      }

      function openLightbox(idx) {
        currentIdx = idx;
        document.getElementById('lightbox-img').src = gallery[currentIdx];
        const lb = document.getElementById('lightbox');
        lb.classList.remove('hidden');
        lb.classList.add('flex');
      }

      function closeLightbox() {
        const lb = document.getElementById('lightbox');
        lb.classList.add('hidden');
        lb.classList.remove('flex');
      }

      function prevLightbox() {
        currentIdx = (currentIdx - 1 + gallery.length) % gallery.length;
        document.getElementById('lightbox-img').src = gallery[currentIdx];
      }

      function nextLightbox() {
        currentIdx = (currentIdx + 1) % gallery.length;
        document.getElementById('lightbox-img').src = gallery[currentIdx];
      }

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') nextLightbox();
      });
    </script>
  </body>
</html>`;
}

// Generate files in public directory
const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

UNITS.forEach((unit) => {
  const filePath = path.join(publicDir, `unit-${unit.unitNumber}.html`);
  const htmlContent = generateUnitHtml(unit);
  fs.writeFileSync(filePath, htmlContent, 'utf8');
  console.log(`Generated: ${filePath}`);
});

console.log('All unit HTML pages generated successfully!');
