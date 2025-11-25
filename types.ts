export interface Room {
  id: string;
  title: string;
  price: number;
  location: string;
  size: number;
  bedrooms: number;
  bathrooms: number;
  available: boolean;
  image: string;
  gallery: string[];
  amenities: string[];
  description: string;
  type: 'Studio' | '1 Ngủ' | '2 Ngủ' | 'Duplex';
  rating: number;
  coordinates: { lat: number; lng: number };
  nearby?: {
    shopping: string;
    universities: string;
    transportation: string;
  };
  host?: {
    name: string;
    avatar: string;
    phone: string;
    zalo: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  content: string; // Added content field
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface FilterState {
  keyword: string;
  minPrice: number;
  maxPrice: number;
  location: string;
  type: string;
}