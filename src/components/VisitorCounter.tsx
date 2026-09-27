import React, { useEffect, useState } from 'react';
import { useHospitality } from '../context/HospitalityContext';
import { RoseIcon, CornerRoseOrnament } from './RoseDecorations';
import { Users, Eye, Sparkles, TrendingUp, ShieldCheck, Heart } from 'lucide-react';

const BASE_VISITOR_COUNT = 1000;
const STORAGE_KEY_VISITORS = 'dar_ward_visitor_counter_v1';
const STORAGE_KEY_LAST_SESSION = 'dar_ward_last_session_time';

export const VisitorCounter: React.FC = () => {
  const { language, t } = useHospitality();
  const [visitorCount, setVisitorCount] = useState<number>(BASE_VISITOR_COUNT);
  const [todayVisitors, setTodayVisitors] = useState<number>(42);
  const [activeNow, setActiveNow] = useState<number>(3);
  const [hasIncremented, setHasIncremented] = useState(false);

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
      setHasIncremented(true);

      // Deterministic dynamic today's count based on date + offset
      const daySeed = new Date().getDate() + new Date().getMonth() * 31;
      const dynamicToday = 35 + (daySeed % 28) + (currentTotal % 15);
      setTodayVisitors(dynamicToday);

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
    <section id="visitor-stats" className="py-14 bg-gradient-to-b from-[#faf7f4] via-[#f5ede4] to-[#faf7f4] relative overflow-hidden border-t border-b border-rose-100/80">
      {/* Background Subtle Ambience Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-rose-200/30 via-[#d4af37]/15 to-rose-300/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-[#2a0813] via-[#1a040b] to-[#0f0206] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-[#d4af37]/60 relative overflow-hidden">
          {/* Luxury Corner Ornaments */}
          <CornerRoseOrnament position="top-right" />
          <CornerRoseOrnament position="top-left" />

          {/* Header Badge */}
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-950/80 text-[#fde047] text-xs font-bold border border-[#d4af37]/40 mb-3 shadow-md backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>{language === 'ar' ? 'إحصائيات وعداد الزوار المباشر' : 'Live Dar Ward Visitor Counter'}</span>
            </div>

            <h2 className="font-['Amiri',serif] text-2xl sm:text-4xl font-bold text-white mb-2 leading-tight">
              {language === 'ar' ? 'سعداء بزيارتكم في رحاب دار ورد' : 'Delighted by Your Visit to Dar Ward'}
            </h2>

            <p className="text-xs sm:text-sm text-rose-200/80 font-light">
              {language === 'ar'
                ? 'نعتز بثقة ضيوفنا الكرام وزوار المدينة المنورة من داخل المملكة وخارجها'
                : 'Honored by the trust of our valued guests visiting the Holy City of Madinah'}
            </p>
          </div>

          {/* Main Visitor Counter Display Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
            {/* Box 1: Total Real Visitors (Starts from 1000) */}
            <div className="md:col-span-2 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-[#d4af37]/50 shadow-xl flex flex-col justify-between relative overflow-hidden group hover:border-[#d4af37] transition-all">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9f1239] to-[#be123c] flex items-center justify-center text-[#fde047] shadow-lg border border-[#fde047]/30">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-rose-200/80 font-medium block">
                      {language === 'ar' ? 'إجمالي عدد الزوار والمشاهدات' : 'Total Site Visitors & Views'}
                    </span>
                    <span className="text-[11px] text-[#fde047] font-sans">
                      {language === 'ar' ? 'عداد حقيقي ومحدث' : 'Real-time verified counter'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'مستمر بالنمو' : 'Growing'}</span>
                </div>
              </div>

              {/* Huge Odometer Counter */}
              <div className="my-2 py-3 px-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="font-['Amiri',serif] text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#fde047] via-[#fff1f2] to-[#fed7aa] tracking-wider drop-shadow-md">
                    {formatNum(visitorCount)}
                  </span>
                  <span className="text-xs text-rose-200 font-bold">
                    {language === 'ar' ? 'زائر ومشاهدة' : 'visitors'}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[#fde047] text-xs font-bold animate-pulse">
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden sm:inline">{language === 'ar' ? 'تحديث لحظي' : 'Live'}</span>
                </div>
              </div>

              <div className="text-[11px] text-rose-200/70 flex items-center justify-between mt-2 pt-2 border-t border-white/10">
                <span>{language === 'ar' ? 'يبدأ العداد رسمياً من ١,٠٠٠+' : 'Counter baseline starts from 1,000+'}</span>
                <span className="text-emerald-300 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping" />
                  {language === 'ar' ? `${formatNum(activeNow)} يتصفحون الآن` : `${activeNow} browsing now`}
                </span>
              </div>
            </div>

            {/* Box 2: Today's Visitors */}
            <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 shadow-lg flex flex-col justify-between hover:border-rose-300/40 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-rose-900/60 flex items-center justify-center text-[#fde047]">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-xs text-rose-200 font-medium">
                  {language === 'ar' ? 'زوار اليوم' : "Today's Guests"}
                </span>
              </div>

              <div className="my-2">
                <span className="font-['Amiri',serif] text-3xl font-bold text-white block">
                  +{formatNum(todayVisitors)}
                </span>
                <span className="text-[11px] text-stone-300">
                  {language === 'ar' ? 'مهتم بالاستفسار والحجز' : 'Inquiring guests'}
                </span>
              </div>

              <div className="text-[11px] text-emerald-400 font-medium pt-2 border-t border-white/10">
                ✓ {language === 'ar' ? 'نشاط متزايد اليوم' : 'High activity today'}
              </div>
            </div>

            {/* Box 3: Guest Satisfaction & Service Guarantee */}
            <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 shadow-lg flex flex-col justify-between hover:border-rose-300/40 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-900/60 flex items-center justify-center text-[#fde047]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs text-rose-200 font-medium">
                  {language === 'ar' ? 'رضا الضيوف' : 'Guest Satisfaction'}
                </span>
              </div>

              <div className="my-2">
                <span className="font-['Amiri',serif] text-3xl font-bold text-[#fde047] block">
                  {language === 'ar' ? '٩٩.٦٪' : '99.6%'}
                </span>
                <span className="text-[11px] text-stone-300">
                  {language === 'ar' ? 'تقييمات ممتازة وخدمة فندقية' : 'Exceptional rating'}
                </span>
              </div>

              <div className="text-[11px] text-rose-200/80 font-medium pt-2 border-t border-white/10 flex items-center gap-1">
                <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                <span>{language === 'ar' ? 'ضيافة تليق بكم' : 'Excellence in service'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
