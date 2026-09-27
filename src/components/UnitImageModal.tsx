import React, { useState, useEffect, useCallback } from 'react';
import { Unit } from '../types';
import { useHospitality } from '../context/HospitalityContext';
import { RoseIcon } from './RoseDecorations';
import {
  X,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Eye,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

interface UnitImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  unit: Unit | null;
  initialImageIndex?: number;
  onOpenUnitDetails?: (unitId: string) => void;
}

export const UnitImageModal: React.FC<UnitImageModalProps> = ({
  isOpen,
  onClose,
  unit,
  initialImageIndex = 0,
  onOpenUnitDetails,
}) => {
  const { language, t, settings } = useHospitality();
  const [currentIndex, setCurrentIndex] = useState(initialImageIndex);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialImageIndex);
      // Lock body scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialImageIndex]);

  const images = unit?.images && unit.images.length > 0 ? unit.images : unit ? [unit.featuredImage] : [];

  const handleNext = useCallback(() => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        if (language === 'ar') handlePrev();
        else handleNext();
      } else if (e.key === 'ArrowLeft') {
        if (language === 'ar') handleNext();
        else handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose, language]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swiped left
        if (language === 'ar') handlePrev();
        else handleNext();
      } else {
        // Swiped right
        if (language === 'ar') handleNext();
        else handlePrev();
      }
    }
    setTouchStart(null);
  };

  if (!isOpen || !unit) return null;

  const currentImage = images[currentIndex] || unit.featuredImage;

  const handleWhatsAppBooking = () => {
    const text =
      language === 'ar'
        ? `السلام عليكم ورحمة الله، رأيت الوحدة رقم "${unit.unitNumber}" فى موقعكم وأود حجزها .`
        : `Hello, I saw unit number "${unit.unitNumber}" on your website and would like to book it.`;
    const cleanNumber = settings.whatsapp1.number.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleDetailsClick = () => {
    onClose();
    if (onOpenUnitDetails) {
      onOpenUnitDetails(unit.id);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-md text-white select-none animate-in fade-in duration-200"
    >
      {/* Top Header Bar */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3 border-b border-white/10 z-10">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9f1239] text-[#fef08a] text-xs font-bold border border-[#d4af37]/50 shadow-sm flex-shrink-0">
            <RoseIcon className="w-3.5 h-3.5" />
            <span>
              {t('unitNumberPrefix')} {unit.unitNumber}
            </span>
          </div>

          <h3 className="font-['Amiri',serif] text-sm sm:text-lg font-bold text-white truncate max-w-[200px] sm:max-w-md">
            {unit.title}
          </h3>

          <span className="hidden sm:inline-block text-xs text-rose-200/80 bg-white/10 px-2.5 py-0.5 rounded-full">
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all active:scale-95 flex-shrink-0"
          title={language === 'ar' ? 'إغلاق النافذة' : 'Close window'}
        >
          <X className="w-4 h-4 text-rose-300" />
          <span>{language === 'ar' ? 'إغلاق' : 'Close'}</span>
        </button>
      </div>

      {/* Main Image Display Area with Navigation */}
      <div
        className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute rtl:right-3 sm:rtl:right-6 ltr:left-3 sm:ltr:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 flex items-center justify-center backdrop-blur-md shadow-2xl transition-all hover:scale-105 active:scale-95"
            aria-label="Previous image"
          >
            {language === 'ar' ? (
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            ) : (
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            )}
          </button>
        )}

        {/* The Current Image */}
        <div className="relative max-w-5xl max-h-[68vh] sm:max-h-[75vh] flex items-center justify-center p-1">
          <img
            key={currentImage}
            src={currentImage}
            alt={`${unit.title} - ${currentIndex + 1}`}
            className="max-w-full max-h-[65vh] sm:max-h-[72vh] object-contain rounded-2xl shadow-2xl transition-all duration-300 select-none animate-in fade-in zoom-in-95 duration-200"
            referrerPolicy="no-referrer"
          />

          {/* Mobile Photo Count Badge */}
          <div className="sm:hidden absolute bottom-3 rtl:left-3 ltr:right-3 bg-black/70 backdrop-blur-sm text-white text-[11px] px-2.5 py-1 rounded-full border border-white/10">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute rtl:left-3 sm:rtl:left-6 ltr:right-3 sm:ltr:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 flex items-center justify-center backdrop-blur-md shadow-2xl transition-all hover:scale-105 active:scale-95"
            aria-label="Next image"
          >
            {language === 'ar' ? (
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            ) : (
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            )}
          </button>
        )}
      </div>

      {/* Bottom Bar: Thumbnails & Quick Actions */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-3 border-t border-white/10 bg-black/60 backdrop-blur-md z-10 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Thumbnails Row */}
        {images.length > 1 ? (
          <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1 scrollbar-none">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative flex-shrink-0 w-12 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden border-2 transition-all ${
                  currentIndex === idx
                    ? 'border-[#fde047] ring-2 ring-[#9f1239] scale-105 opacity-100'
                    : 'border-white/20 opacity-50 hover:opacity-90'
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
        ) : (
          <div className="text-xs text-stone-400">
            {unit.title}
          </div>
        )}

        {/* Action Buttons: WhatsApp Booking & View Details */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          {onOpenUnitDetails && (
            <button
              onClick={handleDetailsClick}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Eye className="w-4 h-4 text-[#fde047]" />
              <span>{t('unitDetailsBtn')}</span>
            </button>
          )}

          <button
            onClick={handleWhatsAppBooking}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 border border-emerald-400/40"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{language === 'ar' ? 'حجز عبر واتساب' : 'Book on WhatsApp'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
