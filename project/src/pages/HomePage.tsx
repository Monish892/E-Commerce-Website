import { ShoppingBag, Star, TrendingUp, Shield, Truck, Headphones as HeadphonesIcon } from 'lucide-react';
import { categories, products } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

interface HomePageProps {
  onNavigate: (page: string, params?: any) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { addToCart, addToWishlist, isInWishlist } = useApp();

  const featuredProducts = products.filter(p => p.compareAtPrice).slice(0, 4);
  const bestSellers = products.filter(p => p.reviewCount > 80).slice(0, 4);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleToggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      return;
    }
    addToWishlist(product);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Discover Amazing Products at Unbeatable Prices
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Shop from thousands of products across electronics, fashion, home goods, and more. Free shipping on orders over $50.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('products')}
                className="px-8 py-4 bg-white text-slate-900 rounded-lg hover:bg-gray-100 transition font-semibold text-lg"
              >
                Shop Now
              </button>
              <button
                onClick={() => onNavigate('products')}
                className="px-8 py-4 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition font-semibold text-lg"
              >
                View Deals
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
            <div className="p-3 bg-slate-100 rounded-lg">
              <Truck className="w-6 h-6 text-slate-800" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Free Shipping</h3>
              <p className="text-sm text-gray-600">On orders over $50</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
            <div className="p-3 bg-slate-100 rounded-lg">
              <Shield className="w-6 h-6 text-slate-800" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Secure Payment</h3>
              <p className="text-sm text-gray-600">100% secure transactions</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
            <div className="p-3 bg-slate-100 rounded-lg">
              <HeadphonesIcon className="w-6 h-6 text-slate-800" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">24/7 Support</h3>
              <p className="text-sm text-gray-600">Always here to help</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => onNavigate('products', { categoryId: category.id })}
              className="group relative overflow-hidden rounded-xl aspect-square bg-white shadow-sm hover:shadow-lg transition"
            >
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                <h3 className="text-white font-semibold text-sm md:text-base">{category.name}</h3>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Deals</h2>
              <p className="text-gray-600">Limited time offers on selected items</p>
            </div>
            <button
              onClick={() => onNavigate('products')}
              className="text-slate-800 font-semibold hover:text-slate-600 transition"
            >
              View All →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <div
                key={product.id}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden border border-gray-200"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  {product.compareAtPrice && (
                    <div className="absolute top-3 left-3 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Save {Math.round((1 - product.price / product.compareAtPrice) * 100)}%
                    </div>
                  )}
                  <button
                    onClick={() => onNavigate('product', { productId: product.id })}
                    className="w-full h-full"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                  </button>
                </div>

                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
                  <button
                    onClick={() => onNavigate('product', { productId: product.id })}
                    className="text-left"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-slate-600 transition">
                      {product.name}
                    </h3>
                  </button>

                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-900 ml-1">
                        {product.averageRating.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">({product.reviewCount})</span>
                  </div>

                  <div className="flex items-baseline space-x-2 mb-3">
                    <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    {product.compareAtPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.compareAtPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full py-2.5 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition font-semibold flex items-center justify-center space-x-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-8 h-8 text-slate-800" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Bestsellers</h2>
              <p className="text-gray-600">Most popular products</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('products')}
            className="text-slate-800 font-semibold hover:text-slate-600 transition"
          >
            View All →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map(product => (
            <div
              key={product.id}
              className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden border border-gray-200"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <button
                  onClick={() => onNavigate('product', { productId: product.id })}
                  className="w-full h-full"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                </button>
              </div>

              <div className="p-4">
                <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
                <button
                  onClick={() => onNavigate('product', { productId: product.id })}
                  className="text-left"
                >
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-slate-600 transition">
                    {product.name}
                  </h3>
                </button>

                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900 ml-1">
                      {product.averageRating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">({product.reviewCount})</span>
                </div>

                <div className="flex items-baseline space-x-2 mb-3">
                  <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full py-2.5 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition font-semibold flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Get exclusive deals, new product launches, and shopping tips delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-white text-slate-900 rounded-lg hover:bg-gray-100 transition font-semibold"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
