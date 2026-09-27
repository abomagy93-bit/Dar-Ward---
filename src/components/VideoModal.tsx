import React, { useEffect } from 'react';
import { useHospitality } from '../context/HospitalityContext';
import { extractTikTokVideoId, getTikTokEmbedUrl } from '../utils/tiktok';
import { X, Play, Film, MessageCircle, Sparkles, ExternalLink } from 'lucide-react';

// Helper to determine video type & extract embed URL
export function formatVideoEmbed(url: string, autoplay: boolean = true): {
  type: 'youtube' | 'tiktok' | 'direct_video' | 'iframe' | 'unknown';
  embedUrl: string;
  isVertical: boolean;
} {
  if (!url || !url.trim()) {
    return { type: 'unknown', embedUrl: '', isVertical: false };
  }

  const cleanUrl = url.trim();

  // 1. YouTube & YouTube Shorts
  const isShorts = cleanUrl.includes('/shorts/');
  const ytMatch = cleanUrl.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
  );
  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&rel=0&modestbranding=1&playsinline=1&controls=1`,
      isVertical: isShorts,
    };
  }

  // 2. TikTok
  const isTikTok = cleanUrl.includes('tiktok.com');
  if (isTikTok) {
    const tiktokEmbed = getTikTokEmbedUrl(cleanUrl);
    if (tiktokEmbed) {
      return {
        type: 'tiktok',
        embedUrl: tiktokEmbed,
        isVertical: true,
      };
    }
  }

  // 3. Direct MP4 / WebM video file
  if (/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(cleanUrl)) {
    return {
      type: 'direct_video',
      embedUrl: cleanUrl,
      isVertical: false,
    };
  }

  // 4. Any other embeddable URL / iframe src
  return {
    type: 'iframe',
    embedUrl: cleanUrl,
    isVertical: false,
  };
}

export const VideoModal: React.FC = () => {
  const { videoModal, closeVideoModal, settings, language } = useHospitality();

  // Handle ESC key press
  useEffect(() => {
    if (!videoModal.isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeVideoModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [videoModal.isOpen, closeVideoModal]);

  if (!videoModal.isOpen || !videoModal.videoUrl) {
    return null;
  }

  const formatted = formatVideoEmbed(videoModal.videoUrl, true);
  const title = videoModal.title || (language === 'ar' ? 'جولة مرئية في دار ورد' : 'Dar Ward Video Tour');
  const subtitle = videoModal.subtitle || (language === 'ar' ? 'مشاهدة مباشرة داخل الموقع بدقة عالية' : 'Direct in-site streaming in high quality');

  const whatsappLink = `https://wa.me/${settings.whatsapp1.number.replace(/\+/g, '')}?text=${encodeURIComponent(
    `السلام عليكم، شاهدت فيديو "${title}" في موقع دار ورد وأود الاستفسار والحجز.`
  )}`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-fade-in"
      onClick={closeVideoModal}
      role="dialog"
      aria-modal="true"
    >
      {/* Modal Container */}
      <div
        className={`relative w-full ${
          formatted.isVertical ? 'max-w-md' : 'max-w-5xl'
        } bg-[#180a0e] rounded-3xl border-2 border-[#d4af37]/60 shadow-2xl shadow-rose-950/80 overflow-hidden flex flex-col max-h-[92vh] transition-all`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-gradient-to-r from-[#2c0b16] via-[#1f030a] to-[#2c0b16] border-b border-[#d4af37]/30 text-white z-10">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#9f1239] to-[#be123c] flex items-center justify-center flex-shrink-0 text-[#fde047] shadow-md border border-[#fde047]/30">
              <Film className="w-4 h-4" />
            </div>
            <div className="truncate">
              <h3 className="font-['Amiri',serif] text-base sm:text-lg font-bold text-white truncate">
                {title}
              </h3>
              <p className="text-[11px] text-rose-200/80 truncate font-light">
                {subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 rtl:mr-2 ltr:ml-2">
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-rose-900/60 text-rose-200 border border-rose-700/50">
              <Sparkles className="w-3 h-3 text-[#fde047]" />
              <span>مشاهدة داخلية</span>
            </span>

            <button
              type="button"
              onClick={closeVideoModal}
              className="p-2 rounded-full bg-white/10 hover:bg-rose-600/80 text-white transition-all active:scale-95 border border-white/20"
              aria-label="إغلاق نافذة الفيديو"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player Frame */}
        <div className="relative w-full bg-black flex items-center justify-center overflow-hidden">
          <div
            className={`w-full ${
              formatted.isVertical
                ? 'aspect-[9/16] max-h-[70vh]'
                : 'aspect-video max-h-[75vh]'
            }`}
          >
            {formatted.type === 'direct_video' ? (
              <video
                src={formatted.embedUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              >
                متصفحك لا يدعم تشغيل الفيديو المباشر.
              </video>
            ) : formatted.embedUrl ? (
              <iframe
                src={formatted.embedUrl}
                title={title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="p-8 text-center text-rose-200 flex flex-col items-center justify-center gap-3">
                <p>عذراً، تعذر تحميل رابط الفيديو داخل المشغل.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Bar with Direct WhatsApp Action */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-[#140509] border-t border-rose-900/40 text-xs text-rose-200">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>دار ورد للضيافة • المدينة المنورة</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>استفسار وحجز عبر واتساب</span>
            </a>

            <button
              type="button"
              onClick={closeVideoModal}
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors"
            >
              إغلاق النافذة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
