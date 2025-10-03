import { useState } from 'react';
import { ShoppingCart, Heart, Star, Minus, Plus, Truck, Shield, RotateCcw, Check } from 'lucide-react';
import { products, reviews, categories } from '../data/mockData';
import { useApp } from '../context/AppContext';

interface ProductDetailPageProps {
  productId: string;
  onNavigate: (page: string, params?: any) => void;
}

export default function ProductDetailPage({ productId, onNavigate }: ProductDetailPageProps) {
  const product = products.find(p => p.id === productId);
  const { addToCart, addToWishlist, isInWishlist } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <button
            onClick={() => onNavigate('products')}
            className="text-slate-800 font-semibold hover:text-slate-600"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const productReviews = reviews.filter(r => r.productId === productId);
  const category = categories.find(c => c.id === product.categoryId);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleToggleWishlist = () => {
    if (!inWishlist) {
      addToWishlist(product);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="text-sm text-gray-600 mb-6">
          <button onClick={() => onNavigate('home')} className="hover:text-slate-800">
            Home
          </button>
          <span className="mx-2">/</span>
          <button
            onClick={() => onNavigate('products', { categoryId: product.categoryId })}
            className="hover:text-slate-800"
          >
            {category?.name}
          </button>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-xl overflow-hidden shadow-sm">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === index ? 'border-slate-800' : 'border-transparent'
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.averageRating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {product.averageRating.toFixed(1)}
                </span>
                <button className="text-sm text-slate-600 hover:text-slate-800">
                  ({product.reviewCount} reviews)
                </button>
              </div>

              <div className="flex items-baseline space-x-3 mb-6">
                <span className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                {product.compareAtPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ${product.compareAtPrice.toFixed(2)}
                    </span>
                    <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold">
                      Save {Math.round((1 - product.price / product.compareAtPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Availability:</span>
                  <span className={`text-sm font-semibold ${product.stockQuantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stockQuantity > 0 ? `In Stock (${product.stockQuantity} units)` : 'Out of Stock'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">SKU:</span>
                  <span className="text-sm text-gray-600">{product.sku}</span>
                </div>
              </div>
            </div>

            {product.stockQuantity > 0 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-gray-900">Quantity:</span>
                  <div className="flex items-center space-x-3 border border-gray-300 rounded-lg px-4 py-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-4 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition font-semibold flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={handleToggleWishlist}
                    className={`p-4 rounded-lg border-2 transition ${
                      inWishlist
                        ? 'border-red-500 bg-red-50 text-red-500'
                        : 'border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-6 h-6 ${inWishlist ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Truck className="w-6 h-6 text-slate-800" />
                </div>
                <p className="text-sm font-medium text-gray-900 mb-1">Free Delivery</p>
                <p className="text-xs text-gray-600">On orders over $50</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <RotateCcw className="w-6 h-6 text-slate-800" />
                </div>
                <p className="text-sm font-medium text-gray-900 mb-1">Easy Returns</p>
                <p className="text-xs text-gray-600">30-day return policy</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-slate-800" />
                </div>
                <p className="text-sm font-medium text-gray-900 mb-1">Secure Payment</p>
                <p className="text-xs text-gray-600">100% secure</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">{key}</p>
                  <p className="text-gray-600">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  {product.averageRating.toFixed(1)}
                </div>
                <div className="flex items-center justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.averageRating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600">{product.reviewCount} reviews</p>
              </div>

              <div className="flex-1">
                {[5, 4, 3, 2, 1].map(rating => {
                  const count = productReviews.filter(r => r.rating === rating).length;
                  const percentage = productReviews.length > 0 ? (count / productReviews.length) * 100 : 0;

                  return (
                    <div key={rating} className="flex items-center space-x-3 mb-2">
                      <span className="text-sm text-gray-600 w-12">{rating} star</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {productReviews.length > 0 ? (
              productReviews.map(review => (
                <div key={review.id} className="pb-6 border-b border-gray-200 last:border-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-slate-800">
                          {review.userName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{review.userName}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {review.title && (
                    <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
                  )}

                  {review.comment && (
                    <p className="text-gray-700 leading-relaxed mb-3">{review.comment}</p>
                  )}

                  {review.verifiedPurchase && (
                    <span className="inline-flex items-center space-x-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                      <Check className="w-3 h-3" />
                      <span>Verified Purchase</span>
                    </span>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 py-8">No reviews yet. Be the first to review this product!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
