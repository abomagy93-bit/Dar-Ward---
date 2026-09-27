import React from 'react';

export const RoseIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Stylized luxury blooming red rose petal outline */}
    <path d="M12 2C8.5 2 6 4.5 6 7.5C6 9 6.8 10.3 8 11.2C6.2 12 5 13.8 5 16C5 19.3 7.7 22 11 22C11.3 22 11.7 22 12 21.9C12.3 22 12.7 22 13 22C16.3 22 19 19.3 19 16C19 13.8 17.8 12 16 11.2C17.2 10.3 18 9 18 7.5C18 4.5 15.5 2 12 2ZM12 4C14.2 4 16 5.8 16 8C16 9.7 14.8 11.1 13.2 11.8C12.8 11.2 12.3 10.7 11.6 10.4C12.4 9.8 13 8.9 13 7.8C13 6.3 11.7 5 10.2 5C9.4 5 8.7 5.3 8.2 5.9C8.1 6.3 8 6.6 8 7C8 7.2 8 7.3 8.1 7.5C7.4 8.2 7 9.1 7 10.2C7 11.3 7.5 12.3 8.4 12.9C7 13.6 6 15.2 6 17C6 19.8 8.2 22 11 22V20C9.3 20 8 18.7 8 17C8 15.6 8.9 14.4 10.2 14.1C10.7 14.7 11.3 15.2 12 15.5C11.4 16.1 11 17 11 18C11 19.7 12.3 21 14 21C15.7 21 17 19.7 17 18C17 16.6 16.1 15.4 14.8 15.1C15.5 14.5 16 13.6 16 12.6C16 11.6 15.4 10.7 14.5 10.3C15.4 9.7 16 8.7 16 7.5C16 5.6 14.4 4 12.5 4H12Z" />
  </svg>
);

export const LuxuryRoseCrest: React.FC<{ size?: 'sm' | 'md' | 'lg'; title?: string }> = ({
  size = 'md',
  title,
}) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 text-center select-none">
      <div className="relative flex items-center justify-center">
        {/* Soft radial glow */}
        <div className="absolute inset-0 bg-[#be123c]/20 blur-xl rounded-full scale-150" />
        
        {/* Decorative Gold & Rose Ring */}
        <div className="relative p-3 rounded-full bg-gradient-to-br from-[#9f1239] via-[#881337] to-[#4c0519] border-2 border-[#d4af37]/60 shadow-lg shadow-[#9f1239]/25">
          <svg
            className={`${sizeMap[size]} text-[#fce7f3] drop-shadow`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Elegant Floral Rose Shape */}
            <path
              d="M12 7.5C10 5 8 5.5 8 7.5C8 9.5 10.5 11 12 12.5C13.5 11 16 9.5 16 7.5C16 5.5 14 5 12 7.5Z"
              fill="#e11d48"
              stroke="#fb7185"
            />
            <path
              d="M12 12.5C9.5 11 7 12 7 14.5C7 17 9.5 18 12 19.5C14.5 18 17 17 17 14.5C17 12 14.5 11 12 12.5Z"
              fill="#be123c"
              stroke="#f43f5e"
            />
            <circle cx="12" cy="11" r="2.5" fill="#fecdd3" />
            <path d="M12 19.5V22" stroke="#d4af37" strokeWidth="2" />
            <path d="M10 21C11 21 12 22 12 22C12 22 13 21 14 21" stroke="#d4af37" />
          </svg>
        </div>
      </div>
      {title && (
        <span className="font-['Amiri',serif] font-bold text-lg tracking-wider text-[#9f1239]">
          {title}
        </span>
      )}
    </div>
  );
};

export const RoseDivider: React.FC<{ className?: string }> = ({ className = 'my-8' }) => (
  <div className={`flex items-center justify-center gap-4 ${className}`}>
    <div className="h-[1px] w-20 md:w-36 bg-gradient-to-r from-transparent via-[#d4af37]/60 to-[#9f1239]/60" />
    <div className="flex items-center gap-1.5 text-[#9f1239]">
      <span className="text-xs text-[#d4af37]">✦</span>
      <svg className="w-5 h-5 text-[#be123c]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3C8.5 3 6 5.5 6 8.5C6 10.2 7 11.5 8.2 12.3C6.5 13.2 5.5 15 5.5 17C5.5 19.8 7.7 22 10.5 22C10.8 22 11.2 22 11.5 21.9C11.7 22 12.1 22 12.5 22C15.3 22 17.5 19.8 17.5 17C17.5 15 16.5 13.2 14.8 12.3C16 11.5 17 10.2 17 8.5C17 5.5 14.5 3 12 3Z" />
      </svg>
      <span className="text-xs text-[#d4af37]">✦</span>
    </div>
    <div className="h-[1px] w-20 md:w-36 bg-gradient-to-l from-transparent via-[#d4af37]/60 to-[#9f1239]/60" />
  </div>
);

export const CornerRoseOrnament: React.FC<{ position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' }> = ({
  position = 'top-right',
}) => {
  const posClasses = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0 -scale-x-100',
    'bottom-right': 'bottom-0 right-0 -scale-y-100',
    'bottom-left': 'bottom-0 left-0 -scale-x-100 -scale-y-100',
  };

  return (
    <div className={`absolute pointer-events-none opacity-25 z-0 ${posClasses[position]}`}>
      <svg width="72" height="72" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0C40 0 80 40 80 80V100H100V0H0Z" fill="url(#roseGoldGrad)" />
        <circle cx="85" cy="85" r="5" fill="#9f1239" />
        <circle cx="65" cy="65" r="3" fill="#d4af37" />
        <defs>
          <linearGradient id="roseGoldGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9f1239" />
            <stop offset="1" stopColor="#d4af37" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
