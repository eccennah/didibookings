export interface Salon {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  pricePerHour: number;
  image: string;
  amenities: string[];
  availableToday: boolean;
  nextAvailable?: string;
  description: string;
}

export const sampleSalons: Salon[] = [
  {
    id: '1',
    name: 'Luxe Beauty Studio',
    location: 'Downtown Los Angeles, CA',
    rating: 4.9,
    reviewCount: 127,
    pricePerHour: 45,
    image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600',
    amenities: ['WiFi', 'Parking', 'Coffee', 'Styling Tools', 'Color Station'],
    availableToday: true,
    description: 'Modern salon studio with high-end equipment and natural lighting. Perfect for hair styling and color services.',
  },
  {
    id: '2',
    name: 'Chic Hair Lounge',
    location: 'Beverly Hills, CA',
    rating: 4.8,
    reviewCount: 89,
    pricePerHour: 65,
    image: 'https://images.pexels.com/photos/3993436/pexels-photo-3993436.jpeg?auto=compress&cs=tinysrgb&w=600',
    amenities: ['WiFi', 'Valet Parking', 'Coffee', 'Styling Tools', 'Wash Basin'],
    availableToday: false,
    nextAvailable: 'Tomorrow',
    description: 'Upscale salon space in the heart of Beverly Hills with premium amenities and luxury finishes.',
  },
  {
    id: '3',
    name: 'Urban Glow Studio',
    location: 'West Hollywood, CA',
    rating: 4.7,
    reviewCount: 156,
    pricePerHour: 38,
    image: 'https://images.pexels.com/photos/3993441/pexels-photo-3993441.jpeg?auto=compress&cs=tinysrgb&w=600',
    amenities: ['WiFi', 'Parking', 'Music System', 'Styling Tools', 'Reception Area'],
    availableToday: true,
    description: 'Trendy studio space with industrial chic design and state-of-the-art sound system.',
  },
  {
    id: '4',
    name: 'Serenity Spa Suite',
    location: 'Santa Monica, CA',
    rating: 4.9,
    reviewCount: 203,
    pricePerHour: 55,
    image: 'https://images.pexels.com/photos/3993456/pexels-photo-3993456.jpeg?auto=compress&cs=tinysrgb&w=600',
    amenities: ['WiFi', 'Beach Parking', 'Coffee', 'Air Conditioning', 'Color Station'],
    availableToday: true,
    description: 'Peaceful spa-like environment just minutes from the beach, ideal for relaxing treatments.',
  },
  {
    id: '5',
    name: 'Metropolitan Hair Co.',
    location: 'Century City, CA',
    rating: 4.6,
    reviewCount: 94,
    pricePerHour: 50,
    image: 'https://images.pexels.com/photos/3993458/pexels-photo-3993458.jpeg?auto=compress&cs=tinysrgb&w=600',
    amenities: ['WiFi', 'Valet Parking', 'Coffee', 'Styling Tools', 'Wash Basin', 'Music System'],
    availableToday: false,
    nextAvailable: 'Fri',
    description: 'Professional salon space in a high-rise building with panoramic city views.',
  },
  {
    id: '6',
    name: 'Artisan Beauty Bar',
    location: 'Pasadena, CA',
    rating: 4.8,
    reviewCount: 145,
    pricePerHour: 42,
    image: 'https://images.pexels.com/photos/3993452/pexels-photo-3993452.jpeg?auto=compress&cs=tinysrgb&w=600',
    amenities: ['WiFi', 'Free Parking', 'Coffee', 'Styling Tools', 'Color Station', 'Reception Area'],
    availableToday: true,
    description: 'Boutique salon with artistic flair and vintage-inspired decor, perfect for creative styling.',
  },
];