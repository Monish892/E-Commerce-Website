import { Product, Category, Review } from '../types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest gadgets and electronic devices',
    imageUrl: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '2',
    name: 'Fashion',
    slug: 'fashion',
    description: 'Trendy clothing and accessories',
    imageUrl: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '3',
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    description: 'Everything for your home',
    imageUrl: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '4',
    name: 'Books',
    slug: 'books',
    description: 'Bestsellers and classics',
    imageUrl: 'https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '5',
    name: 'Sports & Outdoors',
    slug: 'sports-outdoors',
    description: 'Gear for active lifestyles',
    imageUrl: 'https://images.pexels.com/photos/235922/pexels-photo-235922.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '6',
    name: 'Beauty & Personal Care',
    slug: 'beauty',
    description: 'Cosmetics and personal care products',
    imageUrl: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    slug: 'premium-wireless-headphones',
    description: 'Experience crystal-clear audio with active noise cancellation, 30-hour battery life, and premium comfort. Perfect for music lovers and professionals.',
    price: 299.99,
    compareAtPrice: 399.99,
    categoryId: '1',
    brand: 'AudioTech',
    sku: 'AT-WH-001',
    stockQuantity: 50,
    images: [
      'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    specifications: {
      'Battery Life': '30 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Noise Cancellation': 'Active',
      'Weight': '250g',
      'Warranty': '2 years'
    },
    isActive: true,
    averageRating: 4.5,
    reviewCount: 128
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    slug: 'smart-fitness-watch',
    description: 'Track your health and fitness with advanced sensors, GPS, heart rate monitoring, and 7-day battery life. Water-resistant and stylish.',
    price: 199.99,
    categoryId: '1',
    brand: 'FitPro',
    sku: 'FP-SW-002',
    stockQuantity: 75,
    images: [
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    specifications: {
      'Display': '1.4" AMOLED',
      'Battery': '7 days',
      'Water Resistance': '5ATM',
      'Sensors': 'Heart Rate, GPS, SpO2',
      'Compatibility': 'iOS & Android'
    },
    isActive: true,
    averageRating: 4.3,
    reviewCount: 89
  },
  {
    id: '3',
    name: 'Leather Crossbody Bag',
    slug: 'leather-crossbody-bag',
    description: 'Elegant genuine leather bag with multiple compartments. Perfect for everyday use or special occasions. Handcrafted with attention to detail.',
    price: 89.99,
    compareAtPrice: 129.99,
    categoryId: '2',
    brand: 'StyleCraft',
    sku: 'SC-LB-003',
    stockQuantity: 30,
    images: [
      'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1038000/pexels-photo-1038000.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    specifications: {
      'Material': 'Genuine Leather',
      'Dimensions': '25cm x 20cm x 8cm',
      'Strap': 'Adjustable',
      'Color': 'Brown',
      'Care': 'Leather conditioner recommended'
    },
    isActive: true,
    averageRating: 4.7,
    reviewCount: 45
  },
  {
    id: '4',
    name: 'Stainless Steel Coffee Maker',
    slug: 'stainless-steel-coffee-maker',
    description: 'Programmable coffee maker with thermal carafe, keeps coffee hot for hours. 12-cup capacity with auto-shutoff and brew strength control.',
    price: 79.99,
    categoryId: '3',
    brand: 'BrewMaster',
    sku: 'BM-CM-004',
    stockQuantity: 40,
    images: [
      'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1251176/pexels-photo-1251176.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    specifications: {
      'Capacity': '12 cups',
      'Material': 'Stainless Steel',
      'Features': 'Programmable, Auto-shutoff',
      'Carafe': 'Thermal',
      'Power': '900W'
    },
    isActive: true,
    averageRating: 4.4,
    reviewCount: 67
  },
  {
    id: '5',
    name: 'Best Selling Novel Collection',
    slug: 'best-selling-novel-collection',
    description: 'Collection of 5 bestselling novels from award-winning authors. Perfect gift for book lovers. Hardcover editions with beautiful dust jackets.',
    price: 59.99,
    compareAtPrice: 89.99,
    categoryId: '4',
    brand: 'Literary Press',
    sku: 'LP-BC-005',
    stockQuantity: 25,
    images: [
      'https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    specifications: {
      'Format': 'Hardcover',
      'Pages': 'Varies (avg 400)',
      'Language': 'English',
      'Publisher': 'Literary Press',
      'Books Included': '5'
    },
    isActive: true,
    averageRating: 4.8,
    reviewCount: 156
  },
  {
    id: '6',
    name: 'Yoga Mat with Carrying Strap',
    slug: 'yoga-mat-carrying-strap',
    description: 'Premium non-slip yoga mat with extra cushioning. Eco-friendly materials, perfect for yoga, pilates, and floor exercises. Includes free carrying strap.',
    price: 39.99,
    categoryId: '5',
    brand: 'ZenFit',
    sku: 'ZF-YM-006',
    stockQuantity: 100,
    images: [
      'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3984340/pexels-photo-3984340.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    specifications: {
      'Dimensions': '183cm x 61cm',
      'Thickness': '6mm',
      'Material': 'TPE',
      'Features': 'Non-slip, Eco-friendly',
      'Includes': 'Carrying strap'
    },
    isActive: true,
    averageRating: 4.6,
    reviewCount: 92
  },
  {
    id: '7',
    name: 'Natural Skincare Set',
    slug: 'natural-skincare-set',
    description: 'Complete skincare routine with cleanser, toner, serum, and moisturizer. All-natural ingredients, cruelty-free, suitable for all skin types.',
    price: 69.99,
    categoryId: '6',
    brand: 'PureGlow',
    sku: 'PG-SS-007',
    stockQuantity: 60,
    images: [
      'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    specifications: {
      'Products': '4 items',
      'Ingredients': 'Natural',
      'Skin Type': 'All types',
      'Certification': 'Cruelty-free',
      'Size': 'Full size products'
    },
    isActive: true,
    averageRating: 4.5,
    reviewCount: 73
  },
  {
    id: '8',
    name: '4K Action Camera',
    slug: '4k-action-camera',
    description: 'Capture your adventures in stunning 4K resolution. Waterproof, image stabilization, WiFi connectivity, and long battery life. Perfect for sports and travel.',
    price: 249.99,
    categoryId: '1',
    brand: 'AdventureCam',
    sku: 'AC-4K-008',
    stockQuantity: 45,
    images: [
      'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    specifications: {
      'Resolution': '4K @ 60fps',
      'Waterproof': 'Up to 10m',
      'Stabilization': 'Electronic',
      'Battery': '2 hours 4K',
      'Storage': 'MicroSD up to 256GB'
    },
    isActive: true,
    averageRating: 4.4,
    reviewCount: 112
  },
  {
    id: '9',
    name: 'Designer Sunglasses',
    slug: 'designer-sunglasses',
    description: 'Luxury sunglasses with UV400 protection and polarized lenses. Timeless design that complements any style. Includes premium case and cleaning cloth.',
    price: 149.99,
    compareAtPrice: 199.99,
    categoryId: '2',
    brand: 'LuxVision',
    sku: 'LV-SG-009',
    stockQuantity: 35,
    images: [
      'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    specifications: {
      'Lens': 'Polarized',
      'UV Protection': 'UV400',
      'Frame Material': 'Acetate',
      'Includes': 'Case & cloth',
      'Warranty': '1 year'
    },
    isActive: true,
    averageRating: 4.6,
    reviewCount: 58
  },
  {
    id: '10',
    name: 'Smart LED Desk Lamp',
    slug: 'smart-led-desk-lamp',
    description: 'Adjustable LED lamp with multiple brightness levels and color temperatures. USB charging port, touch controls, and eye-care technology.',
    price: 49.99,
    categoryId: '3',
    brand: 'BrightSpace',
    sku: 'BS-DL-010',
    stockQuantity: 80,
    images: [
      'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    specifications: {
      'Light Source': 'LED',
      'Color Temperature': '2700K-6500K',
      'Brightness Levels': '5',
      'USB Port': 'Yes',
      'Power': '12W'
    },
    isActive: true,
    averageRating: 4.3,
    reviewCount: 41
  },
  {
    id: '11',
    name: 'Wireless Gaming Mouse',
    slug: 'wireless-gaming-mouse',
    description: 'High-precision gaming mouse with customizable RGB lighting, 6 programmable buttons, and 20000 DPI sensor. Ergonomic design for extended gaming sessions.',
    price: 79.99,
    categoryId: '1',
    brand: 'GameTech',
    sku: 'GT-GM-011',
    stockQuantity: 55,
    images: [
      'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    specifications: {
      'DPI': 'Up to 20000',
      'Buttons': '6 programmable',
      'Battery': '70 hours',
      'RGB': 'Customizable',
      'Weight': '95g'
    },
    isActive: true,
    averageRating: 4.5,
    reviewCount: 78
  },
  {
    id: '12',
    name: 'Running Shoes - Pro Series',
    slug: 'running-shoes-pro',
    description: 'Professional running shoes with advanced cushioning and breathable mesh. Perfect for marathon training and daily runs. Lightweight and durable.',
    price: 129.99,
    categoryId: '5',
    brand: 'SpeedRunner',
    sku: 'SR-RS-012',
    stockQuantity: 70,
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    specifications: {
      'Upper': 'Breathable mesh',
      'Cushioning': 'Advanced foam',
      'Weight': '240g',
      'Drop': '8mm',
      'Suitable': 'Road running'
    },
    isActive: true,
    averageRating: 4.7,
    reviewCount: 134
  }
];

