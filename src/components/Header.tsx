import React, { useState } from 'react';
import { useHospitality } from '../context/HospitalityContext';
import { RoseIcon } from './RoseDecorations';
import { HolyQuranRadio } from './HolyQuranRadio';
import { Menu, X, MapPin, Home, Calendar, Star, Globe, Database } from 'lucide-react';

export const Header: React.FC = () => {
  const { language, toggleLanguage, t, setIsAdminOpen } = useHospitality();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full max-w-full overflow-x-clip bg-[#fdfbf7]/95 backdrop-blur-md border-b border-[#e2d5c8] shadow-sm transition-all">
      {/* Top Banner with Rose accent, Quran Radio, and Language Switcher (Guaranteed 0% overflow) */}
      <div className="w-full max-w-full overflow-x-hidden bg-gradient-to-r from-[#881337] via-[#9f1239] to-[#be123c] text-white text-xs py-1.5 px-2 sm:px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-2">
          {/* Welcome & Location note */}
          <div className="flex items-center gap-1.5 sm:gap-2 font-medium truncate min-w-0 flex-shrink">
            <span className="inline-block w-2 h-2 rounded-full bg-[#fde047] animate-pulse flex-shrink-0" />
            <span className="hidden sm:inline truncate">{t('welcomeHeader')}</span>
            <span className="sm:hidden font-bold truncate">دار ورد | Dar Ward</span>
            <span className="hidden md:inline opacity-70">|</span>
            <span className="hidden md:inline text-rose-100 font-light truncate">{t('nearHaram')}</span>
          </div>

          {/* Holy Quran Radio Player & Language Switcher & Database Access */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {/* Holy Quran Radio (No Cairo mentioned!) */}
            <HolyQuranRadio variant="banner" />

            {/* Language Switcher Button (English / العربية) */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 text-[#fef08a] transition-all font-bold text-[11px] sm:text-xs border border-white/20 active:scale-95 flex-shrink-0"
              title={language === 'ar' ? 'Switch to English' : 'التحويل إلى اللغة العربية'}
            >
              <Globe className="w-3.5 h-3.5 text-[#fde047]" />
              <span className="hidden sm:inline">{t('langToggle')}</span>
              <span className="sm:hidden">{language === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            {/* Database Entry Button */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 hover:text-white transition-all font-bold text-[11px] sm:text-xs border border-amber-300/40 active:scale-95 flex-shrink-0"
              title={language === 'ar' ? 'لوحة تحكم وتعديل قاعدة البيانات' : 'Database Control Panel'}
            >
              <Database className="w-3.5 h-3.5 text-[#fde047]" />
              <span className="hidden md:inline">{t('adminDatabaseBtn')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo with Rose Accent */}
          <div
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group select-none min-w-0"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#9f1239] to-[#881337] flex items-center justify-center text-white shadow-md shadow-[#9f1239]/20 border border-[#d4af37]/50 group-hover:scale-105 transition-transform flex-shrink-0">
              <RoseIcon className="w-6 h-6 sm:w-7 sm:h-7 text-[#fecdd3]" />
            </div>
            <div className="min-w-0">
              <div className="font-['Amiri',serif] font-bold text-xl sm:text-2xl text-[#881337] tracking-wide flex items-center gap-1 sm:gap-1.5 truncate">
                <span>{language === 'ar' ? 'دار ورد' : 'Dar Ward'}</span>
                <span className="text-[#b45309] text-base sm:text-lg font-normal">
                  {language === 'ar' ? 'للضيافة' : 'Hospitality'}
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-[#78350f] font-medium flex items-center gap-1 sm:gap-1.5 truncate">
                <span className="font-sans font-bold text-[#881337] tracking-wider text-[10px] sm:text-[11px]">
                  Dar Ward
                </span>
                <span className="text-[#d4af37]">✦</span>
                <span className="truncate">{t('madinahCity')}</span>
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-[#4a3728]">
            <button
              onClick={() => scrollToSection('hero')}
              className="hover:text-[#9f1239] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#9f1239] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              {t('navHome')}
            </button>
            <button
              onClick={() => scrollToSection('units')}
              className="hover:text-[#9f1239] transition-colors py-1 flex items-center gap-1.5"
            >
              <Home className="w-4 h-4 text-[#9f1239]" />
              <span>{t('navUnits')}</span>
            </button>
            <button
              onClick={() => scrollToSection('booking-platforms')}
              className="hover:text-[#9f1239] transition-colors py-1 flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4 text-[#9f1239]" />
              <span>{t('navPlatforms')}</span>
            </button>
            <button
              onClick={() => scrollToSection('location')}
              className="hover:text-[#9f1239] transition-colors py-1 flex items-center gap-1.5"
            >
              <MapPin className="w-4 h-4 text-[#9f1239]" />
              <span>{t('navLocation')}</span>
            </button>
            <button
              onClick={() => scrollToSection('whatsapp-contact')}
              className="hover:text-[#9f1239] transition-colors py-1 flex items-center gap-1.5"
            >
              <Home className="w-4 h-4 text-[#9f1239] hidden" />
              <span>{t('navContact')}</span>
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Toggle in main nav */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-2 rounded-xl bg-white hover:bg-rose-50 text-[#881337] border border-rose-200 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Globe className="w-4 h-4 text-[#9f1239]" />
              <span>{language === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            {/* CTA */}
            <button
              onClick={() => scrollToSection('units')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#9f1239] to-[#be123c] text-white font-bold text-sm shadow-md hover:shadow-lg hover:from-[#881337] hover:to-[#9f1239] transition-all transform active:scale-95 border border-[#d4af37]/40 flex items-center gap-2"
            >
              <Star className="w-4 h-4 text-[#fde047] fill-current" />
              <span>{t('bookYourStay')}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-lg bg-rose-50 text-[#881337] border border-rose-200 text-xs font-bold flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'EN' : 'عربي'}</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#881337] hover:bg-rose-50 border border-rose-200 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fdfbf7] border-b border-rose-200 px-4 py-4 space-y-3 shadow-xl">
          <button
            onClick={() => scrollToSection('hero')}
            className="w-full text-right rtl:text-right ltr:text-left py-2.5 px-3 rounded-lg hover:bg-rose-50 font-medium text-[#4a3728] flex items-center gap-2"
          >
            <Home className="w-4 h-4 text-[#9f1239]" />
            <span>{t('navHome')}</span>
          </button>
          <button
            onClick={() => scrollToSection('units')}
            className="w-full text-right rtl:text-right ltr:text-left py-2.5 px-3 rounded-lg hover:bg-rose-50 font-medium text-[#4a3728] flex items-center gap-2"
          >
            <Home className="w-4 h-4 text-[#9f1239]" />
            <span>{t('navUnits')}</span>
          </button>
          <button
            onClick={() => scrollToSection('booking-platforms')}
            className="w-full text-right rtl:text-right ltr:text-left py-2.5 px-3 rounded-lg hover:bg-rose-50 font-medium text-[#4a3728] flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-[#9f1239]" />
            <span>{t('navPlatforms')}</span>
          </button>
          <button
            onClick={() => scrollToSection('location')}
            className="w-full text-right rtl:text-right ltr:text-left py-2.5 px-3 rounded-lg hover:bg-rose-50 font-medium text-[#4a3728] flex items-center gap-2"
          >
            <MapPin className="w-4 h-4 text-[#9f1239]" />
            <span>{t('navLocation')}</span>
          </button>
          <button
            onClick={() => scrollToSection('whatsapp-contact')}
            className="w-full text-right rtl:text-right ltr:text-left py-2.5 px-3 rounded-lg hover:bg-rose-50 font-medium text-[#4a3728] flex items-center gap-2"
          >
            <span>{t('navContact')}</span>
          </button>

          <div className="pt-2 border-t border-rose-100 flex flex-col gap-2">
            <button
              onClick={toggleLanguage}
              className="w-full py-2.5 px-3 rounded-lg bg-white hover:bg-rose-50 text-[#881337] border border-rose-200 font-bold text-sm flex items-center justify-center gap-2"
            >
              <Globe className="w-4 h-4 text-[#9f1239]" />
              <span>{language === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
