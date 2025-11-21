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
  const [loading, setLoading] = useState(false);

  const [razorpayReady, setRazorpayReady] = useState(false);
  const [scriptLoading, setScriptLoading] = useState(false);
  const [scriptError, setScriptError] = useState<string | null>(null);
  const [probeInfo, setProbeInfo] = useState<string | null>(null);

  // new: allow explicit simulated payments during dev when gateway is unreachable
  const [simulatePayments, setSimulatePayments] = useState(false);

  const razorpaySrc = 'https://checkout.razorpay.com/v1/checkout.js';

  // probe a URL to provide quick diagnostic (best-effort)
  const probeUrl = async (url: string, timeout = 5000) => {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);
      // use no-cors to avoid CORS rejections — success means network reachable
      await fetch(url, { method: 'GET', mode: 'no-cors', signal: controller.signal });
      clearTimeout(id);
      return { ok: true, msg: 'reachable (no-cors fetch succeeded)' };
    } catch (err: any) {
      const msg = err?.name === 'AbortError' ? 'timeout' : (err?.message || String(err));
      return { ok: false, msg };
    }
  };

  // Robust external script loader: accepts single src or array of candidate srcs
  const loadExternalScript = (srcs: string | string[], timeout = 15000, retries = 3): Promise<boolean> => {
    const candidates = Array.isArray(srcs) ? srcs : [srcs];

    const tryLoad = (src: string, attempt = 0): Promise<boolean> => {
      return new Promise(resolve => {
        if ((window as any).Razorpay) return resolve(true);

        const selector = `script[src="${src}"]`;
        const existing = document.querySelector(selector) as HTMLScriptElement | null;
        if (existing) {
          if ((window as any).Razorpay) return resolve(true);
          const onLoad = () => { cleanup(); resolve(!!(window as any).Razorpay); };
          const onError = () => { cleanup(); resolve(false); };
          function cleanup() {
            existing.removeEventListener('load', onLoad);
            existing.removeEventListener('error', onError);
          }
          existing.addEventListener('load', onLoad);
          existing.addEventListener('error', onError);
          setTimeout(() => resolve(!!(window as any).Razorpay), timeout);
          return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.defer = true;
        let done = false;

        const onLoad = () => {
          if (done) return;
          done = true;
          setTimeout(() => resolve(!!(window as any).Razorpay), 50);
        };

        const onError = (ev?: any) => {
          if (done) return;
          done = true;
          script.remove();
          if (attempt < retries) {
            const backoff = Math.min(2000 * Math.pow(2, attempt), 10000);
            setTimeout(() => tryLoad(src, attempt + 1).then(resolve), backoff);
          } else {
            resolve(false);
          }
        };

        script.addEventListener('load', onLoad);
        script.addEventListener('error', onError);
        document.head.appendChild(script);

        setTimeout(() => {
          if (!done) onError(new Error('timeout'));
        }, timeout);
      });
    };

    return new Promise(async resolve => {
      for (const src of candidates) {
        if (!navigator.onLine) {
          console.warn('Navigator is offline; script load may fail.');
        }
        // eslint-disable-next-line no-await-in-loop
        const ok = await tryLoad(src);
        if (ok) return resolve(true);
      }
      resolve(false);
    });
  };

  // load script with status handling and probe diagnostics
  const loadRazorpayScript = async () => {
    setScriptError(null);
    setProbeInfo(null);
    setScriptLoading(true);
    try {
      // quick probe to provide better error details to developer
      const probe = await probeUrl(razorpaySrc, 6000);
      setProbeInfo(`probe: ${probe.ok ? 'OK' : 'FAIL'} (${probe.msg}) navigator.onLine=${navigator.onLine}`);
      // try main host + cdn fallback
      const ok = await loadExternalScript(
        [razorpaySrc, 'https://cdn.razorpay.com/v1/checkout.js'],
        20000,
        3
      );
      setRazorpayReady(ok);
      if (!ok) {
        setScriptError(
          `Unable to load payment gateway script. Possible causes: network timeout, adblock/CSP or corporate proxy. ${probe.ok ? '' : 'Probe indicated: ' + probe.msg}.`
        );
        console.error('Razorpay script failed to load. Check DevTools Network/CSP/adblock.', { probe });
      } else {
        setScriptError(null);
      }
    } catch (e) {
      setRazorpayReady(false);
      setScriptError('Unexpected error while loading payment gateway.');
      console.error('Razorpay loader error:', e);
    } finally {
      setScriptLoading(false);
    }
  };

  useEffect(() => {
    loadRazorpayScript();
    // keep script in DOM; no cleanup removal
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Place order function (local app state)
  const placeOrder = (paymentId?: string, methodOverride?: string) => {
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

    const pm = methodOverride || paymentMethod;
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
      paymentMethod: pm,
      paymentStatus: pm === 'razorpay' ? (paymentId ? 'completed' : 'failed') : 'completed',
      createdAt: new Date().toISOString(),
      razorpayPaymentId: paymentId || undefined,
    };

    addOrder(order);
    clearCart();
    onNavigate('account');
  };

  // Helper: wait for Razorpay global (short)
  const waitForRazorpay = async (timeout = 5000) => {
    const start = Date.now();
    while (!(window as any).Razorpay) {
      if (Date.now() - start > timeout) return false;
      // eslint-disable-next-line no-await-in-loop
      await new Promise(r => setTimeout(r, 100));
    }
    return true;
  };

  // Razorpay payment handler (client-only, no backend)
  const handlePlaceOrder = async () => {
    if (paymentMethod === 'razorpay') {
      // If developer enabled simulatePayments, short-circuit to allow testing
      if (simulatePayments) {
        setLoading(true);
        setTimeout(() => {
          placeOrder('SIMULATED_PAYMENT_ID', 'simulated');
          setLoading(false);
        }, 250);
        return;
      }

      setLoading(true);

      const amountInPaise = Math.round(total * 100);
      if (amountInPaise < 100) {
        alert('Minimum payable amount is ₹1. Add more items to your cart.');
        setLoading(false);
        return;
      }

      if (!razorpayReady) {
        if (!scriptLoading) {
          await loadRazorpayScript();
        }
        if (!razorpayReady && !(window as any).Razorpay) {
          alert('Payment gateway failed to load. Check DevTools Network tab and probe info, disable any blockers and retry.');
          setLoading(false);
          return;
        }
      }

      if (!(window as any).Razorpay) {
        alert('Payment gateway unavailable. Please try again.');
        setLoading(false);
        return;
      }

      try {
        const options = {
          key: 'rzp_test_ReP91msL6IjeMM', // replace with your test key if needed
          amount: amountInPaise,
          currency: 'INR',
          name: 'E-Commerce Website',
          description: 'Order Payment',
          handler: function (response: any) {
            setLoading(false);
            if (response && response.razorpay_payment_id) {
              placeOrder(response.razorpay_payment_id);
            } else {
              alert('Payment completed but no payment id received.');
            }
          },
          prefill: {
            name: shippingAddress.fullName || (user as any).fullName || '',
            email: (user as any).email || '',
            contact: shippingAddress.phone || ''
          },
          theme: { color: '#6366f1' },
          modal: {
            ondismiss: function () {
              setLoading(false);
            }
          }
        };

        // @ts-ignore
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } catch (err) {
        console.error('Razorpay open error:', err);
        alert('Failed to initiate payment. Please try again.');
        setLoading(false);
      }
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

                  <div>
                    <button
                      onClick={() => setPaymentMethod('razorpay')}
                      className={`w-full p-4 border-2 rounded-lg flex items-center space-x-3 transition ${
                        paymentMethod === 'razorpay' ? 'border-slate-800 bg-slate-50' : 'border-gray-200'
                      }`}
                    >
                      <MapPin className="w-6 h-6" />
                      <span className="font-medium">Razorpay</span>
                    </button>

                    {paymentMethod === 'razorpay' && !razorpayReady && (
                      <div className="mt-3 p-3 rounded-md bg-yellow-50 border border-yellow-200 text-sm text-yellow-800">
                        <div className="mb-2">
                          {scriptLoading ? (
                            <span>Loading payment gateway...</span>
                          ) : (
                            <div>
                              <div>{scriptError || 'Payment gateway failed to load.'}</div>
                              {probeInfo && <div className="mt-1 text-xs text-slate-600">{probeInfo}</div>}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => loadRazorpayScript()}
                            className="px-3 py-1 bg-slate-800 text-white rounded text-sm"
                          >
                            {scriptLoading ? 'Retrying...' : 'Retry Loading Gateway'}
                          </button>
                          <button
                            onClick={() => setPaymentMethod('card')}
                            className="px-3 py-1 border border-slate-300 rounded text-sm"
                          >
                            Use Card Instead
                          </button>

                          {/* simulation toggle */}
                          <button
                            onClick={() => setSimulatePayments(v => !v)}
                            className={`px-3 py-1 border rounded text-sm ${simulatePayments ? 'bg-green-100 border-green-300' : 'bg-white border-slate-300'}`}
                          >
                            {simulatePayments ? 'Simulated Payments: ON' : 'Enable Simulated Payments'}
                          </button>
                        </div>
                        <div className="mt-2 text-xs text-slate-600">
                          If loading keeps failing, open DevTools → Network and check the request to checkout.js. Use simulated payments for local/dev testing only.
                        </div>
                      </div>
                    )}
                  </div>
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
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}