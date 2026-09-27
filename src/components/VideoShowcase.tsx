import React, { useState } from 'react';
import { useHospitality } from '../context/HospitalityContext';
import { RoseIcon, RoseDivider, CornerRoseOrnament } from './RoseDecorations';
import { Play, Sparkles, Film, Maximize2, RefreshCw, Edit3 } from 'lucide-react';

// Helper to extract YouTube ID or embed URL cleanly
function getYouTubeEmbedUrl(urlOrId: string, autoplay: boolean = false): string {
  if (!urlOrId) return '';
  let videoId = urlOrId.trim();

  // Match youtube.com/watch?v=ID or youtu.be/ID
  const matchWatch = videoId.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  if (matchWatch && matchWatch[1]) {
    videoId = matchWatch[1];
  }

  // Parameters to make it look integrated: modestbranding, rel=0, playsinline=1
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&rel=0&modestbranding=1&playsinline=1&controls=1&iv_load_policy=3`;
}

export const VideoShowcase: React.FC = () => {
  const { settings, setIsAdminOpen, openVideoModal, language } = useHospitality();
  const [isPlaying, setIsPlaying] = useState(false);

  const embedUrl = getYouTubeEmbedUrl(settings.youtubeUrl, isPlaying);

  const handleOpenModal = () => {
    openVideoModal(
      settings.youtubeUrl,
      language === 'ar' ? 'جولة مرئية تعريفية داخل دار ورد' : 'Dar Ward Hospitality Video Tour',
      language === 'ar' ? 'مشاهدة مباشرة داخل الموقع بدقة عالية' : 'Direct in-site streaming'
    );
  };

  return (
    <section id="video-tour" className="py-20 bg-[#fbf8f5] relative overflow-hidden">
      {/* Background Subtle Rose Watermark */}
      <div className="absolute -right-24 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-rose-200/20 blur-3xl pointer-events-none" />
      <div className="absolute -left-24 top-1/3 w-80 h-80 rounded-full bg-amber-100/30 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-100 text-[#9f1239] text-xs font-bold border border-rose-200 mb-3 shadow-sm">
            <Film className="w-3.5 h-3.5" />
            <span>جولة مرئية تعريفية داخل دار ورد</span>
          </div>

          <h2 className="font-['Amiri',serif] text-3xl sm:text-5xl font-bold text-[#881337] mb-3">
            عِش التجربة كأنك هنا
          </h2>

          <p className="text-base sm:text-lg text-[#5c4033] leading-relaxed">
            استمتع بمشاهدة تفاصيل الضيافة الفاخرة، جودة الأثاث الفندقي، والأجواء الروحانية
            الهادئة عبر الجولة المرئية المدمجة مباشرة في الموقع.
          </p>

          <RoseDivider className="my-6" />
        </div>

        {/* Video Player Container - Styled as Luxury Cinema Display */}
        <div className="relative mx-auto max-w-5xl">
          {/* Outer Decorative Gold and Velvet Frame */}
          <div className="relative p-2 sm:p-4 rounded-3xl bg-gradient-to-b from-[#881337] via-[#4c0519] to-[#1f030a] shadow-2xl shadow-[#881337]/30 border-2 border-[#d4af37]/60">
            {/* Corner Ornaments */}
            <CornerRoseOrnament position="top-right" />
            <CornerRoseOrnament position="top-left" />

            {/* Top Bar of the Luxury Screen */}
            <div className="flex items-center justify-between px-3 py-2 text-xs text-[#fde047] font-medium border-b border-[#d4af37]/20 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] inline-block animate-pulse" />
                <span className="text-rose-100">فيديو تعريفي مباشر • دار ورد</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="text-xs bg-[#9f1239] hover:bg-[#be123c] px-2.5 py-1 rounded-lg text-white border border-[#d4af37]/40 flex items-center gap-1 shadow transition-all active:scale-95"
                  title="فتح في نافذة كاملة داخل الموقع"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>نافذة سينمائية داخل الموقع</span>
                </button>
                <button
                  onClick={() => setIsAdminOpen(true)}
                  className="text-xs text-amber-200/80 hover:text-white flex items-center gap-1 transition-colors"
                  title="تغيير رابط الفيديو من قاعدة البيانات"
                >
                  <Edit3 className="w-3 h-3" />
                  <span className="hidden sm:inline">تعديل الفيديو</span>
                </button>
              </div>
            </div>

            {/* 16:9 Aspect Ratio Frame */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-inner">
              {!isPlaying ? (
                /* Custom Luxury Cover Overlay before Play */
                <div className="absolute inset-0 z-10 group cursor-pointer" onClick={() => setIsPlaying(true)}>
                  <img
                    src={settings.coverImageUrl}
                    alt="معاينة فيديو دار ورد"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle Red & Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1f030a] via-black/40 to-transparent" />

                  {/* Center Play Button */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center p-4">
                    <div className="relative">
                      {/* Pulsing rings */}
                      <div className="absolute inset-0 rounded-full bg-[#e11d48] animate-ping opacity-30 scale-125" />
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#9f1239] via-[#be123c] to-[#f43f5e] border-3 border-[#fde047] flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform">
                        <Play className="w-10 h-10 fill-current text-white translate-x-[-2px] drop-shadow-md" />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-['Amiri',serif] text-xl sm:text-2xl font-bold text-white drop-shadow">
                        انقر لبدء المشاهدة مباشرة داخل الموقع
                      </h3>
                      <p className="text-xs sm:text-sm text-rose-200 mt-1 font-light">
                        جولة تصويرية تفصيلية في رحاب دار ورد للضيافة
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Native YouTube iFrame with sandbox parameters */}
              <iframe
                src={embedUrl}
                title="جولة دار ورد للضيافة"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Bottom Luxury Footer */}
            <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-rose-200/80 px-2">
              <div className="flex items-center gap-2">
                <RoseIcon className="w-4 h-4 text-[#d4af37]" />
                <span>دقة عالية 4K • تصوير كامل للغرف والمرافق</span>
              </div>
              <div className="flex items-center gap-3">
                {isPlaying && (
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>إعادة التشغيل</span>
                  </button>
                )}
                <span>يعرض كجزء مدمج من موقع دار ورد</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
