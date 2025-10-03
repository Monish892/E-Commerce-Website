import { Package, User as UserIcon, LogOut, Heart, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useState } from 'react';

interface AccountPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export default function AccountPage({ onNavigate }: AccountPageProps) {
  const { user, setUser, orders, wishlist, cart } = useApp();
  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to view your account</h2>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    setUser(null);
    onNavigate('home');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-slate-800">
                  {user.fullName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user.fullName}</h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-slate-800" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                <p className="text-sm text-gray-600">Total Orders</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-slate-800" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{wishlist.length}</p>
                <p className="text-sm text-gray-600">Wishlist Items</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-slate-800" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{cart.length}</p>
                <p className="text-sm text-gray-600">Cart Items</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex-1 px-6 py-4 text-center font-semibold transition ${
                  activeTab === 'orders'
                    ? 'text-slate-800 border-b-2 border-slate-800'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                My Orders
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 px-6 py-4 text-center font-semibold transition ${
                  activeTab === 'profile'
                    ? 'text-slate-800 border-b-2 border-slate-800'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Profile
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'orders' ? (
              <div className="space-y-6">
                {orders.length > 0 ? (
                  orders.map(order => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Order #{order.orderNumber}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                            order.status === 'delivered'
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'shipped'
                              ? 'bg-blue-100 text-blue-800'
                              : order.status === 'processing'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                          <p className="text-lg font-bold text-gray-900 mt-2">${order.total.toFixed(2)}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {order.items.map(item => (
                          <div key={item.id} className="flex items-center space-x-4">
                            <img
                              src={item.productImage}
                              alt={item.productName}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{item.productName}</p>
                              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                            </div>
                            <p className="font-semibold text-gray-900">${item.totalPrice.toFixed(2)}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600 mb-1">Shipping Address:</p>
                        <p className="text-sm text-gray-900">
                          {order.shippingAddress.fullName}, {order.shippingAddress.addressLine1},{' '}
                          {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                          {order.shippingAddress.postalCode}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">You haven't placed any orders yet</p>
                    <button
                      onClick={() => onNavigate('products')}
                      className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition font-semibold"
                    >
                      Start Shopping
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="max-w-2xl">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={user.fullName}
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={user.email}
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>

                  {user.phone && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={user.phone}
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
