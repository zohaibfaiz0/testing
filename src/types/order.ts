export interface Product {
  _key?: string; // Optional when creating, present when reading
  productId: string;
  quantity: number;
  price: number;
}
export interface Order {
  username: string;
  email: string;
  address: string;
  products: Product[];
  deliveryOption: 'standard' | 'express' | 'nextDay';
  paymentMethod: 'card' | 'cash';
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  paymentIntentId?: string; // Add this line
}