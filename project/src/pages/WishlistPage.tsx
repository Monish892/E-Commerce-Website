import { Heart, ShoppingBag, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface WishlistPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export default function WishlistPage({ onNavigate }: WishlistPageProps) {
  const { wishlist, removeFromWishlist, addToCart } = useApp();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">Save your favorite items for later!</p>
          <button
            onClick={() => onNavigate('products')}
            className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
            <p className="text-gray-600">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map(item => (
            <div
              key={item.id}
              className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden border border-gray-200"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <button
                  onClick={() => removeFromWishlist(item.product.id)}
                  className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition"
                >
                  <X className="w-4 h-4 text-gray-600 hover:text-red-600" />
                </button>

                <button
                  onClick={() => onNavigate('product', { productId: item.product.id })}
                  className="w-full h-full"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                </button>
              </div>

              <div className="p-4">
                <p className="text-sm text-gray-600 mb-1">{item.product.brand}</p>
                <button
                  onClick={() => onNavigate('product', { productId: item.product.id })}
                  className="text-left"
                >
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-slate-600 transition">
                    {item.product.name}
                  </h3>
                </button>

                <div className="flex items-baseline space-x-2 mb-3">
                  <span className="text-xl font-bold text-gray-900">${item.product.price.toFixed(2)}</span>
                  {item.product.compareAtPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${item.product.compareAtPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => {
                    addToCart(item.product);
                    removeFromWishlist(item.product.id);
                  }}
                  className="w-full py-2.5 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition font-semibold flex items-center justify-center space-x-2"
                  disabled={item.product.stockQuantity === 0}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{item.product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
