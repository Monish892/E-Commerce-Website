import { useState, useMemo } from 'react';
import { ShoppingBag, Star, SlidersHorizontal, X } from 'lucide-react';
import { products, categories } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

interface ProductsPageProps {
  onNavigate: (page: string, params?: any) => void;
  categoryId?: string;
}

export default function ProductsPage({ onNavigate, categoryId }: ProductsPageProps) {
  const { addToCart, searchQuery } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryId || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'rating'>('popular');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesCategory = !selectedCategory || product.categoryId === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesRating = product.averageRating >= minRating;
      const matchesSearch = !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesPrice && matchesRating && matchesSearch;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.averageRating - a.averageRating;
        case 'popular':
        default:
          return b.reviewCount - a.reviewCount;
      }
    });

    return filtered;
  }, [selectedCategory, priceRange, minRating, sortBy, searchQuery]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
        <div className="space-y-2">
          <button
            onClick={() => setSelectedCategory('')}
            className={`block w-full text-left px-3 py-2 rounded-lg transition ${
              !selectedCategory ? 'bg-slate-800 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Categories
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                selectedCategory === category.id ? 'bg-slate-800 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="500"
            step="10"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Minimum Rating</h3>
        <div className="space-y-2">
          {[0, 1, 2, 3, 4].map(rating => (
            <button
              key={rating}
              onClick={() => setMinRating(rating)}
              className={`flex items-center w-full px-3 py-2 rounded-lg transition ${
                minRating === rating ? 'bg-slate-800 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < rating
                        ? minRating === rating
                          ? 'fill-white text-white'
                          : 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2">{rating > 0 ? `${rating}+ Stars` : 'All Ratings'}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {selectedCategory
                ? categories.find(c => c.id === selectedCategory)?.name
                : searchQuery
                ? `Search Results for "${searchQuery}"`
                : 'All Products'}
            </h1>
            <p className="text-gray-600">{filteredAndSortedProducts.length} products found</p>
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <FilterPanel />
            </div>
          </aside>

          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedProducts.map(product => (
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

            {filteredAndSortedProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-600 text-lg mb-4">No products found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    setPriceRange([0, 500]);
                    setMinRating(0);
                  }}
                  className="text-slate-800 font-semibold hover:text-slate-600"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isFilterOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsFilterOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-80 bg-white z-50 lg:hidden overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterPanel />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
