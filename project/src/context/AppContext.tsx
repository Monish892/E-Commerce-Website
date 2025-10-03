import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, CartItem, Product, WishlistItem, Order } from '../types';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemsCount: number;
  wishlist: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  orders: Order[];
  addOrder: (order: Order) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }

    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }

    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.product.id === product.id);

      if (existingItem) {
        return currentCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...currentCart, {
        id: `cart-${Date.now()}`,
        userId: user?.id || 'guest',
        product,
        quantity
      }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(currentCart => currentCart.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(currentCart =>
      currentCart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((count, item) => count + item.quantity, 0);

  const addToWishlist = (product: Product) => {
    if (!isInWishlist(product.id)) {
      setWishlist(current => [...current, {
        id: `wish-${Date.now()}`,
        userId: user?.id || 'guest',
        product
      }]);
    }
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(current => current.filter(item => item.product.id !== productId));
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.product.id === productId);
  };

  const addOrder = (order: Order) => {
    setOrders(current => [order, ...current]);
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      cartTotal,
      cartItemsCount,
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      orders,
      addOrder,
      isCartOpen,
      setIsCartOpen,
      isAuthModalOpen,
      setIsAuthModalOpen,
      searchQuery,
      setSearchQuery
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
