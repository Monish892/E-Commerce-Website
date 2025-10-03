import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import CartSidebar from './components/CartSidebar';
import AuthModal from './components/AuthModal';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import WishlistPage from './pages/WishlistPage';
import AccountPage from './pages/AccountPage';

type Page = 'home' | 'products' | 'product' | 'checkout' | 'wishlist' | 'account';

interface NavigationState {
  page: Page;
  params?: any;
}

function App() {
  const [navigation, setNavigation] = useState<NavigationState>({ page: 'home' });

  const handleNavigate = (page: string, params?: any) => {
    setNavigation({ page: page as Page, params });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (navigation.page) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'products':
        return <ProductsPage onNavigate={handleNavigate} categoryId={navigation.params?.categoryId} />;
      case 'product':
        return <ProductDetailPage productId={navigation.params?.productId} onNavigate={handleNavigate} />;
      case 'checkout':
        return <CheckoutPage onNavigate={handleNavigate} />;
      case 'wishlist':
        return <WishlistPage onNavigate={handleNavigate} />;
      case 'account':
        return <AccountPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Header onNavigate={handleNavigate} currentPage={navigation.page} />
        <main>{renderPage()}</main>
        <CartSidebar onNavigate={handleNavigate} />
        <AuthModal />

        <footer className="bg-slate-900 text-white py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">ShopHub</h3>
                <p className="text-gray-400 text-sm">
                  Your one-stop destination for quality products at unbeatable prices.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Shop</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <button onClick={() => handleNavigate('products')} className="text-gray-400 hover:text-white transition">
                      All Products
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleNavigate('products')} className="text-gray-400 hover:text-white transition">
                      Best Sellers
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleNavigate('products')} className="text-gray-400 hover:text-white transition">
                      New Arrivals
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Customer Service</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Contact Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Shipping Info</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Returns</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">FAQ</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">About</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Our Story</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>&copy; 2025 ShopHub. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </AppProvider>
  );
}

export default App;
