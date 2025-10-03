import { useState, useEffect } from 'react';
import { CreditCard, MapPin, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Address, Order, OrderItem } from '../types';

interface CheckoutPageProps {
  onNavigate: (page: string) => void;
}

export default function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const { user, cart, cartTotal, clearCart, addOrder, setIsAuthModalOpen } = useApp();
  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const [shippingAddress, setShippingAddress] = useState<Partial<Address>>({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States'
  });
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-xl shadow-sm max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h2>
          <p className="text-gray-600 mb-6">Please sign in to continue with checkout</p>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="w-full py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition font-semibold"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <button
            onClick={() => onNavigate('products')}
            className="text-slate-800 font-semibold hover:text-slate-600"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const tax = cartTotal * 0.08;
  const shippingCost = cartTotal >= 50 ? 0 : 9.99;
  const total = cartTotal + tax + shippingCost;

  // Place order function
  const placeOrder = (paymentId?: string) => {
    const orderItems: OrderItem[] = cart.map(item => ({
      id: `item-${Date.now()}-${item.product.id}`,
      orderId: '',
      productId: item.product.id,
      productName: item.product.name,
      productImage: item.product.images[0],
      quantity: item.quantity,
      unitPrice: item.product.price,
      totalPrice: item.product.price * item.quantity
    }));

    const order: Order = {
      id: `order-${Date.now()}`,
      userId: user.id,
      orderNumber: `ORD-${Date.now()}`,
      status: 'pending',
      subtotal: cartTotal,
      tax,
      shippingCost,
      total,
      shippingAddress: shippingAddress as Address,
      billingAddress: shippingAddress as Address,
      items: orderItems,
      paymentMethod,
      paymentStatus: paymentMethod === 'razorpay' ? (paymentId ? 'completed' : 'failed') : 'completed',
      createdAt: new Date().toISOString(),
      razorpayPaymentId: paymentId || undefined,
    };

    addOrder(order);
    clearCart();
    onNavigate('account');
  };

  // Razorpay payment handler
  const handlePlaceOrder = () => {
    if (paymentMethod === 'razorpay') {
      const options = {
        key: 'rzp_test_ROsJT9vvDeFiIz', // Replace with your Razorpay key
        amount: Math.round(total * 100), // Amount in paise
        currency: 'INR',
        name: 'E-Commerce Website',
        description: 'Order Payment',
        handler: function (response: any) {
          placeOrder(response.razorpay_payment_id);
        },
        prefill: {
          name: shippingAddress.fullName,
          email: user.email,
          contact: shippingAddress.phone,
        },
        theme: {
          color: '#6366f1',
        },
      };
      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      placeOrder();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 'shipping' ? 'bg-slate-800 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  1
                </div>
                <h2 className="text-xl font-bold text-gray-900">Shipping Address</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={shippingAddress.fullName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={shippingAddress.phone}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 1</label>
                  <input
                    type="text"
                    value={shippingAddress.addressLine1}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine1: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 2 (Optional)</label>
                  <input
                    type="text"
                    value={shippingAddress.addressLine2}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine2: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <input
                    type="text"
                    value={shippingAddress.state}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                  <input
                    type="text"
                    value={shippingAddress.postalCode}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <input
                    type="text"
                    value={shippingAddress.country}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    required
                  />
                </div>
              </div>

              {step === 'shipping' && (
                <button
                  onClick={() => setStep('payment')}
                  className="mt-6 w-full py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition font-semibold"
                  disabled={!shippingAddress.fullName || !shippingAddress.addressLine1 || !shippingAddress.city}
                >
                  Continue to Payment
                </button>
              )}
            </div>

            {(step === 'payment' || step === 'review') && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === 'payment' || step === 'review' ? 'bg-slate-800 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    2
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`w-full p-4 border-2 rounded-lg flex items-center space-x-3 transition ${
                      paymentMethod === 'card' ? 'border-slate-800 bg-slate-50' : 'border-gray-200'
                    }`}
                  >
                    <CreditCard className="w-6 h-6" />
                    <span className="font-medium">Credit/Debit Card</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('razorpay')}
                    className={`w-full p-4 border-2 rounded-lg flex items-center space-x-3 transition ${
                      paymentMethod === 'razorpay' ? 'border-slate-800 bg-slate-50' : 'border-gray-200'
                    }`}
                  >
                    <MapPin className="w-6 h-6" />
                    <span className="font-medium">Razorpay</span>
                  </button>
                </div>

                {step === 'payment' && (
                  <button
                    onClick={() => setStep('review')}
                    className="mt-6 w-full py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition font-semibold"
                  >
                    Review Order
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                {cart.map(item => (
                  <div key={item.id} className="flex space-x-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">{item.product.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {step === 'review' && (
                <button
                  onClick={handlePlaceOrder}
                  className="mt-6 w-full py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition font-semibold"
                >
                  Place Order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}