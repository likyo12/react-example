export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  image: string;
  category: 'bedding' | 'bath' | 'apparel' | 'table';
  badge?: string;
  badgeType?: 'new' | 'organic' | 'limited';
  colors: string[];
  sizes: string[];
  materials: string;
  care: string;
  rating: number;
  story: string;
}

export interface CartItem {
  id: string; // unique cart item row id (productId + color + size)
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
}

export interface WeavingStage {
  step: number;
  title: string;
  description: string;
  imageUrl: string;
}
