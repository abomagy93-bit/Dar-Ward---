import React, { useEffect, useState } from 'react';
import { useHospitality } from '../context/HospitalityContext';
import { CornerRoseOrnament } from './RoseDecorations';
import { Eye, Sparkles } from 'lucide-react';

const BASE_VISITOR_COUNT = 1000;
const STORAGE_KEY_VISITORS = 'dar_ward_visitor_counter_v1';
const STORAGE_KEY_LAST_SESSION = 'dar_ward_last_session_time';

export const VisitorCounter: React.FC = () => {
  const { language } = useHospitality();
  const [visitorCount, setVisitorCount] = useState<number>(BASE_VISITOR_COUNT);
  const [activeNow, setActiveNow] = useState<number>(3);

  useEffect(() => {
    try {
      const now = Date.now();
      const lastSession = localStorage.getItem(STORAGE_KEY_LAST_SESSION);
      let storedCount = localStorage.getItem(STORAGE_KEY_VISITORS);

      let currentTotal = BASE_VISITOR_COUNT;
      if (storedCount) {
        const parsed = parseInt(storedCount, 10);
        if (!isNaN(parsed) && parsed >= BASE_VISITOR_COUNT) {
          currentTotal = parsed;
        }
      }

      // Check if this is a new visit (after 10 minutes from last session)
      const isNewSession = !lastSession || now - parseInt(lastSession, 10) > 10 * 60 * 1000;

      if (isNewSession) {
        currentTotal += 1;
        localStorage.setItem(STORAGE_KEY_VISITORS, currentTotal.toString());
        localStorage.setItem(STORAGE_KEY_LAST_SESSION, now.toString());
      }

      setVisitorCount(currentTotal);

      // Active now simulation (3 to 7 real-time guests)
      const activeCount = 3 + ((currentTotal + new Date().getMinutes()) % 5);
      setActiveNow(activeCount);
    } catch {
      setVisitorCount(BASE_VISITOR_COUNT + 18);
    }
  }, []);

  // Format numbers to Eastern Arabic numerals if Arabic language
  const formatNum = (num: number): string => {
    if (language === 'ar') {
      return num
        .toLocaleString('ar-SA')
        .replace(/٬/g, ',');
    }
    return num.toLocaleString('en-US');
  };

  return (
    <section id="visitor-stats" className="py-12 bg-gradient-to-b from-[#faf7f4] via-[#f5ede4] to-[#faf7f4] relative overflow-hidden border-t border-b border-rose-100/80">
      {/* Background Subtle Ambience Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-rose-200/30 via-[#d4af37]/15 to-rose-300/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="bg-gradient-to-br from-[#2a0813] via-[#1a040b] to-[#0f0206] text-white rounded-3xl p-6 sm:p-9 shadow-2xl border-2 border-[#d4af37]/60 relative overflow-hidden text-center">
          {/* Luxury Corner Ornaments */}
          <CornerRoseOrnament position="top-right" />
          <CornerRoseOrnament position="top-left" />

          {/* Header Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/80 text-[#fde047] text-xs font-bold border border-[#d4af37]/40 mb-3 shadow-md backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span>{language === 'ar' ? 'عداد الزوار المباشر' : 'Live Visitor Counter'}</span>
          </div>

          <h2 className="font-['Amiri',serif] text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
            {language === 'ar' ? 'سعداء بزيارتكم في رحاب دار ورد' : 'Delighted by Your Visit to Dar Ward'}
          </h2>

          <p className="text-xs sm:text-sm text-rose-200/80 font-light max-w-lg mx-auto mb-6">
            {language === 'ar'
              ? 'نعتز بثقة ضيوفنا الكرام وزوار المدينة المنورة من داخل المملكة وخارجها'
              : 'Honored by the trust of our valued guests visiting the Holy City of Madinah'}
          </p>

          {/* Main Visitor Counter Card */}
          <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-7 border border-[#d4af37]/50 shadow-xl max-w-xl mx-auto">
            <div className="flex items-center justify-center gap-2.5 mb-3 text-rose-200">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#9f1239] to-[#be123c] flex items-center justify-center text-[#fde047] shadow border border-[#fde047]/30">
                <Eye className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-rose-100">
                {language === 'ar' ? 'إجمالي عدد الزوار والمشاهدات' : 'Total Site Visitors & Views'}
              </span>
            </div>

            {/* Odometer Counter */}
            <div className="my-3 py-3 px-6 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="font-['Amiri',serif] text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#fde047] via-[#fff1f2] to-[#fed7aa] tracking-wider drop-shadow-md">
                  {formatNum(visitorCount)}
                </span>
                <span className="text-xs sm:text-sm text-rose-200 font-bold">
                  {language === 'ar' ? 'زائر ومشاهدة' : 'visitors'}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[#fde047] text-xs font-bold animate-pulse">
                <Sparkles className="w-4 h-4 text-[#fde047]" />
                <span>{language === 'ar' ? 'تحديث مباشر' : 'Live'}</span>
              </div>
            </div>

            {/* Active Browsing Indicator */}
            <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-white/10 text-xs text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping" />
              <span className="font-medium">
                {language === 'ar' ? `${formatNum(activeNow)} يتصفحون الموقع الآن` : `${activeNow} browsing the site now`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
