import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Unit, SiteSettings, UnitCategory, UnitStatus } from '../types';
import { INITIAL_SETTINGS, INITIAL_UNITS } from '../data/initialData';
import { translations, Language } from '../translations';

type TranslationKey = keyof typeof translations.ar;

export interface VideoModalState {
  isOpen: boolean;
  videoUrl: string;
  title?: string;
  subtitle?: string;
}

interface HospitalityContextType {
  units: Unit[];
  settings: SiteSettings;
  selectedCategory: UnitCategory | 'all';
  setSelectedCategory: (category: UnitCategory | 'all') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterAvailability: 'all' | 'available' | 'occupied';
  setFilterAvailability: (filter: 'all' | 'available' | 'occupied') => void;
  activeUnitId: string | null;
  setActiveUnitId: (id: string | null) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: (auth: boolean) => void;
  updateUnit: (unit: Unit) => void;
  toggleUnitStatus: (id: string, status: UnitStatus) => void;
  addUnit: (unit: Unit) => void;
  deleteUnit: (id: string) => void;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  resetToDefaults: () => void;
  getUnitById: (id: string) => Unit | undefined;
  // Video In-Site Modal
  videoModal: VideoModalState;
  openVideoModal: (videoUrl: string, title?: string, subtitle?: string) => void;
  closeVideoModal: () => void;
  // Language & Translation
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

const HospitalityContext = createContext<HospitalityContextType | undefined>(undefined);

// Persistent storage keys
const STORAGE_KEY_UNITS = 'dar_ward_persistent_units_v1';
const STORAGE_KEY_SETTINGS = 'dar_ward_persistent_settings_v1';
const LEGACY_STORAGE_KEY_UNITS = 'dar_ward_units_v2';
const LEGACY_STORAGE_KEY_SETTINGS = 'dar_ward_settings_v2';
const STORAGE_KEY_LANG = 'dar_ward_language';

export const HospitalityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Language state (persisted)
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const savedLang = localStorage.getItem(STORAGE_KEY_LANG);
      if (savedLang === 'en' || savedLang === 'ar') {
        return savedLang;
      }
    } catch {
      // ignore
    }
    return 'ar';
  });

  // Units state - NEVER resets unless user explicitly resets in admin panel
  const [units, setUnits] = useState<Unit[]>(() => {
    try {
      const saved =
        localStorage.getItem(STORAGE_KEY_UNITS) || localStorage.getItem(LEGACY_STORAGE_KEY_UNITS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading units from persistent storage:', e);
    }
    return INITIAL_UNITS;
  });

  // Settings state - NEVER resets unless user explicitly resets in admin panel
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved =
        localStorage.getItem(STORAGE_KEY_SETTINGS) ||
        localStorage.getItem(LEGACY_STORAGE_KEY_SETTINGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          const loc = { ...INITIAL_SETTINGS.location, ...(parsed.location || {}) };
          // If stored direct url is old dummy coordinate or empty, update to the actual google link
          if (!loc.googleMapsDirectUrl || loc.googleMapsDirectUrl.includes('24.4672,39.6111')) {
            loc.googleMapsDirectUrl = INITIAL_SETTINGS.location.googleMapsDirectUrl;
            loc.googleMapsEmbedUrl = INITIAL_SETTINGS.location.googleMapsEmbedUrl;
          }
          return {
            ...INITIAL_SETTINGS,
            ...parsed,
            whatsapp1: { ...INITIAL_SETTINGS.whatsapp1, ...(parsed.whatsapp1 || {}) },
            whatsapp2: { ...INITIAL_SETTINGS.whatsapp2, ...(parsed.whatsapp2 || {}) },
            location: loc,
          };
        }
      }
    } catch (e) {
      console.error('Error loading settings from persistent storage:', e);
    }
    return INITIAL_SETTINGS;
  });

  const [selectedCategory, setSelectedCategory] = useState<UnitCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAvailability, setFilterAvailability] = useState<'all' | 'available' | 'occupied'>('all');
  const [activeUnitId, setActiveUnitId] = useState<string | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Video In-Site Modal State
  const [videoModal, setVideoModal] = useState<VideoModalState>({
    isOpen: false,
    videoUrl: '',
    title: '',
    subtitle: '',
  });

  const openVideoModal = useCallback((videoUrl: string, title?: string, subtitle?: string) => {
    if (!videoUrl || !videoUrl.trim()) return;
    setVideoModal({
      isOpen: true,
      videoUrl: videoUrl.trim(),
      title: title || '',
      subtitle: subtitle || '',
    });
  }, []);

  const closeVideoModal = useCallback(() => {
    setVideoModal((prev) => ({ ...prev, isOpen: false }));
  }, []);

  // Sync language with HTML dir and lang attribute
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem(STORAGE_KEY_LANG, language);
    } catch {
      // ignore
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  // Translation helper
  const t = useCallback(
    (key: TranslationKey, params?: Record<string, string | number>): string => {
      const dict = translations[language] || translations.ar;
      let text = (dict as Record<string, string>)[key] || (translations.ar as Record<string, string>)[key] || key;
      if (params) {
        Object.entries(params).forEach(([paramKey, paramValue]) => {
          text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramValue));
        });
      }
      return text;
    },
    [language]
  );

  // Immediately persist units whenever changed
  useEffect(() => {
    try {
      const serialized = JSON.stringify(units);
      localStorage.setItem(STORAGE_KEY_UNITS, serialized);
      localStorage.setItem(LEGACY_STORAGE_KEY_UNITS, serialized);
    } catch (e) {
      console.error('Error saving units to persistent storage:', e);
    }
  }, [units]);

  // Immediately persist settings whenever changed
  useEffect(() => {
    try {
      const serialized = JSON.stringify(settings);
      localStorage.setItem(STORAGE_KEY_SETTINGS, serialized);
      localStorage.setItem(LEGACY_STORAGE_KEY_SETTINGS, serialized);
    } catch (e) {
      console.error('Error saving settings to persistent storage:', e);
    }
  }, [settings]);

  // Check URL hash and pathname on initial load and route changes
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash;
      const pathname = window.location.pathname;
      const searchParams = new URLSearchParams(window.location.search);

      // Check query parameter ?unit=X or ?id=unit-X
      const unitQuery = searchParams.get('unit') || searchParams.get('id');
      if (unitQuery) {
        const targetId = unitQuery.startsWith('unit-') ? unitQuery : `unit-${unitQuery}`;
        setActiveUnitId(targetId);
        return;
      }

      // Check pathname: /unit-1.html, /unit-1, /unit/1
      const pathMatch = pathname.match(/unit-?(\d+)(?:\.html)?/i);
      if (pathMatch && pathMatch[1]) {
        setActiveUnitId(`unit-${pathMatch[1]}`);
        return;
      }

      // Check hash: #unit-1, #unit-2, #unit1
      if (hash.startsWith('#unit-') || hash.startsWith('#unit')) {
        const id = hash.replace('#', '');
        setActiveUnitId(id);
      } else if (hash === '#admin') {
        setIsAdminOpen(true);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret Admin shortcut: Ctrl+Alt+A or Ctrl+Shift+A
      if ((e.ctrlKey || e.metaKey) && (e.altKey || e.shiftKey) && (e.key === 'a' || e.key === 'A' || e.key === 'ش')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };

    handleLocationChange();
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const updateUnit = (updatedUnit: Unit) => {
    setUnits((prev) => prev.map((u) => (u.id === updatedUnit.id ? updatedUnit : u)));
  };

  const toggleUnitStatus = (id: string, status: UnitStatus) => {
    setUnits((prev) => prev.map((u) => (u.id === id ? { ...u, status } : u)));
  };

  const addUnit = (newUnit: Unit) => {
    setUnits((prev) => [...prev, newUnit]);
  };

  const deleteUnit = (id: string) => {
    setUnits((prev) => prev.filter((u) => u.id !== id));
  };

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => ({
      ...prev,
      ...newSettings,
      whatsapp1: {
        ...prev.whatsapp1,
        ...(newSettings.whatsapp1 || {}),
      },
      whatsapp2: {
        ...prev.whatsapp2,
        ...(newSettings.whatsapp2 || {}),
      },
      location: {
        ...prev.location,
        ...(newSettings.location || {}),
      },
    }));
  };

  const resetToDefaults = () => {
    setUnits(INITIAL_UNITS);
    setSettings(INITIAL_SETTINGS);
    localStorage.removeItem(STORAGE_KEY_UNITS);
    localStorage.removeItem(STORAGE_KEY_SETTINGS);
    localStorage.removeItem(LEGACY_STORAGE_KEY_UNITS);
    localStorage.removeItem(LEGACY_STORAGE_KEY_SETTINGS);
  };

  const getUnitById = (id: string) => {
    return units.find((u) => u.id === id);
  };

  return (
    <HospitalityContext.Provider
      value={{
        units,
        settings,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        filterAvailability,
        setFilterAvailability,
        activeUnitId,
        setActiveUnitId,
        isAdminOpen,
        setIsAdminOpen,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        updateUnit,
        toggleUnitStatus,
        addUnit,
        deleteUnit,
        updateSettings,
        resetToDefaults,
        getUnitById,
        videoModal,
        openVideoModal,
        closeVideoModal,
        language,
        setLanguage,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </HospitalityContext.Provider>
  );
};

export const useHospitality = () => {
  const context = useContext(HospitalityContext);
  if (!context) {
    throw new Error('useHospitality must be used within a HospitalityProvider');
  }
  return context;
};
