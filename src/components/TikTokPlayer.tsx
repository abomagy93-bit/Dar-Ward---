import React from 'react';
import { ExternalLink, Sparkles, Video } from 'lucide-react';

interface TikTokPlayerProps {
  videoUrl?: string;
  unitTitle?: string;
  className?: string;
}

export const TikTokPlayer: React.FC<TikTokPlayerProps> = ({ videoUrl, unitTitle, className = '' }) => {
  if (!videoUrl || !videoUrl.trim()) {
    return null;
  }

  const cleanUrl = videoUrl.trim();

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
              <span className="text-xs font-sans px-2.5 py-0.5 rounded-full bg-black text-[#25F4EE] border border-[#25F4EE]/40 flex items-center gap-1 font-bold">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.5 6.3 6.3 0 0 0 1.95-4.57V8.58a8.31 8.31 0 0 0 5-1.89z" />
                </svg>
                <span>TikTok</span>
              </span>
            </h3>
            <p className="text-xs text-rose-200/80 mt-0.5">
              شاهد التفاصيل الحية والأجواء الفاخرة للوحدة عبر حساب دار ورد على تيك توك
            </p>
          </div>
        </div>
      </div>

      {/* Direct Browser Link Card */}
      <div className="relative z-10 max-w-xl mx-auto text-center py-6 px-4 sm:px-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#9f1239] via-[#be123c] to-[#e11d48] flex items-center justify-center mx-auto mb-4 shadow-xl border-2 border-[#d4af37]/60 animate-pulse">
          <Video className="w-8 h-8 text-white" />
        </div>

        <h4 className="font-['Amiri',serif] text-xl font-bold text-white mb-2">
          {unitTitle ? `فيديو: ${unitTitle}` : 'فيديو وجولة الوحدة'}
        </h4>

        <p className="text-xs text-rose-200/80 mb-6 max-w-md mx-auto leading-relaxed">
          انقر أدناه لفتح وتشغيل الفيديو مباشرة في متصفح الويب بدقة عالية:
        </p>

        <a
          href={cleanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#9f1239] via-[#be123c] to-[#e11d48] hover:from-[#881337] hover:to-[#be123c] text-white font-bold text-sm shadow-xl hover:shadow-2xl transition-all duration-300 border border-[#d4af37]/60 active:scale-95 group"
        >
          <svg className="w-5 h-5 fill-current text-white group-hover:text-[#25F4EE] transition-colors" viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.5 6.3 6.3 0 0 0 1.95-4.57V8.58a8.31 8.31 0 0 0 5-1.89z" />
          </svg>
          <span>مشاهدة الفيديو على تيك توك (في المتصفح)</span>
          <ExternalLink className="w-4 h-4 text-[#fde047] group-hover:translate-x-[-2px] transition-transform" />
        </a>
      </div>
    </div>
  );
};
