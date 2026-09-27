import React from 'react';
import { useHospitality } from '../context/HospitalityContext';
import { RoseIcon, CornerRoseOrnament } from './RoseDecorations';
import { Sparkles, MapPin, ShieldCheck, Wifi, Award } from 'lucide-react';

export const HeroCover: React.FC = () => {
  const { settings, t, language } = useHospitality();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Cover Image with Luxury Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={settings.coverImageUrl}
          alt="Dar Ward Hospitality"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Multi-layered cinematic gradient: Dark crimson burgundy & warm vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1f030a] via-[#380614]/85 to-[#24030d]/65" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,2,5,0.7)_100%)]" />
      </div>

      {/* Decorative Rose Ornaments in Corners */}
      <CornerRoseOrnament position="top-right" />
      <CornerRoseOrnament position="top-left" />

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white">
        {/* Luxury Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#9f1239]/80 via-[#be123c]/80 to-[#9f1239]/80 border border-[#d4af37]/60 shadow-lg backdrop-blur-md mb-6 animate-fade-in">
          <RoseIcon className="w-4 h-4 text-[#fde047]" />
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#fef08a]">
            {t('heroBadge')}
          </span>
          <RoseIcon className="w-4 h-4 text-[#fde047]" />
        </div>

        {/* Main Title with Calligraphic Elegance */}
        <div className="mb-2">
          <span className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#fde047] font-sans">
            Dar Ward Hospitality
          </span>
        </div>
        <h1 className="font-['Amiri',serif] text-4xl sm:text-6xl md:text-7xl font-bold leading-tight tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#fff1f2] to-[#fed7aa] drop-shadow-lg mb-4">
          {language === 'ar' ? 'دار ورد للضيافة' : 'Dar Ward Hospitality'}
        </h1>

        <div className="flex items-center justify-center gap-3 text-lg sm:text-2xl text-[#fecdd3] font-light mb-6">
          <span className="text-[#d4af37]">✦</span>
          <span>{t('heroTagline')}</span>
          <span className="text-[#d4af37]">✦</span>
        </div>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-rose-100/90 leading-relaxed font-normal mb-8">
          {t('heroDescription')}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button
            onClick={() => scrollTo('units')}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#9f1239] via-[#be123c] to-[#e11d48] text-white font-bold text-base shadow-xl shadow-[#9f1239]/40 hover:shadow-2xl hover:scale-105 transition-all border border-[#d4af37]/50 flex items-center gap-2.5 active:scale-95"
          >
            <Sparkles className="w-5 h-5 text-[#fde047]" />
            <span>{t('exploreUnitsBtn')}</span>
          </button>

          <button
            onClick={() => scrollTo('location')}
            className="px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base backdrop-blur-md border border-white/30 hover:border-white/60 transition-all flex items-center gap-2.5 active:scale-95"
          >
            <MapPin className="w-4 h-4 text-[#fde047]" />
            <span>{t('locationBtn')}</span>
          </button>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto pt-6 border-t border-rose-200/20">
          <div className="p-3 rounded-xl bg-black/30 backdrop-blur-sm border border-rose-200/10 flex items-center gap-3 rtl:text-right ltr:text-left">
            <div className="p-2 rounded-lg bg-[#9f1239]/50 text-[#fde047]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-rose-200 font-light">{t('highlightLocation')}</div>
              <div className="text-xs sm:text-sm font-bold text-white">{t('highlightLocationSub')}</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-black/30 backdrop-blur-sm border border-rose-200/10 flex items-center gap-3 rtl:text-right ltr:text-left">
            <div className="p-2 rounded-lg bg-[#9f1239]/50 text-[#fde047]">
              <Wifi className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-rose-200 font-light">{t('highlightWifi')}</div>
              <div className="text-xs sm:text-sm font-bold text-white">{t('highlightWifiSub')}</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-black/30 backdrop-blur-sm border border-rose-200/10 flex items-center gap-3 rtl:text-right ltr:text-left">
            <div className="p-2 rounded-lg bg-[#9f1239]/50 text-[#fde047]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-rose-200 font-light">{t('highlightService')}</div>
              <div className="text-xs sm:text-sm font-bold text-white">{t('highlightServiceSub')}</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-black/30 backdrop-blur-sm border border-rose-200/10 flex items-center gap-3 rtl:text-right ltr:text-left">
            <div className="p-2 rounded-lg bg-[#9f1239]/50 text-[#fde047]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-rose-200 font-light">{t('highlightPrivacy')}</div>
              <div className="text-xs sm:text-sm font-bold text-white">{t('highlightPrivacySub')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Wave Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#faf7f4] to-transparent z-10" />
    </section>
  );
};
