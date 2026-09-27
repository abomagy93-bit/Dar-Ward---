import React, { useState, useRef, useEffect } from 'react';
import { useHospitality } from '../context/HospitalityContext';
import { Volume2, VolumeX, Play, Pause, Radio, Loader2 } from 'lucide-react';

// Reliable direct audio streams for Cairo Holy Quran Radio
const STREAM_URL = 'https://stream.radiojar.com/8s5u5tpdtwzuv';
const FALLBACK_STREAM_URL = 'https://n0a.radiojar.com/8s5u5tpdtwzuv';

export const HolyQuranRadio: React.FC<{ variant?: 'header' | 'floating' | 'banner' }> = ({
  variant = 'header',
}) => {
  const { language, t } = useHospitality();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'none';
    audioRef.current = audio;

    const handleWaiting = () => setIsLoading(true);
    const handlePlaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
      setHasError(false);
    };
    const handlePause = () => {
      setIsPlaying(false);
      setIsLoading(false);
    };
    const handleError = () => {
      // Try fallback URL if primary fails
      if (audio.src === STREAM_URL) {
        audio.src = FALLBACK_STREAM_URL;
        audio.play().catch(() => {
          setIsPlaying(false);
          setIsLoading(false);
          setHasError(true);
        });
      } else {
        setIsPlaying(false);
        setIsLoading(false);
        setHasError(true);
      }
    };

    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audio.src = '';
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      setHasError(false);
      if (!audio.src) {
        audio.src = STREAM_URL;
      }
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch((err) => {
          console.warn('Playback error, trying fallback:', err);
          audio.src = FALLBACK_STREAM_URL;
          audio
            .play()
            .then(() => {
              setIsPlaying(true);
              setIsLoading(false);
            })
            .catch(() => {
              setIsLoading(false);
              setIsPlaying(false);
              setHasError(true);
            });
        });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const radioTitle = t('quranRadio'); // Note: strictly without Cairo / بدون ذكر القاهرة

  if (variant === 'banner') {
    return (
      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
        <button
          onClick={togglePlay}
          className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all shadow-sm ${
            isPlaying
              ? 'bg-[#fde047] text-[#881337] ring-2 ring-white/50 scale-102'
              : 'bg-black/30 hover:bg-black/50 text-[#fef08a] border border-[#fde047]/40 hover:scale-102'
          }`}
          title={radioTitle}
        >
          {isLoading ? (
            <Loader2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
          ) : (
            <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
          )}

          <Radio className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="hidden sm:inline">{radioTitle}</span>
          <span className="sm:hidden">{language === 'ar' ? 'القرآن الكريم' : 'Radio'}</span>

          {isPlaying && (
            <span className="hidden sm:flex items-center gap-0.5 ml-1">
              <span className="w-1 h-3 bg-[#881337] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1 h-4 bg-[#881337] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1 h-2 bg-[#881337] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </span>
          )}
        </button>

        {isPlaying && (
          <button
            onClick={toggleMute}
            className="p-1 rounded-full bg-black/20 hover:bg-black/40 text-[#fde047] transition-colors"
            title={isMuted ? 'إلغاء الكتم' : 'كتم'}
          >
            {isMuted ? <VolumeX className="w-3 h-3 text-rose-300" /> : <Volume2 className="w-3 h-3" />}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={togglePlay}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
          isPlaying
            ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white ring-2 ring-emerald-300 shadow-emerald-700/20'
            : 'bg-white hover:bg-rose-50 text-[#881337] border border-rose-200'
        }`}
        title={radioTitle}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
        ) : isPlaying ? (
          <Pause className="w-4 h-4 fill-current" />
        ) : (
          <Play className="w-4 h-4 fill-current text-[#9f1239]" />
        )}

        <Radio className={`w-4 h-4 ${isPlaying ? 'text-amber-300' : 'text-[#9f1239]'}`} />
        <span>{radioTitle}</span>

        {isPlaying && (
          <span className="flex items-center gap-0.5">
            <span className="w-1 h-2.5 bg-amber-300 rounded-full animate-pulse" />
            <span className="w-1 h-3.5 bg-amber-300 rounded-full animate-pulse" style={{ animationDelay: '120ms' }} />
            <span className="w-1 h-2 bg-amber-300 rounded-full animate-pulse" style={{ animationDelay: '240ms' }} />
          </span>
        )}
      </button>

      {isPlaying && (
        <button
          onClick={toggleMute}
          className="p-2 rounded-xl bg-white hover:bg-rose-50 text-[#881337] border border-rose-200 transition-colors"
          title={isMuted ? 'إلغاء الكتم' : 'كتم'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4" />}
        </button>
      )}

      {hasError && (
        <span className="text-[11px] text-rose-600 bg-rose-50 px-2 py-1 rounded-md">
          {language === 'ar' ? 'تعذر الاتصال بالبث' : 'Stream unavailable'}
        </span>
      )}
    </div>
  );
};
