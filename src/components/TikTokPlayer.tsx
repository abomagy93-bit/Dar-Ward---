import React, { useState } from 'react';
import { getTikTokEmbedUrl, extractTikTokVideoId } from '../utils/tiktok';
import { useHospitality } from '../context/HospitalityContext';
import { Play, Maximize2, Sparkles, Video } from 'lucide-react';

interface TikTokPlayerProps {
  videoUrl?: string;
  unitTitle?: string;
  className?: string;
}

export const TikTokPlayer: React.FC<TikTokPlayerProps> = ({ videoUrl, unitTitle, className = '' }) => {
  const { openVideoModal } = useHospitality();
  const [isPlaying, setIsPlaying] = useState(false);

  if (!videoUrl || !videoUrl.trim()) {
    return null;
  }

  const embedUrl = getTikTokEmbedUrl(videoUrl);
  const videoId = extractTikTokVideoId(videoUrl);

  const handleOpenInModal = () => {
    openVideoModal(
      videoUrl,
      unitTitle ? `جولة فيديو: ${unitTitle}` : 'فيديو الوحدة الفندقية',
      'مشاهدة مدمجة داخل موقع دار ورد للضيافة'
    );
  };

  return (
    <div className={`bg-gradient-to-br from-[#1c0810] via-[#12040a] to-black text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-rose-900/50 relative overflow-hidden ${className}`}>
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-rose-600/20 to-pink-600/0 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-amber-600/10 to-rose-600/0 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#9f1239] to-[#be123c] p-[2px] shadow-lg">
            <div className="w-full h-full bg-[#1c0810] rounded-2xl flex items-center justify-center text-[#fde047]">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h3 className="font-['Amiri',serif] text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>جولة مرئية وفيديو للوحدة</span>
              <span className="text-xs font-sans px-2.5 py-0.5 rounded-full bg-rose-950/80 text-rose-300 border border-rose-800/60">
                مشغل داخلي
              </span>
            </h3>
            <p className="text-xs text-rose-200/80 mt-0.5">
              شاهد التفاصيل الحية والأجواء الفاخرة للوحدة مباشرة داخل الموقع
            </p>
          </div>
        </div>

        {/* Open in full in-site window button */}
        <button
          type="button"
          onClick={handleOpenInModal}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-rose-600/30 text-white text-xs font-bold transition-all border border-rose-300/30 backdrop-blur-sm group active:scale-95 shadow-sm"
        >
          <Maximize2 className="w-3.5 h-3.5 text-[#fde047]" />
          <span>تكبير الفيديو في نافذة داخلية</span>
        </button>
      </div>

      {/* Video Container */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {embedUrl ? (
          <div className="w-full max-w-[380px] h-[580px] sm:h-[640px] rounded-2xl overflow-hidden bg-black shadow-2xl border-2 border-rose-950/60 relative">
            {!isPlaying ? (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#240813] to-black relative">
                <div
                  className="w-20 h-20 rounded-full bg-gradient-to-r from-[#e11d48] to-[#be123c] p-[2px] mb-4 shadow-xl group hover:scale-110 transition-transform cursor-pointer"
                  onClick={() => setIsPlaying(true)}
                >
                  <div className="w-full h-full bg-black/80 rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-white fill-white translate-x-[-2px]" />
                  </div>
                </div>
                <h4 className="font-bold text-base text-white mb-1 font-['Amiri',serif]">
                  {unitTitle || 'فيديو الوحدة الفندقية'}
                </h4>
                <p className="text-xs text-rose-200/70 mb-6 max-w-xs">
                  اضغط للتشغيل الفوري هنا أو افتح الفيديو في نافذة العرض المدمجة
                </p>
                <div className="flex flex-col sm:flex-row gap-2 w-full max-w-xs">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#9f1239] to-[#be123c] text-white text-xs font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 border border-[#d4af37]/40"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>تشغيل في الصفحة</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenInModal}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-white/20 active:scale-95"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>نافذة كاملة</span>
                  </button>
                </div>
              </div>
            ) : (
              <iframe
                src={embedUrl}
                title={unitTitle || 'Unit Video'}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}
          </div>
        ) : (
          /* Fallback if non-embed format, still opens in-site modal */
          <div className="w-full max-w-md p-8 rounded-2xl bg-stone-900/90 border border-stone-800 text-center">
            <Video className="w-12 h-12 text-[#be123c] mx-auto mb-3" />
            <h4 className="font-bold text-white text-base mb-2 font-['Amiri',serif]">فيديو الوحدة المتاح</h4>
            <p className="text-xs text-stone-300 mb-6 leading-relaxed">
              شاهد التفاصيل الحية والأجواء الفندقية الخاصة بهذه الوحدة مباشرة:
            </p>
            <button
              type="button"
              onClick={handleOpenInModal}
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#881337] to-[#be123c] text-white text-xs font-bold shadow-xl hover:brightness-110 transition-all border border-[#d4af37]/50"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>مشاهدة الفيديو داخل الموقع</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
