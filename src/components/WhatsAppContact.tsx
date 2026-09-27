import React, { useState } from 'react';
import { useHospitality } from '../context/HospitalityContext';
import { RoseIcon, RoseDivider, CornerRoseOrnament } from './RoseDecorations';
import { MessageCircle, Clock, UserCheck, Shield, Send, Sparkles } from 'lucide-react';

export const WhatsAppContact: React.FC = () => {
  const { settings, t, language } = useHospitality();

  const openWhatsApp = (number: string, message: string) => {
    const cleanNumber = number.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="whatsapp-contact" className="py-20 bg-[#fdfbf7] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 mb-3 shadow-sm">
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('contactBadge')}</span>
          </div>

          <h2 className="font-['Amiri',serif] text-3xl sm:text-5xl font-bold text-[#881337] mb-3">
            {t('contactTitle')}
          </h2>

          <p className="text-base sm:text-lg text-[#5c4033] leading-relaxed">
            {t('contactDescription')}
          </p>

          <RoseDivider className="my-6" />
        </div>

        {/* The Two WhatsApp Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* WhatsApp 1: الحجوزات والاستقبال */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-emerald-100 hover:border-emerald-500 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden">
            <CornerRoseOrnament position="top-right" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-9 h-9 fill-current" />
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{t('availableForBooking')}</span>
                </span>
              </div>

              <div className="text-xs text-[#9f1239] font-bold mb-1">
                {language === 'ar' ? 'الرقم الأول • الاستقبال' : 'Line 1 • Reservations'}
              </div>
              <h3 className="font-['Amiri',serif] text-2xl font-bold text-[#1f2937] mb-2">
                {settings.whatsapp1.label}
              </h3>

              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                {settings.whatsapp1.description}
              </p>

              {/* Number display */}
              <div className="p-4 rounded-2xl bg-[#faf7f4] border border-gray-200 mb-6 text-center">
                <span className="text-xs text-gray-500 block mb-1">
                  {language === 'ar' ? 'رقم الواتساب' : 'WhatsApp Number'}
                </span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-emerald-800 tracking-wider" dir="ltr">
                  {settings.whatsapp1.number}
                </span>
              </div>
            </div>

            <button
              onClick={() => openWhatsApp(settings.whatsapp1.number, settings.whatsapp1.defaultMessage)}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 hover:from-emerald-700 hover:to-teal-900 text-white font-bold text-base shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>{t('chatBookingBtn')}</span>
              <Send className="w-4 h-4 translate-y-[-1px]" />
            </button>
          </div>

          {/* WhatsApp 2: الإدارة وخدمة الضيوف */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-rose-100 hover:border-[#9f1239] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden">
            <CornerRoseOrnament position="top-right" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#9f1239] to-[#be123c] text-white flex items-center justify-center shadow-lg shadow-[#9f1239]/30 group-hover:scale-105 transition-transform">
                  <UserCheck className="w-9 h-9" />
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-rose-50 text-[#881337] text-xs font-bold border border-rose-200 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#9f1239]" />
                  <span>{t('guestServicesBadge')}</span>
                </span>
              </div>

              <div className="text-xs text-[#9f1239] font-bold mb-1">
                {language === 'ar' ? 'الرقم الثاني • الإدارة' : 'Line 2 • Management'}
              </div>
              <h3 className="font-['Amiri',serif] text-2xl font-bold text-[#1f2937] mb-2">
                {settings.whatsapp2.label}
              </h3>

              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                {settings.whatsapp2.description}
              </p>

              {/* Number display */}
              <div className="p-4 rounded-2xl bg-[#faf7f4] border border-gray-200 mb-6 text-center">
                <span className="text-xs text-gray-500 block mb-1">
                  {language === 'ar' ? 'رقم الواتساب' : 'WhatsApp Number'}
                </span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#881337] tracking-wider" dir="ltr">
                  {settings.whatsapp2.number}
                </span>
              </div>
            </div>

            <button
              onClick={() => openWhatsApp(settings.whatsapp2.number, settings.whatsapp2.defaultMessage)}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#9f1239] via-[#be123c] to-[#e11d48] hover:from-[#881337] hover:to-[#9f1239] text-white font-bold text-base shadow-lg shadow-[#9f1239]/30 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>{t('chatMgmtBtn')}</span>
              <Send className="w-4 h-4 translate-y-[-1px]" />
            </button>
          </div>
        </div>

        {/* Direct Service Commitments */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-rose-100 text-center text-xs text-[#5c4033]">
          <div className="p-3 bg-white rounded-xl border border-rose-100">
            <Clock className="w-4 h-4 text-[#9f1239] mx-auto mb-1.5" />
            <strong className="block text-sm text-[#2c1810] mb-0.5">{t('fastResponseTitle')}</strong>
            <span>{t('fastResponseDesc')}</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-rose-100">
            <Shield className="w-4 h-4 text-[#9f1239] mx-auto mb-1.5" />
            <strong className="block text-sm text-[#2c1810] mb-0.5">{t('officialBookingTitle')}</strong>
            <span>{t('officialBookingDesc')}</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-rose-100">
            <Sparkles className="w-4 h-4 text-[#9f1239] mx-auto mb-1.5" />
            <strong className="block text-sm text-[#2c1810] mb-0.5">{t('hospitalityTitle')}</strong>
            <span>{t('hospitalityDesc')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Floating Floating Quick WhatsApp Widget with 2 options
export const FloatingWhatsAppWidget: React.FC = () => {
  const { settings, t } = useHospitality();
  const [isOpen, setIsOpen] = useState(false);

  const openWhatsApp = (number: string, message: string) => {
    const cleanNumber = number.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 rtl:left-4 sm:rtl:left-6 ltr:right-4 sm:ltr:right-6 z-40 max-w-[calc(100vw-2rem)]">
      {/* Options Popup */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2.5rem)] max-w-72 bg-white rounded-2xl shadow-2xl border-2 border-rose-200 p-4 animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between pb-2 border-b border-rose-100 mb-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#881337]">
              <RoseIcon className="w-4 h-4 text-[#e11d48]" />
              <span>{t('floatingWidgetTitle')}</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => openWhatsApp(settings.whatsapp1.number, settings.whatsapp1.defaultMessage)}
              className="w-full text-start p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 transition-colors flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-bold">{t('floatingLine1')}</div>
                <div className="text-[11px] text-emerald-700" dir="ltr">
                  {settings.whatsapp1.number}
                </div>
              </div>
              <MessageCircle className="w-5 h-5 text-emerald-600" />
            </button>

            <button
              onClick={() => openWhatsApp(settings.whatsapp2.number, settings.whatsapp2.defaultMessage)}
              className="w-full text-start p-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-[#881337] border border-rose-200 transition-colors flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-bold">{t('floatingLine2')}</div>
                <div className="text-[11px] text-[#9f1239]" dir="ltr">
                  {settings.whatsapp2.number}
                </div>
              </div>
              <MessageCircle className="w-5 h-5 text-[#9f1239]" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all border-2 border-white"
        title="WhatsApp"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-8 h-8 fill-current" />
      </button>
    </div>
  );
};
