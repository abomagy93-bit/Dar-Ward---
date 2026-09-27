import React from 'react';
import { useHospitality } from '../context/HospitalityContext';
import { RoseIcon } from './RoseDecorations';
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Heart,
  ExternalLink,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, language, t } = useHospitality();

  return (
    <footer className="bg-gradient-to-b from-[#1c100b] to-[#0d0705] text-stone-300 pt-16 pb-12 border-t-4 border-[#9f1239] relative overflow-hidden">
      {/* Decorative subtle background ornaments */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#9f1239] to-[#4c0519] flex items-center justify-center text-white shadow-lg border border-amber-400/40">
                <RoseIcon className="w-6 h-6 text-[#fde047]" />
              </div>
              <div>
                <h3 className="font-['Amiri',serif] text-2xl font-bold text-white tracking-wide">
                  {settings.siteName}
                </h3>
                <p className="text-xs text-rose-300/80 font-medium">
                  {settings.tagline}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-lg">
              {t('footerBio')}
            </p>

            {/* Social & Booking Platforms Links */}
            <div className="space-y-2 pt-2">
              <span className="text-xs text-stone-400 font-medium block">
                {language === 'ar' ? 'تابعنا واحجز عبر منصاتنا الرسمية:' : 'Follow & Book on Official Channels:'}
              </span>

              <div className="flex flex-wrap items-center gap-2.5">
                {/* TikTok */}
                {settings.tiktokUrl && (
                  <a
                    href={settings.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 px-3 rounded-xl bg-stone-900/90 hover:bg-black text-stone-300 hover:text-white flex items-center gap-2 transition-all duration-300 border border-stone-800 hover:border-[#FE2C55] hover:scale-105 shadow-sm group"
                    title="TikTok - حساب دار ورد"
                  >
                    <svg className="w-4 h-4 fill-current text-white group-hover:text-[#25F4EE] transition-colors" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.5 6.3 6.3 0 0 0 1.95-4.57V8.58a8.31 8.31 0 0 0 5-1.89z" />
                    </svg>
                    <span className="text-xs font-bold font-sans">TikTok</span>
                  </a>
                )}

                {/* Booking.com */}
                {settings.bookingUrl && (
                  <a
                    href={settings.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 px-3 rounded-xl bg-stone-900/90 hover:bg-[#003580] text-stone-300 hover:text-white flex items-center gap-2 transition-all duration-300 border border-stone-800 hover:border-[#006ce4] hover:scale-105 shadow-sm group"
                    title="Booking.com - صفحة دار ورد على بوكينج"
                  >
                    <div className="w-5 h-5 rounded bg-[#003580] group-hover:bg-white text-white group-hover:text-[#003580] flex items-center justify-center font-extrabold text-[11px] font-sans transition-colors">
                      B.
                    </div>
                    <span className="text-xs font-bold font-sans">Booking.com</span>
                  </a>
                )}

                {/* Airbnb */}
                {settings.airbnbUrl && (
                  <a
                    href={settings.airbnbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 px-3 rounded-xl bg-stone-900/90 hover:bg-[#FF5A5F] text-stone-300 hover:text-white flex items-center gap-2 transition-all duration-300 border border-stone-800 hover:border-[#FF5A5F] hover:scale-105 shadow-sm group"
                    title="Airbnb - صفحة دار ورد على إير بي إن بي"
                  >
                    <svg className="w-4 h-4 fill-current text-[#FF5A5F] group-hover:text-white transition-colors" viewBox="0 0 24 24">
                      <path d="M12.003 2c-3.1 0-5.834 2.197-6.495 5.213-.654 2.583.187 5.292 2.106 7.155l3.856 3.916a.75.75 0 0 0 1.066 0l3.856-3.916c1.92-1.863 2.76-4.572 2.106-7.155C17.837 4.197 15.103 2 12.003 2zm0 10.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                    </svg>
                    <span className="text-xs font-bold font-sans">Airbnb</span>
                  </a>
                )}

                {/* Facebook */}
                {settings.facebookUrl && (
                  <a
                    href={settings.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 px-3 rounded-xl bg-stone-900/90 hover:bg-[#1877F2] text-stone-300 hover:text-white flex items-center gap-2 transition-all duration-300 border border-stone-800 hover:border-[#1877F2] hover:scale-105 shadow-sm group"
                    title="Facebook"
                  >
                    <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span className="text-xs font-bold font-sans">Facebook</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-base pb-1 border-b border-stone-800 inline-block">
              {t('footerQuickLinks')}
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <a href="#units" className="hover:text-[#fde047] transition-colors">
                  {t('footerBrowseUnits')}
                </a>
              </li>
              <li>
                <a href="#booking-platforms" className="hover:text-[#fde047] transition-colors">
                  {t('footerPlatforms')}
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#fde047] transition-colors">
                  {t('footerLocation')}
                </a>
              </li>
              <li>
                <a href="#whatsapp-contact" className="hover:text-[#fde047] transition-colors">
                  {t('footerContact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact Numbers */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-base pb-1 border-b border-stone-800 inline-block">
              {t('footerContactNumbers')}
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href={`https://wa.me/${settings.whatsapp1.number.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-300 border border-stone-800 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-mono text-xs" dir="ltr">
                  {settings.whatsapp1.number}
                </span>
                <span className="text-[10px] text-stone-400">({settings.whatsapp1.label})</span>
              </a>

              <a
                href={`https://wa.me/${settings.whatsapp2.number.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-300 border border-stone-800 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-rose-400" />
                <span className="font-mono text-xs" dir="ltr">
                  {settings.whatsapp2.number}
                </span>
                <span className="text-[10px] text-stone-400">({settings.whatsapp2.label})</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>{t('footerCopyright', { year: new Date().getFullYear() })}</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span>{t('footerLove')}</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
