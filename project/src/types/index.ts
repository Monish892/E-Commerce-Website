export interface User {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
  phone?: string;
}

export interface Address {
  id: string;
  userId: string;
  type: 'shipping' | 'billing';
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  parentId?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  categoryId: string;
  brand: string;
  sku: string;
  stockQuantity: number;
  images: string[];
  specifications: Record<string, string>;
  isActive: boolean;
  averageRating: number;
  reviewCount: number;
}

export interface CartItem {
  id: string;
  userId: string;
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  subtotal: number;
  tax: number;
  shippingCost: number;
  total: number;
  shippingAddress: Address;
  billingAddress: Address;
  items: OrderItem[];
  paymentMethod?: string;
  paymentStatus: string;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title?: string;
  comment?: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  createdAt: string;
}

export interface WishlistItem {
  id: string;
  userId: string;
  product: Product;
}
