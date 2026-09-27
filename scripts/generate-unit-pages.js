import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read initialData.ts to ensure 100% sync with source data
const initialDataPath = path.resolve(__dirname, '../src/data/initialData.ts');
const initialDataContent = fs.readFileSync(initialDataPath, 'utf8');

// Extract INITIAL_SETTINGS and INITIAL_UNITS from initialData.ts
let units = [];
let settings = {};

try {
  const unitsMatch = initialDataContent.match(/export const INITIAL_UNITS:\s*Unit\[\]\s*=\s*(\[[\s\S]*?\]);\s*$/);
  const settingsMatch = initialDataContent.match(/export const INITIAL_SETTINGS:\s*SiteSettings\s*=\s*(\{[\s\S]*?\});/);

  if (unitsMatch && unitsMatch[1]) {
    units = eval(`(${unitsMatch[1]})`);
  }
  if (settingsMatch && settingsMatch[1]) {
    settings = eval(`(${settingsMatch[1]})`);
  }
} catch (e) {
  console.error('Error parsing initialData.ts, using fallback', e);
}

const WHATSAPP_NUMBER = (settings?.whatsapp1?.number || '966509993010').replace(/\D/g, '');
const SITE_THUMBNAIL = settings?.coverImageUrl || 'https://i.postimg.cc/fWPYgDny/file-00000000045482088e47a735dae421a9.png';

