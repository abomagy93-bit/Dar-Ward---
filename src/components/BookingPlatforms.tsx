import React, { useRef, useState } from 'react';
import { useHospitality } from '../context/HospitalityContext';
import { RoseDivider } from './RoseDecorations';
import {
  ExternalLink,
  Star,
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  MessageCircle,
  SlidersHorizontal,
  UserCheck,
  Zap,
} from 'lucide-react';

export const BookingPlatforms: React.FC = () => {
  const { settings, language, t } = useHospitality();
  const [currentBookingIndex, setCurrentBookingIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const totalChannels = 4;

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cards = container.children;
      if (cards[index]) {
        (cards[index] as HTMLElement).scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
        setCurrentBookingIndex(index);
      }
    }
  };

  const handleNext = () => {
    const nextIdx = Math.min(currentBookingIndex + 1, totalChannels - 1);
    scrollToIndex(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = Math.max(currentBookingIndex - 1, 0);
    scrollToIndex(prevIdx);
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = container.firstElementChild
      ? (container.firstElementChild as HTMLElement).offsetWidth + 24
      : 400;
    const scrollLeft = Math.abs(container.scrollLeft);
    const newIdx = Math.round(scrollLeft / cardWidth);
    if (newIdx >= 0 && newIdx < totalChannels && newIdx !== currentBookingIndex) {
      setCurrentBookingIndex(newIdx);
    }
  };

  const openWhatsApp = (number: string, msg: string) => {
    const cleanNumber = number.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="booking-platforms" className="py-20 bg-[#faf7f4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-100 text-[#9f1239] text-xs font-bold border border-rose-200 mb-3 shadow-sm">
            <Award className="w-3.5 h-3.5" />
            <span>{t('platformsBadge')}</span>
          </div>

          <h2 className="font-['Amiri',serif] text-3xl sm:text-5xl font-bold text-[#881337] mb-3">
            {t('platformsTitle')}
          </h2>

          <p className="text-base sm:text-lg text-[#5c4033] leading-relaxed">
            {t('platformsDescription')}
          </p>

          <RoseDivider className="my-6" />
        </div>

        {/* Horizontal Booking Options Track */}
        <div className="relative group/bookingTrack">
          {/* Side Floating Buttons (Desktop) */}
          <button
            onClick={handlePrev}
            disabled={currentBookingIndex === 0}
            className={`hidden lg:flex absolute rtl:-right-5 ltr:-left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/95 text-[#881337] shadow-xl border border-rose-200 items-center justify-center transition-all ${
              currentBookingIndex === 0
                ? 'opacity-0 pointer-events-none'
                : 'hover:bg-rose-50 hover:scale-110'
            }`}
            aria-label="Previous"
          >
            {language === 'ar' ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
          </button>
          <button
            onClick={handleNext}
            disabled={currentBookingIndex >= totalChannels - 1}
            className={`hidden lg:flex absolute rtl:-left-5 ltr:-right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#9f1239] text-white shadow-xl border border-[#d4af37]/60 items-center justify-center transition-all ${
              currentBookingIndex >= totalChannels - 1
                ? 'opacity-0 pointer-events-none'
                : 'hover:bg-[#881337] hover:scale-110'
            }`}
            aria-label="Next"
          >
            {language === 'ar' ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
          </button>

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex flex-row overflow-x-auto gap-6 pb-6 pt-2 snap-x snap-mandatory scroll-smooth focus:outline-none"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#f43f5e #ffe4e6',
            }}
          >
            {/* Card 1: Booking.com */}
            <div className="w-[88vw] sm:w-[380px] md:w-[410px] lg:w-[430px] flex-shrink-0 snap-start bg-white rounded-3xl p-7 shadow-xl border-2 border-[#003580]/20 hover:border-[#003580] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="bg-[#003580] text-white font-extrabold text-2xl tracking-tighter px-4 py-2 rounded-xl shadow-md">
                    Booking<span className="text-[#00b2e3]">.com</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-[#003580] px-3 py-1.5 rounded-full text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>{t('trustedPartner')}</span>
                  </div>
                </div>

                <div className="text-xs text-blue-700 font-bold mb-1">
                  {language === 'ar' ? 'المنصة العالمية الأولى' : 'Global Platform'}
                </div>
                <h3 className="font-['Amiri',serif] text-2xl font-bold text-[#1f2937] mb-2">
                  {language === 'ar' ? 'دار ورد على Booking.com' : 'Dar Ward on Booking.com'}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 mb-5 leading-relaxed">
                  {language === 'ar'
                    ? 'استمتع بمزايا برنامج الولاء (Genius)، خيارات الإلغاء المرن، وتأكيد الحجز الفوري مع تقييمات استثنائية من زوار المسجد النبوي.'
                    : 'Enjoy Genius loyalty perks, flexible cancellation options, and instant confirmation backed by stellar guest reviews in Madinah.'}
                </p>

                {/* Rating Box */}
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-50/80 border border-blue-100 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-[#003580] text-white flex items-center justify-center font-bold text-lg shadow">
                    9.6
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#003580]">
                      {language === 'ar' ? 'تقييم استثنائي وموصى به جداً' : 'Exceptional & Highly Rated'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {language === 'ar'
                        ? 'بناءً على تقييمات الضيوف الموثقة'
                        : 'Based on verified guest reviews'}
                    </div>
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-gray-600 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>
                      {language === 'ar'
                        ? 'تأكيد حجز فوري مع ضمان الغرفة'
                        : 'Instant confirmation & guaranteed suite'}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>
                      {language === 'ar'
                        ? 'نقاط مكافآت وحسومات Genius'
                        : 'Genius points & tier discounts'}
                    </span>
                  </li>
                </ul>
              </div>

              <a
                href={settings.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-[#003580] hover:bg-[#00224f] text-white font-bold text-sm text-center transition-all shadow-md flex items-center justify-center gap-2 group/btn"
              >
                <span>{t('goToBookingCom')}</span>
                <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-[-2px] transition-transform" />
              </a>
            </div>

            {/* Card 2: Airbnb */}
            <div className="w-[88vw] sm:w-[380px] md:w-[410px] lg:w-[430px] flex-shrink-0 snap-start bg-white rounded-3xl p-7 shadow-xl border-2 border-[#FF385C]/20 hover:border-[#FF385C] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="bg-[#FF385C] text-white font-extrabold text-2xl tracking-tighter px-4 py-2 rounded-xl shadow-md flex items-center gap-1.5">
                    <span>airbnb</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-rose-50 border border-rose-200 text-[#FF385C] px-3 py-1.5 rounded-full text-xs font-bold">
                    <Award className="w-4 h-4 text-[#FF385C]" />
                    <span>{t('superhostBadge')}</span>
                  </div>
                </div>

                <div className="text-xs text-[#FF385C] font-bold mb-1">
                  {language === 'ar' ? 'تجربة سكن متكاملة' : 'Homelike Experience'}
                </div>
                <h3 className="font-['Amiri',serif] text-2xl font-bold text-[#1f2937] mb-2">
                  {language === 'ar' ? 'دار ورد على Airbnb' : 'Dar Ward on Airbnb'}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 mb-5 leading-relaxed">
                  {language === 'ar'
                    ? 'تجربة سكنية تمنحك راحة المنزل بمعايير الفنادق الراقية، تقييم 5 نجوم في النظافة، وسرعة التواصل والدخول الذكي المستقل.'
                    : 'A warm residential sanctuary with boutique hotel touches, 5-star cleanliness ratings, and self-check-in keypad access.'}
                </p>

                {/* Rating Box */}
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-rose-50/80 border border-rose-100 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-[#FF385C] text-white flex items-center justify-center font-bold text-lg shadow">
                    4.95
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#FF385C] flex items-center gap-1">
                      <span>{language === 'ar' ? 'تقييم ضيوف مثالي' : 'Flawless Rating'}</span>
                      <div className="flex text-amber-400">
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {language === 'ar'
                        ? 'موصى به من قبل العائلات والزوار'
                        : 'Recommended by visiting families'}
                    </div>
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-gray-600 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>
                      {language === 'ar'
                        ? 'دخول ذاتي ذكي بأقفال إلكترونية مشفرة'
                        : 'Keyless self check-in via electronic smart lock'}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>
                      {language === 'ar'
                        ? 'تجهيزات فندقية ومطابخ مجهزة للإقامات الممتدة'
                        : 'Equipped kitchens ready for extended stays'}
                    </span>
                  </li>
                </ul>
              </div>

              <a
                href={settings.airbnbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-[#FF385C] hover:bg-[#d92244] text-white font-bold text-sm text-center transition-all shadow-md flex items-center justify-center gap-2 group/btn"
              >
                <span>{t('goToAirbnb')}</span>
                <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-[-2px] transition-transform" />
              </a>
            </div>

            {/* Card 3: Direct WhatsApp (Best Price Guarantee) */}
            <div className="w-[88vw] sm:w-[380px] md:w-[410px] lg:w-[430px] flex-shrink-0 snap-start bg-gradient-to-br from-[#1b4332] via-[#2d6a4f] to-[#081c15] text-white rounded-3xl p-7 shadow-xl border-2 border-emerald-400/40 hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="bg-emerald-500 text-white font-bold text-sm px-3.5 py-1.5 rounded-xl shadow flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-300" />
                    <span>{t('bestPriceBadge')}</span>
                  </div>
                  <div className="bg-white/15 backdrop-blur-sm text-emerald-200 px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-400/30">
                    {t('noCommissionBadge')}
                  </div>
                </div>

                <div className="text-xs text-emerald-300 font-bold mb-1">
                  {language === 'ar' ? 'حجز مباشر وفوري' : 'Direct & Instant Booking'}
                </div>
                <h3 className="font-['Amiri',serif] text-2xl font-bold text-white mb-2">
                  {language === 'ar' ? 'واتساب الحجوزات المباشرة' : 'Direct WhatsApp Reservations'}
                </h3>

                <p className="text-xs sm:text-sm text-emerald-100 mb-5 leading-relaxed">
                  {language === 'ar'
                    ? 'تواصل مباشرة مع إدارة دار ورد لتحصل على خصم فوري يوازي عمولة المنصات، بالإضافة لخيارات مرنة في الدفع والتعديل.'
                    : 'Connect directly with Dar Ward management to secure direct rates without portal fees, plus flexible booking alterations.'}
                </p>

                {/* Offer Box */}
                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-emerald-400/30 mb-5">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-sm mb-1">
                    <Sparkles className="w-4 h-4" />
                    <span>
                      {language === 'ar'
                        ? 'خصومات خاصة للإقامات الأسبوعية والشهرية'
                        : 'Exclusive discounts for weekly & monthly stays'}
                    </span>
                  </div>
                  <div className="text-xs text-emerald-200" dir="ltr">
                    WhatsApp: {settings.whatsapp1.number}
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-emerald-100 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 flex-shrink-0" />
                    <span>
                      {language === 'ar'
                        ? 'توفير حتى 15% مقارنة بالمنصات الوسيطة'
                        : 'Save up to 15% compared to online travel agencies'}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 flex-shrink-0" />
                    <span>
                      {language === 'ar'
                        ? 'تنسيق مواعيد الوصول والمغادرة بمرونة تامة'
                        : 'Seamless check-in and check-out arrangements'}
                    </span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() =>
                  openWhatsApp(
                    settings.whatsapp1.number,
                    language === 'ar'
                      ? 'السلام عليكم ورحمة الله، أود الاستفسار والحجز المباشر في دار ورد للضيافة بالمدينة المنورة.'
                      : 'Hello, I would like to make a direct reservation at Dar Ward Hospitality in Madinah.'
                  )
                }
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-sm text-center transition-all shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2 group/btn"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t('bookWhatsAppBestPrice')}</span>
              </button>
            </div>

            {/* Card 4: Support & Reception */}
            <div className="w-[88vw] sm:w-[380px] md:w-[410px] lg:w-[430px] flex-shrink-0 snap-start bg-white rounded-3xl p-7 shadow-xl border-2 border-rose-100 hover:border-[#9f1239] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="bg-[#9f1239] text-white font-bold text-sm px-3.5 py-1.5 rounded-xl shadow flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4" />
                    <span>{language === 'ar' ? 'خدمة الضيوف 24/7' : '24/7 Guest Care'}</span>
                  </div>
                  <div className="bg-rose-50 text-[#881337] px-3 py-1.5 rounded-full text-xs font-bold border border-rose-200">
                    {t('alwaysAvailableBadge')}
                  </div>
                </div>

                <div className="text-xs text-[#9f1239] font-bold mb-1">
                  {language === 'ar' ? 'الإدارة والمساعدة' : 'Management & Support'}
                </div>
                <h3 className="font-['Amiri',serif] text-2xl font-bold text-[#1f2937] mb-2">
                  {language === 'ar' ? 'خدمة الاستقبال والنزلاء' : 'Guest Reception & Assistance'}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 mb-5 leading-relaxed">
                  {language === 'ar'
                    ? 'خط مخصص لخدمة الضيوف المقيمين، الإجابة عن أي استفسارات، وإرشادكم لأقرب الطرق إلى المسجد النبوي والخدمات المحيطة.'
                    : 'A dedicated channel for resident guests, questions, and guidance to the Prophet’s Mosque and nearby amenities.'}
                </p>

                <div className="p-3.5 rounded-2xl bg-[#faf7f4] border border-rose-100 mb-5 text-center">
                  <span className="text-xs text-gray-500 block mb-1">
                    {language === 'ar' ? 'الخط المباشر للإدارة' : 'Direct Management Line'}
                  </span>
                  <span className="font-mono text-lg font-bold text-[#881337] tracking-wider" dir="ltr">
                    {settings.whatsapp2.number}
                  </span>
                </div>

                <ul className="space-y-2 text-xs text-gray-600 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>
                      {language === 'ar'
                        ? 'مساعدة فورية في الدخول الذكي للوحدات'
                        : 'Immediate help with smart lock access'}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>
                      {language === 'ar'
                        ? 'تلبية كافة احتياجات النزيل أثناء الإقامة'
                        : 'Attentive support throughout your entire stay'}
                    </span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() =>
                  openWhatsApp(
                    settings.whatsapp2.number,
                    language === 'ar'
                      ? 'السلام عليكم ورحمة الله، لدي استفسار بخصوص الإقامة في دار ورد.'
                      : 'Hello, I have an inquiry regarding my stay at Dar Ward.'
                  )
                }
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#9f1239] to-[#be123c] hover:from-[#881337] hover:to-[#9f1239] text-white font-bold text-sm text-center transition-all shadow-md flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t('chatWithReception')}</span>
              </button>
            </div>
          </div>

          {/* Indicator Dots */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {[0, 1, 2, 3].map((idx) => (
              <button
                key={idx}
                onClick={() => scrollToIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentBookingIndex ? 'w-6 bg-[#9f1239]' : 'w-2 bg-rose-200 hover:bg-rose-300'
                }`}
                aria-label={`Option ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
