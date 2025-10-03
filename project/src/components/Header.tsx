import { ShoppingCart, Heart, User, Search, Menu, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useState } from 'react';
import { categories } from '../data/mockData';

interface HeaderProps {
  onNavigate: (page: string, params?: any) => void;
  currentPage: string;
}

export default function Header({ onNavigate, currentPage }: HeaderProps) {
  const { user, cartItemsCount, wishlist, setIsCartOpen, setIsAuthModalOpen, searchQuery, setSearchQuery } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearchQuery);
    onNavigate('products');
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="bg-slate-800 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <p>Free shipping on orders over $50</p>
            <p>24/7 Customer Support</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className="text-2xl font-bold text-slate-800 hover:text-slate-600 transition"
            >
              ShopHub
            </button>

            <nav className="hidden lg:flex space-x-6">
              {categories.slice(0, 6).map(category => (
                <button
                  key={category.id}
                  onClick={() => onNavigate('products', { categoryId: category.id })}
                  className="text-gray-700 hover:text-slate-800 font-medium transition"
                >
                  {category.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </form>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <button
                onClick={() => onNavigate('account')}
                className={`hidden sm:flex items-center space-x-1 px-3 py-2 rounded-lg transition ${
                  currentPage === 'account' ? 'bg-slate-100 text-slate-800' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <User className="w-5 h-5" />
                <span className="text-sm font-medium">{user.fullName.split(' ')[0]}</span>
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="hidden sm:flex items-center space-x-1 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <User className="w-5 h-5" />
                <span className="text-sm font-medium">Sign In</span>
              </button>
            )}

            <button
              onClick={() => onNavigate('wishlist')}
              className={`relative p-2 rounded-lg transition ${
                currentPage === 'wishlist' ? 'bg-slate-100 text-slate-800' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-slate-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-200 mt-2 pt-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </form>

            <nav className="space-y-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => {
                    onNavigate('products', { categoryId: category.id });
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                >
                  {category.name}
                </button>
              ))}

              {!user && (
                <button
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                >
                  Sign In
                </button>
              )}

              {user && (
                <button
                  onClick={() => {
                    onNavigate('account');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                >
                  My Account
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