function generateUnitHtml(unit) {
  const whatsappText = encodeURIComponent(`السلام عليكم ورحمة الله، رأيت الوحدة رقم "${unit.unitNumber}" (${unit.title}) فى موقعكم وأود الاستفسار عن حجزها.`);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`;

  const imagesJson = JSON.stringify(unit.images || [unit.featuredImage]);
  const primaryImg = unit.featuredImage || (unit.images && unit.images[0]) || SITE_THUMBNAIL;
  const unitSubtitle = unit.subtitle || unit.description.slice(0, 100);

  return `<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${unit.title} | دار ورد للضيافة بالمدينة المنورة</title>
    
    <!-- Google Search Console Verification & Snippet Thumbnails -->
    <meta name="google-site-verification" content="5IbLD2xrJIS1Wv_5TGo4jtJIH8iQCBVWM4DVKY4Sbko" />
    <meta name="thumbnail" content="${primaryImg}" />
    <meta name="googlebot-image" content="index, follow" />

    <!-- Google Search Snippet Favicons -->
    <link rel="icon" type="image/png" sizes="48x48" href="${primaryImg}" />
    <link rel="icon" type="image/png" sizes="96x96" href="${primaryImg}" />
    <link rel="icon" type="image/png" sizes="192x192" href="${primaryImg}" />
    <link rel="shortcut icon" href="${primaryImg}" />
    <link rel="apple-touch-icon" sizes="180x180" href="${primaryImg}" />

    <!-- Meta & SEO Tags -->
    <meta name="description" content="${unitSubtitle} - ${unit.description.slice(0, 140)}..." />
    <meta name="keywords" content="${unit.title}, دار ورد للضيافة, شقق مفروشة المدينة المنورة, حجز شقق المدينة, Dar Ward Hospitality Unit ${unit.unitNumber}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta name="theme-color" content="#881337" />

    <!-- OpenGraph Social Cards -->
    <meta property="og:type" content="hotel" />
    <meta property="og:site_name" content="دار ورد للضيافة - Dar Ward Hospitality" />
    <meta property="og:title" content="${unit.title} | دار ورد للضيافة" />
    <meta property="og:description" content="${unitSubtitle}" />
    <meta property="og:image" content="${primaryImg}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content="https://darward.com/unit-${unit.unitNumber}.html" />

    <!-- Twitter Cards -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${unit.title}" />
    <meta name="twitter:description" content="${unitSubtitle}" />
    <meta name="twitter:image" content="${primaryImg}" />

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
      /* Prevent Netlify Badge / Banner / Drawer Rendering */
      [data-netlify-badge], .netlify-badge, #netlify-badge, [id*="netlify"], [class*="netlify"], iframe[src*="netlify"], div[class*="netlify"], #netlify-feedback-drawer, .netlify-feedback-drawer, a[href*="netlify.com"] {
        display: none !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; height: 0 !important; width: 0 !important; position: absolute !important; top: -9999px !important; left: -9999px !important; clip: rect(0, 0, 0, 0) !important;
      }
    </style>
    <script>
      (function() {
        function removeNetlifyElements() {
          try {
            var netlifyEls = document.querySelectorAll(
              '[data-netlify-badge], .netlify-badge, #netlify-badge, [id*="netlify"], [class*="netlify"], iframe[src*="netlify"], a[href*="netlify.com"], #netlify-feedback-drawer, .netlify-feedback-drawer'
            );
            netlifyEls.forEach(function(el) {
              if (el && el.parentNode) {
                el.parentNode.removeChild(el);
              }
            });
            var allElements = document.querySelectorAll('div, span, a, p, iframe, footer');
            allElements.forEach(function(el) {
              if (el.children.length === 0 && el.textContent && el.textContent.toLowerCase().includes('powered by netlify')) {
                if (el.parentNode) el.parentNode.removeChild(el);
              }
            });
          } catch(e) {}
        }

        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', removeNetlifyElements);
        } else {
          removeNetlifyElements();
        }

        if (typeof MutationObserver !== 'undefined') {
          var observer = new MutationObserver(function() {
            removeNetlifyElements();
          });
          observer.observe(document.documentElement, {
            childList: true,
            subtree: true
          });
        }
      })();
    </script>
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
          <a href="/" class="hover:text-[#881337]">الرئيسية</a>
          <span>/</span>
          <a href="/#units" class="hover:text-[#881337]">الوحدات السكنية</a>
          <span>/</span>
          <span class="text-[#881337] font-bold">${unit.title}</span>
        </div>

        <div class="flex items-center gap-2">
          ${
            unit.tiktokVideoUrl
              ? `<a href="${unit.tiktokVideoUrl}" target="_blank" class="px-3 py-1.5 rounded-lg bg-black text-white text-xs font-bold flex items-center gap-1 hover:opacity-90">
                  <span>🎵</span> مشاهدة الفيديو
                 </a>`
              : ''
          }
        </div>
      </nav>

      <!-- Unit Title & Specs Header -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-100 mb-8">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-rose-100">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-[#881337] text-xs font-bold border border-rose-200 mb-3">
              <span>رقم الوحدة: ${unit.unitNumber}</span>
              <span>•</span>
              <span>${unit.floor || 'دار ورد'}</span>
            </div>
            <h1 class="font-amiri text-3xl sm:text-4xl font-bold text-[#881337]">${unit.title}</h1>
          </div>

          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a href="${whatsappUrl}" target="_blank" class="px-7 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-center shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
              <span class="text-lg">💬</span>
              <span>استفسار وحجز مباشر</span>
            </a>
          </div>
        </div>

        <!-- Quick Spec Badges -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          <div class="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 flex items-center gap-3">
            <div class="text-2xl">👥</div>
            <div>
              <span class="text-xs text-gray-500 block">السعة</span>
              <span class="font-bold text-sm text-[#881337]">حتى ${unit.capacityGuests} أشخاص</span>
            </div>
          </div>

          <div class="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 flex items-center gap-3">
            <div class="text-2xl">🛏️</div>
            <div>
              <span class="text-xs text-gray-500 block">غرف النوم</span>
              <span class="font-bold text-sm text-[#881337]">${unit.bedroomsCount} غرفة</span>
            </div>
          </div>

          <div class="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 flex items-center gap-3">
            <div class="text-2xl">🚿</div>
            <div>
              <span class="text-xs text-gray-500 block">دورات المياه</span>
              <span class="font-bold text-sm text-[#881337]">${unit.bathroomsCount} حمام</span>
            </div>
          </div>

          <div class="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 flex items-center gap-3">
            <div class="text-2xl">📐</div>
            <div>
              <span class="text-xs text-gray-500 block">المساحة</span>
              <span class="font-bold text-sm text-[#881337]">${unit.areaSquareMeters} م²</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Photo Gallery -->
      <section class="mb-10">
        <h2 class="font-amiri text-2xl font-bold text-[#881337] mb-4 flex items-center gap-2">
          <span>📸</span>
          <span>معرض صور الوحدة</span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="relative rounded-3xl overflow-hidden shadow-lg border border-rose-100 aspect-[4/3] group cursor-pointer" onclick="openLightbox(0)">
            <img src="${primaryImg}" alt="${unit.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
              <span class="text-white text-sm font-bold bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                🔍 انقر لتكبير الصورة
              </span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            ${(unit.images || [primaryImg])
              .map(
                (img, idx) => `
              <div class="relative rounded-2xl overflow-hidden shadow border border-rose-100 aspect-[4/3] group cursor-pointer" onclick="openLightbox(${idx})">
                <img src="${img}" alt="${unit.title} - صورة ${idx + 1}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      </section>

      <!-- Unit Description & Amenities -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div class="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-100">
          <h2 class="font-amiri text-2xl font-bold text-[#881337] mb-4">تفاصيل ومواصفات الوحدة</h2>
          <div class="text-gray-700 leading-relaxed space-y-4 whitespace-pre-line text-sm sm:text-base border-b border-rose-100 pb-6 mb-6">
            ${unit.description}
          </div>

          <h3 class="font-bold text-lg text-[#881337] mb-4">المميزات والتجهيزات الفندقية</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${(unit.amenities || [])
              .map(
                (amenity) => `
              <div class="flex items-center gap-2.5 p-3 rounded-xl bg-rose-50/40 border border-rose-100 text-xs sm:text-sm font-medium text-stone-800">
                <span class="w-2 h-2 rounded-full bg-[#9f1239]"></span>
                <span>${amenity}</span>
              </div>
            `
              )
              .join('')}
          </div>
        </div>

        <!-- Sticky Booking Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-gradient-to-b from-[#2a0813] to-[#150309] text-white rounded-3xl p-6 shadow-2xl border-2 border-[#d4af37]/60 sticky top-28">
            <h3 class="font-amiri text-2xl font-bold text-[#fde047] mb-2 text-center">طلب حجز مباشر</h3>
            <p class="text-xs text-rose-200/90 text-center mb-6">
              تواصل مباشرة مع إدارة دار ورد عبر الواتساب لتأكيد توفر الوحدة وتثبيت حجزك بأفضل سعر
            </p>

            <div class="space-y-3 mb-6">
              <div class="p-3 rounded-xl bg-white/10 border border-white/10 text-xs flex justify-between">
                <span class="text-rose-200">رقم الوحدة:</span>
                <span class="font-bold text-white">${unit.unitNumber}</span>
              </div>
              <div class="p-3 rounded-xl bg-white/10 border border-white/10 text-xs flex justify-between">
                <span class="text-rose-200">النوع:</span>
                <span class="font-bold text-white">${unit.title}</span>
              </div>
              <div class="p-3 rounded-xl bg-white/10 border border-white/10 text-xs flex justify-between">
                <span class="text-rose-200">السعة القصوى:</span>
                <span class="font-bold text-white">${unit.capacityGuests} ضيوف</span>
              </div>
            </div>

            <a href="${whatsappUrl}" target="_blank" class="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-center text-sm shadow-xl flex items-center justify-center gap-2 transition-all">
              <span>💬 إرسال طلب الحجز عبر واتساب</span>
            </a>

            <div class="mt-4 pt-4 border-t border-white/10 text-center text-[11px] text-rose-200/70">
              ✓ تأكيد فوري وخدمة استقبال على مدار ٢٤ ساعة
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Lightbox Modal -->
    <div id="lightbox" class="fixed inset-0 z-50 bg-black/95 hidden items-center justify-center p-4">
      <button onclick="closeLightbox()" class="absolute top-6 right-6 text-white text-3xl font-bold p-2 hover:opacity-80">✕</button>
      <div class="max-w-4xl max-h-[85vh] relative">
        <img id="lightbox-img" src="" alt="Zoom" class="max-w-full max-h-[80vh] rounded-2xl object-contain shadow-2xl mx-auto" />
      </div>
      <div class="absolute bottom-6 inset-x-0 flex justify-center gap-4">
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
          <a href="${settings?.tiktokUrl || 'https://www.tiktok.com/@darward'}" target="_blank" class="hover:text-[#25F4EE] flex items-center gap-1 font-bold">TikTok</a>
          <span>•</span>
          <a href="${settings?.bookingUrl || 'https://www.booking.com'}" target="_blank" class="hover:text-[#006ce4] flex items-center gap-1 font-bold">Booking.com</a>
          <span>•</span>
          <a href="${settings?.airbnbUrl || 'https://www.airbnb.com'}" target="_blank" class="hover:text-[#FF5A5F] flex items-center gap-1 font-bold">Airbnb</a>
        </div>
      </div>
    </footer>

    <script>
      const gallery = ${imagesJson};
      let currentIdx = 0;

      function shareUnit() {
        const shareData = {
          title: '${unit.title} - دار ورد للضيافة',
          text: '${unitSubtitle}',
          url: window.location.href,
        };

        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
          navigator.share(shareData).catch(() => {});
        } else {
          navigator.clipboard.writeText(window.location.href).then(() => {
            alert('✓ تم نسخ رابط الوحدة بنجاح إلى الحافظة');
          }).catch(() => {
            prompt('رابط الوحدة للمشاركة:', window.location.href);
          });
        }
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

units.forEach((unit) => {
  const filePath = path.join(publicDir, `unit-${unit.unitNumber}.html`);
  const htmlContent = generateUnitHtml(unit);
  fs.writeFileSync(filePath, htmlContent, 'utf8');
  console.log(`Generated: ${filePath}`);
});

// Generate sitemap.xml
const todayStr = new Date().toISOString().split('T')[0];
const sitemapUrls = [
  { url: 'https://darward.com/', priority: '1.0', changefreq: 'daily' },
  ...units.map((unit) => ({
    url: `https://darward.com/unit-${unit.unitNumber}.html`,
    priority: '0.8',
    changefreq: 'weekly',
  })),
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${sitemapUrls
  .map(
    (item) => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${todayStr}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

const sitemapPath = path.join(publicDir, 'sitemap.xml');
fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');
console.log(`Generated Sitemap: ${sitemapPath}`);

console.log(`All ${units.length} unit HTML pages and sitemap.xml generated successfully!`);
