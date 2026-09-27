import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useHospitality } from '../context/HospitalityContext';
import { Unit, UnitCategory } from '../types';
import { RoseIcon, RoseDivider } from './RoseDecorations';
import { UnitImageModal } from './UnitImageModal';
import {
  Search,
  Users,
  Bed,
  Bath,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Eye,
  Sparkles,
  Video,
} from 'lucide-react';

export const SearchAndUnits: React.FC = () => {
  const {
    units,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    setActiveUnitId,
    settings,
    language,
    t,
  } = useHospitality();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalUnit, setModalUnit] = useState<Unit | null>(null);
  const [modalImageIdx, setModalImageIdx] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleOpenImageModal = (unit: Unit, imgIndex: number = 0) => {
    setModalUnit(unit);
    setModalImageIdx(imgIndex);
  };

  // Filter units based on category and search text, sorted ascending starting from Unit 1
  const filteredUnits = useMemo(() => {
    const list = units.filter((unit) => {
      // Category filter
      if (selectedCategory !== 'all' && unit.category !== selectedCategory) {
        return false;
      }

      // Search text (checks unit number, title, description, subtitle)
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const matchesNumber = unit.unitNumber.toString().includes(q);
        const matchesTitle = unit.title.toLowerCase().includes(q);
        const matchesDesc = unit.description.toLowerCase().includes(q);
        const matchesSub = (unit.subtitle || '').toLowerCase().includes(q);
        const matchesCat = unit.category.toLowerCase().includes(q);
        if (!matchesNumber && !matchesTitle && !matchesDesc && !matchesSub && !matchesCat) {
          return false;
        }
      }

      return true;
    });

    // Strictly sort ascending by unit number: 1, 2, 3, 4, 5, 6, 8, 9, 11, 12...
    return list.sort((a, b) => Number(a.unitNumber) - Number(b.unitNumber));
  }, [units, selectedCategory, searchQuery]);

  // Reset current index when filters change
  useEffect(() => {
    setCurrentIndex(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [selectedCategory, searchQuery]);

  const categories: { key: UnitCategory; label: string }[] = [
    { key: 'one-bedroom', label: 'غرفة' },
    { key: 'two-bedrooms', label: 'غرفتين' },
    { key: 'three-bedrooms', label: 'ثلاث غرف' },
    { key: 'villa', label: 'فيلا' },
  ];

  const handleCategoryClick = (catKey: UnitCategory) => {
    if (selectedCategory === catKey) {
      setSelectedCategory('all');
    } else {
      setSelectedCategory(catKey);
    }
  };

  const handleOpenUnitPage = (unitId: string) => {
    setActiveUnitId(unitId);
    window.location.hash = `#${unitId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppBooking = (unit: Unit) => {
    const text =
      language === 'ar'
        ? `السلام عليكم ورحمة الله، رأيت الوحدة رقم "${unit.unitNumber}" فى موقعكم وأود حجزها .`
        : `Hello, I saw unit number "${unit.unitNumber}" on your website and would like to book it.`;
    const cleanNumber = settings.whatsapp1.number.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="units" className="py-16 sm:py-20 bg-[#faf7f4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-100 text-[#9f1239] text-xs font-bold border border-rose-200 mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#e11d48]" />
            <span>{t('unitsBadge')}</span>
          </div>

          <h2 className="font-['Amiri',serif] text-3xl sm:text-5xl font-bold text-[#881337] mb-4">
            {t('unitsTitle')}
          </h2>

          <p className="text-base sm:text-lg text-[#5c4033] leading-relaxed">
            {t('unitsDescription')}
          </p>

          <RoseDivider className="my-6" />
        </div>

        {/* Search & Category Filter Controls */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl border border-rose-100/80 mb-8">
          {/* Top Search Input */}
          <div className="mb-5">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full rtl:pr-11 rtl:pl-4 ltr:pl-11 ltr:pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#9f1239] focus:ring-2 focus:ring-rose-200 transition-all text-sm outline-none text-[#2c1810]"
              />
              <Search className="w-5 h-5 text-gray-400 absolute rtl:right-3.5 ltr:left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute rtl:left-3 ltr:right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 bg-gray-100 px-2 py-0.5 rounded"
                >
                  {language === 'ar' ? 'مسح' : 'Clear'}
                </button>
              )}
            </div>
          </div>

          {/* Category Pills - ONLY 4 Categories: غرفة، غرفتين، ثلاث غرف، فيلا with nothing else beside them */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-rose-50">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => handleCategoryClick(cat.key)}
                  className={`flex items-center justify-center text-center py-3.5 px-4 rounded-xl transition-all border font-bold text-sm sm:text-base cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#881337] to-[#9f1239] text-white border-[#d4af37] shadow-lg shadow-[#9f1239]/20 scale-[1.02]'
                      : 'bg-[#fdfbf7] text-[#4a3728] border-rose-200/60 hover:border-[#9f1239] hover:bg-rose-50/50'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Units Showcase - EXCLUSIVELY HORIZONTAL SLIDER */}
        {filteredUnits.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-rose-100 p-8">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-[#9f1239] flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[#be123c]" />
            </div>
            <h3 className="font-['Amiri',serif] text-2xl font-bold text-[#881337] mb-2">
              {t('noUnitsFound')}
            </h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
              {t('noUnitsFoundSub')}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 rounded-xl bg-[#9f1239] text-white font-bold text-sm shadow-md hover:bg-[#881337] transition-all"
            >
              {t('showAllUnitsBtn')}
            </button>
          </div>
        ) : (
          <div className="relative group">
            {/* Scrollable Container with smooth snapping */}
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-thin scrollbar-thumb-rose-300 scrollbar-track-rose-50 snap-x snap-mandatory focus:outline-none"
              style={{
                scrollbarWidth: 'thin',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {filteredUnits.map((unit) => {
                const isAvail = unit.status === 'available';
                return (
                  <div
                    key={unit.id}
                    id={`unit-${unit.unitNumber}`}
                    className="flex-none w-[88vw] sm:w-[380px] md:w-[400px] lg:w-[410px] snap-center bg-white rounded-3xl overflow-hidden shadow-xl border border-rose-100/90 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Image Area with badges & full image click trigger */}
                    <div className="relative h-60 w-full overflow-hidden bg-stone-100 group/img">
                      <img
                        src={unit.featuredImage || unit.images[0]}
                        alt={unit.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105 cursor-pointer"
                        onClick={() => handleOpenImageModal(unit, 0)}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                      {/* Prominent Unit Number Badge */}
                      <div className="absolute top-3 rtl:right-3 ltr:left-3 z-10">
                        <span className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#881337] to-[#9f1239] text-white text-xs sm:text-sm font-bold shadow-lg border border-amber-300/40 flex items-center gap-1.5">
                          <RoseIcon className="w-3.5 h-3.5 text-[#fde047]" />
                          <span>
                            {language === 'ar' ? `الوحدة رقم ${unit.unitNumber}` : `Unit #${unit.unitNumber}`}
                          </span>
                        </span>
                      </div>

                      {/* Floor / View Tag */}
                      {unit.floor && (
                        <div className="absolute bottom-3 rtl:right-3 ltr:left-3 z-10">
                          <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-medium">
                            {unit.floor}
                          </span>
                        </div>
                      )}

                      {/* Gallery count indicator */}
                      <button
                        type="button"
                        onClick={() => handleOpenImageModal(unit, 0)}
                        className="absolute bottom-3 rtl:left-3 ltr:right-3 z-10 px-2.5 py-1 rounded-lg bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{unit.images.length} {language === 'ar' ? 'صور' : 'Photos'}</span>
                      </button>
                    </div>

                    {/* Unit Info Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Subtitle / Category text */}
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <div className="text-xs text-[#9f1239] font-bold">
                            {unit.category === 'one-bedroom' && t('catOne')}
                            {unit.category === 'two-bedrooms' && t('catTwo')}
                            {unit.category === 'three-bedrooms' && t('catThree')}
                            {unit.category === 'villa' && t('catVilla')}
                          </div>
                          {unit.tiktokVideoUrl && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">
                              <Video className="w-3 h-3 text-[#e11d48]" />
                              <span>{language === 'ar' ? 'فيديو تيك توك' : 'TikTok Video'}</span>
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3
                          onClick={() => handleOpenUnitPage(unit.id)}
                          className="font-['Amiri',serif] text-xl font-bold text-[#2c1810] hover:text-[#9f1239] transition-colors cursor-pointer mb-2 line-clamp-1"
                        >
                          {unit.title}
                        </h3>

                        {/* Description Preview */}
                        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                          {unit.description}
                        </p>

                        {/* Key Specs Icons */}
                        <div className="grid grid-cols-3 gap-2 py-3 border-y border-rose-50 text-stone-700 text-xs font-medium mb-4">
                          <div className="flex items-center gap-1.5 justify-center">
                            <Users className="w-4 h-4 text-[#9f1239]" />
                            <span>
                              {unit.capacityGuests} {t('guestsUnit')}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 justify-center">
                            <Bed className="w-4 h-4 text-[#9f1239]" />
                            <span>
                              {unit.bedroomsCount} {t('bedroomsUnit')}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 justify-center">
                            <Bath className="w-4 h-4 text-[#9f1239]" />
                            <span>
                              {unit.bathroomsCount} {t('bathroomsUnit')}
                            </span>
                          </div>
                        </div>

                        {/* Amenities preview tags (first 3) */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {unit.amenities.slice(0, 3).map((amenity, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] bg-rose-50/80 text-[#881337] px-2 py-0.5 rounded-md border border-rose-100/60"
                            >
                              {amenity}
                            </span>
                          ))}
                          {unit.amenities.length > 3 && (
                            <span className="text-[11px] text-gray-400 px-1 py-0.5">
                              +{unit.amenities.length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Action Buttons (NO PRICE shown, pure luxury presentation) */}
                      <div className="pt-2 border-t border-rose-50 flex flex-col gap-2">
                        {/* Open Full Unit Page Button */}
                        <button
                          type="button"
                          onClick={() => handleOpenUnitPage(unit.id)}
                          className="w-full py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition-all shadow flex items-center justify-center gap-2 group/btn"
                        >
                          <span>{t('viewUnitDetails')}</span>
                          {language === 'ar' ? (
                            <ArrowLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
                          ) : (
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          )}
                        </button>

                        {/* Quick Direct WhatsApp Reservation Button */}
                        <button
                          type="button"
                          onClick={() => handleWhatsAppBooking(unit)}
                          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#881337] to-[#9f1239] hover:from-[#9f1239] hover:to-[#be123c] text-white text-xs font-bold transition-all shadow shadow-rose-900/10 flex items-center justify-center gap-2"
                        >
                          <MessageCircle className="w-4 h-4 text-emerald-300" />
                          <span>{t('bookViaWhatsAppBtn')}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Lightbox / Image Gallery Modal */}
      {modalUnit && (
        <UnitImageModal
          unit={modalUnit}
          initialIndex={modalImageIdx}
          onClose={() => setModalUnit(null)}
        />
      )}
    </section>
  );
};
