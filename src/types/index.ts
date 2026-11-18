export interface MenuItem {
  id: number;
  name: string;
  category: 'Burgers' | 'Pizza' | 'Sushi' | 'National' | 'Desserts' | 'Drinks';
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  time: string;
  calories: string;
  image: string;
  description: string;
  badge: string;
  spicyLevel: 0 | 1 | 2 | 3;
  isHalal: boolean;
  isVegetarian: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface TableBooking {
  id: string;
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  zone: 'Main Hall' | 'VIP Lounge' | 'Open Terrace';
  notes?: string;
  status: 'Confirmed' | 'Pending';
}

export interface UserReview {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  dishName: string;
}

export interface PastOrder {
  id: string;
  date: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  paymentMethod: string;
  status: 'Delivered' | 'In Progress';
}
