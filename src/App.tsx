/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HospitalityProvider, useHospitality } from './context/HospitalityContext';
import { Header } from './components/Header';
import { HeroCover } from './components/HeroCover';
import { SearchAndUnits } from './components/SearchAndUnits';
import { BookingPlatforms } from './components/BookingPlatforms';
import { LocationSection } from './components/LocationSection';
import { VisitorCounter } from './components/VisitorCounter';
import { WhatsAppContact, FloatingWhatsAppWidget } from './components/WhatsAppContact';
import { VideoShowcase } from './components/VideoShowcase';
import { VideoModal } from './components/VideoModal';
import { Footer } from './components/Footer';
import { UnitDetailPage } from './components/UnitDetailPage';
import { AdminDatabaseModal } from './components/AdminDatabaseModal';

const HospitalityApp: React.FC = () => {
  const { activeUnitId, setActiveUnitId, getUnitById } = useHospitality();
  const activeUnit = activeUnitId ? getUnitById(activeUnitId) : null;

  const handleBackToAllUnits = () => {
    setActiveUnitId(null);
    window.location.hash = '';
    const unitsEl = document.getElementById('units');
    if (unitsEl) unitsEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf7f4] text-[#2c1810] selection:bg-[#9f1239] selection:text-white w-full max-w-full overflow-x-hidden">
      {/* Sticky Luxury Header with Quran Radio & Language Switcher */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-grow w-full max-w-full overflow-x-hidden">
        {activeUnit ? (
          /* Dedicated Unit Page with full images, description, amenities & direct WhatsApp booking */
          <UnitDetailPage unit={activeUnit} onBack={handleBackToAllUnits} />
        ) : (
          <>
            {/* Hero Cover Image & Quick CTA */}
            <HeroCover />

            {/* Units Showcase, Filter by Category, and Availability Status */}
            <SearchAndUnits />

            {/* In-Site Video Tour Showcase */}
            <VideoShowcase />

            {/* Booking.com and Airbnb External Booking Badges */}
            <BookingPlatforms />

            {/* Madinah Location & Map Directions */}
            <LocationSection />

            {/* Real-time Visitor Counter (Starts from 1,000+) */}
            <VisitorCounter />

            {/* Two WhatsApp Numbers Direct Contact Section */}
            <WhatsAppContact />
          </>
        )}
      </main>

      {/* Luxury Footer with Facebook and TikTok Links */}
      <Footer />

      {/* In-Site Cinema Video Modal */}
      <VideoModal />

      {/* Floating 2-Number WhatsApp Widget */}
      <FloatingWhatsAppWidget />

      {/* Protected Admin Database Control Panel */}
      <AdminDatabaseModal />
    </div>
  );
};

export default function App() {
  return (
    <HospitalityProvider>
      <HospitalityApp />
    </HospitalityProvider>
  );
}
