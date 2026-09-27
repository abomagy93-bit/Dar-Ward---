import React, { useState } from 'react';
import { useHospitality } from '../context/HospitalityContext';
import { Unit } from '../types';
import { RoseIcon, CornerRoseOrnament } from './RoseDecorations';
import { UnitImageModal } from './UnitImageModal';
import { TikTokPlayer } from './TikTokPlayer';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  Bed,
  Bath,
  Users,
  Building,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  X,
  Share2,
  Sparkles,
  Check,
  Copy,
  Play,
} from 'lucide-react';

const UnitDetailContent: React.FC<{ unit: Unit; onBack: () => void }> = ({ unit, onBack }) => {
  const { settings, setIsAdminOpen, units, setActiveUnitId, language, t, openVideoModal } = useHospitality();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guestCount, setGuestCount] = useState((unit.capacityGuests || 2).toString());
  const [notes, setNotes] = useState('');

  const currentIdx = units.findIndex((u) => u.id === unit.id);
  const prevUnit = currentIdx > 0 ? units[currentIdx - 1] : null;
  const nextUnit = currentIdx < units.length - 1 ? units[currentIdx + 1] : null;

  const switchToUnit = (targetUnitId: string) => {
    setActiveUnitId(targetUnitId);
    window.location.hash = `#${targetUnitId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % unit.images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + unit.images.length) % unit.images.length);
  };

  // User requested exact prompt: رأيت الوحدة رقم "" فى موقعكم وأود حجزها .
  const directWhatsAppMessage =
    language === 'ar'
      ? `السلام عليكم، رأيت الوحدة رقم "${unit.unitNumber}" فى موقعكم وأود حجزها .`
      : `Hello, I saw unit number "${unit.unitNumber}" on your website and would like to book it.`;

  const handleDirectWhatsAppClick = () => {
    const cleanNumber = settings.whatsapp1.number.replace(/[^0-9]/g, '');
    window.open(
      `https://wa.me/${cleanNumber}?text=${encodeURIComponent(directWhatsAppMessage)}`,
      '_blank'
    );
  };

  const handleFormWhatsAppBooking = () => {
    let text = directWhatsAppMessage + `\n\n`;
    if (language === 'ar') {
      text += `تفاصيل إضافية للطلب:\n`;
      text += `- اسم الضيف: ${guestName || 'غير محدد'}\n`;
      if (checkInDate) text += `- تاريخ الدخول: ${checkInDate}\n`;
      if (checkOutDate) text += `- تاريخ المغادرة: ${checkOutDate}\n`;
      if (guestCount) text += `- عدد الضيوف: ${guestCount}\n`;
      if (notes) text += `- ملاحظات: ${notes}\n`;
    } else {
      text += `Additional Booking Details:\n`;
      text += `- Guest Name: ${guestName || 'Not specified'}\n`;
      if (checkInDate) text += `- Check-in: ${checkInDate}\n`;
      if (checkOutDate) text += `- Check-out: ${checkOutDate}\n`;
      if (guestCount) text += `- Guests Count: ${guestCount}\n`;
      if (notes) text += `- Special Requests: ${notes}\n`;
    }

    const cleanNumber = settings.whatsapp1.number.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShare = () => {
    const shareData = {
      title: `${unit.title} - دار ورد للضيافة`,
      text: `${unit.subtitle || unit.description.slice(0, 100)}...`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      navigator
        .share(shareData)
        .catch(() => {});
    } else {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
      }
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f4] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Breadcrumb & Back Button */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-rose-100">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-rose-50 text-[#881337] border border-rose-200 font-bold text-sm shadow-sm transition-all group"
          >
            {language === 'ar' ? (
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            ) : (
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            )}
            <span>{t('backToAllUnits')}</span>
          </button>

          {/* Share Button in Top Bar */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-rose-50 text-[#881337] border border-rose-200 shadow-sm font-bold text-xs sm:text-sm transition-all active:scale-95"
              title={t('shareUnit')}
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">{language === 'ar' ? 'تم نسخ الرابط!' : 'Link Copied!'}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-[#9f1239]" />
                  <span>{language === 'ar' ? 'مشاركة الوحدة' : 'Share Unit'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Top Horizontal Unit Switcher Bar (NO status dots) */}
        <div className="bg-white rounded-2xl p-3 shadow-md border border-rose-100 mb-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center justify-between w-full sm:w-auto gap-2">
            <button
              onClick={() => prevUnit && switchToUnit(prevUnit.id)}
              disabled={!prevUnit}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                !prevUnit
                  ? 'opacity-40 cursor-not-allowed bg-gray-50 text-gray-400'
                  : 'bg-white hover:bg-rose-50 text-[#881337] border border-rose-200 shadow-sm active:scale-95'
              }`}
              title={prevUnit ? `${t('unitNumberPrefix')} ${prevUnit.unitNumber}` : ''}
            >
              {language === 'ar' ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              <span>{t('prevUnit')}</span>
              {prevUnit && <span className="font-mono">({prevUnit.unitNumber})</span>}
            </button>

            <span className="text-xs text-gray-400 font-normal sm:hidden">
              {t('unitNumberPrefix')} {unit.unitNumber} ({currentIdx + 1}/{units.length})
            </span>

            <button
              onClick={() => nextUnit && switchToUnit(nextUnit.id)}
              disabled={!nextUnit}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all sm:hidden ${
                !nextUnit
                  ? 'opacity-40 cursor-not-allowed bg-gray-50 text-gray-400'
                  : 'bg-[#9f1239] hover:bg-[#881337] text-white shadow-sm active:scale-95'
              }`}
              title={nextUnit ? `${t('unitNumberPrefix')} ${nextUnit.unitNumber}` : ''}
            >
              {nextUnit && <span className="font-mono">({nextUnit.unitNumber})</span>}
              <span>{t('nextUnit')}</span>
              {language === 'ar' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>

          {/* Horizontal Units Track (Clean without availability indicators) */}
          <div
            className="hidden sm:flex items-center gap-1.5 overflow-x-auto py-1 px-2 max-w-xl"
            style={{ scrollbarWidth: 'none' }}
          >
            {units.map((u) => {
              const isCurrent = u.id === unit.id;
              return (
                <button
                  key={u.id}
                  onClick={() => switchToUnit(u.id)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isCurrent
                      ? 'bg-[#881337] text-white shadow-sm ring-2 ring-rose-300'
                      : 'bg-[#faf7f4] hover:bg-rose-50 text-gray-700 border border-rose-100'
                  }`}
                >
                  <span>
                    {language === 'ar' ? 'الوحدة' : 'Unit'} {u.unitNumber}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => nextUnit && switchToUnit(nextUnit.id)}
            disabled={!nextUnit}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              !nextUnit
                ? 'opacity-40 cursor-not-allowed bg-gray-50 text-gray-400'
                : 'bg-[#9f1239] hover:bg-[#881337] text-white shadow-sm active:scale-95'
            }`}
            title={nextUnit ? `${t('unitNumberPrefix')} ${nextUnit.unitNumber}` : ''}
          >
            {nextUnit && <span className="font-mono">({nextUnit.unitNumber})</span>}
            <span>{t('nextUnit')}</span>
            {language === 'ar' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Unit Header Title */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-100/90 mb-8 relative overflow-hidden">
          <CornerRoseOrnament position="top-right" />

          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* Category Badge */}
              <span className="px-3.5 py-1 rounded-full bg-rose-100 text-[#881337] font-bold text-xs">
                {unit.category === 'one-bedroom' && t('catOne')}
                {unit.category === 'two-bedrooms' && t('catTwo')}
                {unit.category === 'three-bedrooms' && t('catThree')}
                {unit.category === 'villa' && t('catVilla')}
              </span>

              {/* Unit Number Badge */}
              <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-[#9f1239] to-[#be123c] text-white font-bold text-xs shadow-sm border border-[#d4af37]/40 flex items-center gap-1">
                <RoseIcon className="w-3.5 h-3.5 text-[#fde047]" />
                {t('unitNumberPrefix')} {unit.unitNumber}
              </span>

              {unit.floor && (
                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {unit.floor}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Watch Video Button - Opens TikTok in Browser */}
              {unit.tiktokVideoUrl && (
                <a
                  href={unit.tiktokVideoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#9f1239] to-[#be123c] hover:from-[#881337] hover:to-[#9f1239] text-white text-xs font-bold transition-all active:scale-95 shadow-sm border border-[#d4af37]/40"
                  title="مشاهدة فيديو الوحدة على تيك توك"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>{language === 'ar' ? 'فيديو الوحدة' : 'Unit Video'}</span>
                  <ExternalLink className="w-3 h-3 text-rose-200" />
                </a>
              )}

              {/* Prominent Share Button in Header */}
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-[#881337] border border-rose-200 text-xs font-bold transition-all active:scale-95 shadow-sm"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">{language === 'ar' ? 'تم نسخ الرابط' : 'Link Copied'}</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-[#9f1239]" />
                    <span>{language === 'ar' ? 'مشاركة الوحدة' : 'Share'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <h1 className="font-['Amiri',serif] text-2xl sm:text-4xl font-bold text-[#881337] mb-6 leading-tight">
            {unit.title}
          </h1>

          {/* Key Specs Bar (NO AREA as requested: Guests, Bedrooms, Bathrooms, Floor/View) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#fdfbf7] rounded-2xl border border-rose-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#881337] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-gray-500">
                  {language === 'ar' ? 'سعة الضيوف' : 'Guests'}
                </div>
                <div className="text-sm font-bold text-[#2c1810]">
                  {language === 'ar'
                    ? `حتى ${unit.capacityGuests} أشخاص`
                    : `Up to ${unit.capacityGuests} Guests`}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#881337] flex items-center justify-center">
                <Bed className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-gray-500">{t('bedroomsCount')}</div>
                <div className="text-sm font-bold text-[#2c1810]">
                  {unit.bedroomsCount} {t('bedroomsCount')}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#881337] flex items-center justify-center">
                <Bath className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-gray-500">{t('bathroomsCount')}</div>
                <div className="text-sm font-bold text-[#2c1810]">
                  {unit.bathroomsCount} {t('bathroomsCount')}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#881337] flex items-center justify-center">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-gray-500">
                  {language === 'ar' ? 'الطابق والموقع' : 'Floor & Location'}
                </div>
                <div className="text-sm font-bold text-[#2c1810]">
                  {unit.floor || (language === 'ar' ? 'أدوار متعددة' : 'Available Floors')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Gallery Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-100/90 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-['Amiri',serif] text-xl sm:text-2xl font-bold text-[#881337] flex items-center gap-2">
              <RoseIcon className="w-5 h-5 text-[#be123c]" />
              <span>
                {t('unitGalleryTitle')} ({unit.images.length} {t('photosCount')})
              </span>
            </h2>
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="text-xs text-[#9f1239] hover:underline font-bold bg-rose-50 px-3 py-1.5 rounded-lg"
            >
              {t('fullscreenGallery')}
            </button>
          </div>

          {/* Main Display Image */}
          <div
            onClick={() => setIsLightboxOpen(true)}
            className="relative h-[320px] sm:h-[460px] rounded-2xl overflow-hidden bg-gray-900 shadow-md group cursor-pointer"
            title={language === 'ar' ? 'اضغط لتكبير الصورة في نافذة' : 'Click to preview photo in window'}
          >
            <img
              src={unit.images[selectedImageIndex] || unit.featuredImage}
              alt={`${unit.title} - ${selectedImageIndex + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
              referrerPolicy="no-referrer"
            />

            {/* Navigation Arrows */}
            {unit.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute rtl:right-4 ltr:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-lg"
                  aria-label="Previous image"
                >
                  {language === 'ar' ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
                </button>
                <button
                  onClick={nextImage}
                  className="absolute rtl:left-4 ltr:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-lg"
                  aria-label="Next image"
                >
                  {language === 'ar' ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
                </button>
              </>
            )}

            {/* Counter Pill */}
            <div className="absolute bottom-4 rtl:left-4 ltr:right-4 bg-black/70 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full">
              {language === 'ar'
                ? `الصورة ${selectedImageIndex + 1} من ${unit.images.length}`
                : `Photo ${selectedImageIndex + 1} of ${unit.images.length}`}
            </div>
          </div>

          {/* Thumbnails Carousel */}
          {unit.images.length > 1 && (
            <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-2 scrollbar-thin">
              {unit.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative flex-shrink-0 w-24 h-18 sm:w-28 sm:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImageIndex === idx
                      ? 'border-[#9f1239] shadow-md scale-105 ring-2 ring-rose-300'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Layout: 2 Columns (Description & Amenities vs Booking Box) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left / Main Column: Description & Amenities */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-100/90">
              <h2 className="font-['Amiri',serif] text-2xl font-bold text-[#881337] mb-4 flex items-center gap-2">
                <RoseIcon className="w-5 h-5 text-[#be123c]" />
                <span>{t('unitDescriptionTitle')}</span>
              </h2>

              <p className="text-base text-[#4a3728] leading-relaxed whitespace-pre-line font-normal">
                {unit.description}
              </p>
            </div>

            {/* TikTok Video Section if available */}
            {unit.tiktokVideoUrl && (
              <TikTokPlayer
                videoUrl={unit.tiktokVideoUrl}
                unitTitle={unit.title}
              />
            )}
          </div>

          {/* Right Column: Direct Reservation Box (NO PRICE as requested) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-rose-200/90 sticky top-28">
              {/* Header (No Price, No Availability) */}
              <div className="pb-4 border-b border-rose-100 mb-6">
                <span className="font-['Amiri',serif] text-xl font-bold text-[#881337] block">
                  {t('unitNumberPrefix')} {unit.unitNumber}
                </span>
                <span className="text-xs text-gray-500">
                  {language === 'ar' ? 'حجز مباشر ومضمون' : 'Direct & Guaranteed Booking'}
                </span>
              </div>

              {/* Quick WhatsApp Form */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {t('guestNameLabel')}
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder={t('guestNamePlaceholder')}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#9f1239] outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {t('checkInLabel')}
                    </label>
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl border border-gray-200 text-xs focus:border-[#9f1239] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {t('checkOutLabel')}
                    </label>
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl border border-gray-200 text-xs focus:border-[#9f1239] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {t('guestsSelectLabel')}
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#9f1239] outline-none bg-white"
                  >
                    {[...Array(unit.capacityGuests + 2)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {t('guestsCount')}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {t('notesLabel')}
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={t('notesPlaceholder')}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:border-[#9f1239] outline-none resize-none"
                  />
                </div>
              </div>

              {/* Main Reserve WhatsApp Button */}
              <button
                onClick={handleFormWhatsAppBooking}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-700/30 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 mb-4"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>{t('reserveViaWhatsApp')}</span>
              </button>

              <div className="text-center text-xs text-gray-500 mb-6">
                {t('whatsAppRedirectHint')}
              </div>

              {/* Alternative Booking Platforms (Booking.com & Airbnb) */}
              <div className="pt-4 border-t border-rose-100">
                <span className="block text-xs text-gray-500 font-bold mb-3 text-center">
                  {t('orBookViaPlatforms')}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={unit.bookingUrl || settings.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#003580] hover:bg-[#00224f] text-white text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Booking.com</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={unit.airbnbUrl || settings.airbnbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#FF385C] hover:bg-[#d92244] text-white text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Airbnb</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION SECTION (Explicit User Request:
            "مع صفحة لغرفة ب الاسفل إمكانية الانتقال مباشرة إلى صفحة بوكينج أو تواصل واتسب مع كتابة مقدمة رأيت الوحدة رقم "" فى موقعكم وأود حجزها .") */}
        <div className="mb-12 bg-gradient-to-br from-[#881337] via-[#9f1239] to-[#4c0519] rounded-3xl p-6 sm:p-8 text-white shadow-2xl border-2 border-[#d4af37]/40 relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 text-[#fde047] text-xs font-bold border border-white/30 mb-2">
                {language === 'ar' ? 'حجز فوري ومباشر' : 'Direct & Instant Reservation'}
              </span>
              <h3 className="font-['Amiri',serif] text-2xl sm:text-3xl font-bold mb-2">
                {t('unitBottomActionsTitle')} — {t('unitNumberPrefix')} {unit.unitNumber}
              </h3>
              <p className="text-xs sm:text-sm text-rose-100">
                {language === 'ar'
                  ? `يمكنك الآن الانتقال مباشرة إلى صفحة بوكينج، أو التواصل الفوري عبر واتساب بالرسالة الجاهزة لتأكيد التوفر والحجز.`
                  : `You can now proceed directly to Booking.com, or connect instantly on WhatsApp with the ready message to secure your reservation.`}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {/* 1. Direct WhatsApp with Exact Prefilled Text:
                     رأيت الوحدة رقم "" فى موقعكم وأود حجزها . */}
              <button
                onClick={handleDirectWhatsAppClick}
                className="py-4 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm sm:text-base shadow-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-95 border border-emerald-300/40"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <div className="text-start">
                  <div className="font-bold leading-tight">
                    {language === 'ar' ? 'تواصل واتساب للحجز' : 'WhatsApp Instant Booking'}
                  </div>
                  <div className="text-[11px] text-emerald-100 font-normal">
                    {language === 'ar'
                      ? `«رأيت الوحدة رقم "${unit.unitNumber}" فى موقعكم وأود حجزها»`
                      : `"I saw unit ${unit.unitNumber} on your website and would like to book it"`}
                  </div>
                </div>
              </button>

              {/* 2. Direct Booking.com Link */}
              <a
                href={unit.bookingUrl || settings.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-4 px-5 rounded-2xl bg-[#003580] hover:bg-[#002860] text-white font-bold text-sm sm:text-base shadow-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-95 border border-blue-400/40"
              >
                <div className="text-start">
                  <div className="font-bold leading-tight">
                    {language === 'ar' ? 'الانتقال لصفحة بوكينج' : 'Go to Booking.com'}
                  </div>
                  <div className="text-[11px] text-blue-200 font-normal">Booking.com</div>
                </div>
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Back to all units button */}
        <div className="text-center pb-8 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#881337] text-white font-bold text-sm shadow-xl hover:bg-[#9f1239] active:scale-95 transition-all"
          >
            {language === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{t('backToAllUnitsLarge')}</span>
          </button>
        </div>
      </div>

      {/* Fullscreen Unit Image Modal Window */}
      <UnitImageModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        unit={unit}
        initialImageIndex={selectedImageIndex}
      />
    </div>
  );
};

export const UnitDetailPage: React.FC<{ unit?: Unit; onBack?: () => void }> = ({
  unit: propUnit,
  onBack: propOnBack,
}) => {
  const { activeUnitId, setActiveUnitId, getUnitById } = useHospitality();

  const unit = propUnit || (activeUnitId ? getUnitById(activeUnitId) : undefined);
  const onBack =
    propOnBack ||
    (() => {
      setActiveUnitId(null);
      window.location.hash = '';
      const unitsEl = document.getElementById('units');
      if (unitsEl) unitsEl.scrollIntoView({ behavior: 'smooth' });
    });

  if (!unit) {
    return null;
  }

  return <UnitDetailContent unit={unit} onBack={onBack} />;
};
