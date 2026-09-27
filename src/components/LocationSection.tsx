import React from 'react';
import { useHospitality } from '../context/HospitalityContext';
import { RoseIcon, RoseDivider, CornerRoseOrnament } from './RoseDecorations';
import { MapPin, Navigation, Car, Clock, ExternalLink, Compass } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const { settings, t, language } = useHospitality();

  return (
    <section id="location" className="py-20 bg-[#fdfbf7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-100 text-[#9f1239] text-xs font-bold border border-rose-200 mb-3 shadow-sm">
            <Compass className="w-3.5 h-3.5" />
            <span>{t('locationBadge')}</span>
          </div>

          <h2 className="font-['Amiri',serif] text-3xl sm:text-5xl font-bold text-[#881337] mb-3">
            {t('locationTitle')}
          </h2>

          <p className="text-base sm:text-lg text-[#5c4033] leading-relaxed">
            {t('locationDescription')}
          </p>

          <RoseDivider className="my-6" />
        </div>

        {/* Main Grid: Map Embed + Landmarks Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Map Frame (7 cols on lg) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-3 sm:p-4 shadow-xl border-2 border-rose-100 flex flex-col justify-between">
            <div className="relative w-full h-[380px] sm:h-[450px] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
              <iframe
                src={settings.location.googleMapsEmbedUrl}
                title="Dar Ward Hospitality Location in Madinah"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div className="pt-4 px-2 flex flex-wrap items-center justify-between gap-3 text-xs text-[#5c4033]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#9f1239]" />
                <span className="font-medium">{settings.location.address}</span>
              </div>
              <a
                href={settings.location.googleMapsDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#881337] hover:bg-[#9f1239] text-white font-bold transition-all shadow-sm"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{t('openInGoogleMaps')}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Landmarks & Proximity Card (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl border border-rose-100 flex-1 flex flex-col justify-between relative overflow-hidden">
              <CornerRoseOrnament position="top-left" />

              <div>
                <h3 className="font-['Amiri',serif] text-xl font-bold text-[#881337] mb-2 flex items-center gap-2">
                  <RoseIcon className="w-5 h-5 text-[#be123c]" />
                  <span>{t('landmarksTitle')}</span>
                </h3>

                <p className="text-xs text-gray-500 mb-6">
                  {t('landmarksSub')}
                </p>

                <div className="space-y-3.5">
                  {settings.location.landmarks.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-[#faf7f4] hover:bg-rose-50/70 border border-rose-100/70 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#9f1239]" />
                        <span className="text-xs sm:text-sm font-bold text-[#2c1810]">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-100 text-[#881337]">
                        {item.distance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Parking & Directions Notice */}
              <div className="mt-6 pt-4 border-t border-rose-100 grid grid-cols-2 gap-3 text-xs text-[#5c4033]">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50">
                  <Car className="w-4 h-4 text-[#9f1239]" />
                  <span>{t('shadedParking')}</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50">
                  <Clock className="w-4 h-4 text-[#9f1239]" />
                  <span>{t('reception24h')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
