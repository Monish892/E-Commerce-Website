import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface CartSidebarProps {
  onNavigate: (page: string) => void;
}

export default function CartSidebar({ onNavigate }: CartSidebarProps) {
  const { cart, isCartOpen, setIsCartOpen, updateCartQuantity, removeFromCart, cartTotal } = useApp();

  if (!isCartOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Shopping Cart ({cart.length})</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <ShoppingBag className="w-20 h-20 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-6">Add some products to get started!</p>
            <button
              onClick={() => {
                setIsCartOpen(false);
                onNavigate('products');
              }}
              className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex space-x-4 border-b border-gray-200 pb-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      ${item.product.price.toFixed(2)}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 rounded transition"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded transition"
                          disabled={item.quantity >= item.product.stockQuantity}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 p-6 space-y-4 bg-gray-50">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onNavigate('checkout');
                }}
                className="w-full py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition font-semibold"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onNavigate('products');
                }}
                className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition font-semibold"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