export const reviews: Review[] = [
  {
    id: '1',
    productId: '1',
    userId: 'user1',
    userName: 'Sarah Johnson',
    rating: 5,
    title: 'Best headphones I\'ve ever owned',
    comment: 'The sound quality is incredible and the noise cancellation works perfectly. Battery life is exactly as advertised.',
    verifiedPurchase: true,
    helpfulCount: 24,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    productId: '1',
    userId: 'user2',
    userName: 'Michael Chen',
    rating: 4,
    title: 'Great value for money',
    comment: 'Very comfortable for long listening sessions. Only minor complaint is the case could be a bit smaller.',
    verifiedPurchase: true,
    helpfulCount: 12,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    productId: '2',
    userId: 'user3',
    userName: 'Emily Davis',
    rating: 5,
    title: 'Perfect fitness companion',
    comment: 'Tracks everything I need and the battery really does last a week. Love the design too!',
    verifiedPurchase: true,
    helpfulCount: 18,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    productId: '3',
    userId: 'user4',
    userName: 'Jennifer Smith',
    rating: 5,
    title: 'Beautiful and practical',
    comment: 'The leather quality is outstanding. Perfect size for everyday essentials.',
    verifiedPurchase: true,
    helpfulCount: 9,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '5',
    productId: '5',
    userId: 'user5',
    userName: 'David Wilson',
    rating: 5,
    title: 'Excellent collection',
    comment: 'All five books are fantastic. Great value for a hardcover collection.',
    verifiedPurchase: true,
    helpfulCount: 15,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
  }
];
