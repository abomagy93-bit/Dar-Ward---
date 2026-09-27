export type UnitCategory = 'one-bedroom' | 'two-bedrooms' | 'three-bedrooms' | 'villa';

export type UnitStatus = 'available' | 'occupied' | 'maintenance';

export interface Unit {
  id: string;
  unitNumber: number;
  category: UnitCategory;
  title: string;
  subtitle?: string;
  description: string;
  status: UnitStatus;
  pricePerNight: number;
  currency: string;
  capacityGuests: number;
  bedroomsCount: number;
  bathroomsCount: number;
  areaSquareMeters: number;
  images: string[];
  featuredImage: string;
  amenities: string[];
  floor?: string;
  viewDescription?: string;
  tiktokVideoUrl?: string;
  bookingUrl?: string;
  airbnbUrl?: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  city: string;
  coverImageUrl: string;
  youtubeUrl: string; // YouTube video URL or ID
  whatsapp1: {
    number: string;
    label: string;
    description: string;
    defaultMessage: string;
  };
  whatsapp2: {
    number: string;
    label: string;
    description: string;
    defaultMessage: string;
  };
  bookingUrl: string;
  airbnbUrl: string;
  facebookUrl?: string;
  tiktokUrl?: string;
  location: {
    address: string;
    googleMapsEmbedUrl: string;
    googleMapsDirectUrl: string;
    landmarks: {
      name: string;
      distance: string;
    }[];
  };
}
