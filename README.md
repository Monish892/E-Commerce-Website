# E-Commerce Website

A modern, responsive e-commerce platform built with React, TypeScript, and Tailwind CSS.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Features](#features)
- [Key Components](#key-components)
- [Context & State Management](#context--state-management)
- [Development Guidelines](#development-guidelines)

## 📌 Project Overview

This is a full-featured e-commerce application with user authentication, product browsing, shopping cart, wishlist, and checkout functionality. The application uses client-side state management and integrates with Razorpay for payment processing.

## 🛠 Tech Stack

- **Frontend Framework:** React 18+ with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + PostCSS
- **Icons:** Lucide React
- **State Management:** React Context API
- **Linting:** ESLint
- **Payment Gateway:** Razorpay
- **Development:** Node.js + npm

## 📁 Project Structure

```
project/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── AuthModal.tsx      # Authentication modal
│   │   ├── CartSidebar.tsx    # Shopping cart sidebar
│   │   └── Header.tsx          # Main header/navigation
│   ├── context/
│   │   └── AppContext.tsx     # Global app state management
│   ├── data/
│   │   └── mockData.ts        # Mock product and user data
│   ├── pages/                 # Page components
│   │   ├── AccountPage.tsx    # User account & orders
│   │   ├── CheckoutPage.tsx   # Checkout flow
│   │   ├── HomePage.tsx       # Landing page
│   │   ├── ProductDetailPage.tsx
│   │   ├── ProductsPage.tsx   # Products catalog
│   │   └── WishlistPage.tsx   # Wishlist items
│   ├── types/
│   │   └── index.ts           # TypeScript type definitions
│   ├── App.tsx                # Main app component
│   ├── main.tsx               # Entry point
│   ├── index.css              # Global styles
│   └── vite-env.d.ts
├── index.html                 # HTML template
├── package.json               # Dependencies & scripts
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.js         # Tailwind configuration
├── vite.config.ts             # Vite configuration
├── eslint.config.js           # ESLint rules
└── postcss.config.js          # PostCSS configuration
```

## 🚀 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Setup Steps

1. **Clone/Open the project:**

   ```bash
   cd project
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Install any missing packages:**
   ```bash
   npm install
   ```

## 🏃 Getting Started

### Development Server

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port Vite assigns).

### Build for Production

Create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## 📜 Available Scripts

| Script            | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start development server         |
| `npm run build`   | Build for production             |
| `npm run preview` | Preview production build         |
| `npm run lint`    | Run ESLint to check code quality |

## ✨ Features

- **User Authentication** - Sign up, login, and profile management
- **Product Browsing** - Browse products with detailed information
- **Shopping Cart** - Add/remove items, update quantities
- **Wishlist** - Save favorite products for later
- **Checkout Flow** - Multi-step checkout with address and payment options
- **Payment Gateway** - Razorpay integration for secure payments
- **Order Management** - View order history and status
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Mock Data** - Pre-loaded sample products and categories

## 🧩 Key Components

### Header (`components/Header.tsx`)

Main navigation bar with logo, search, cart, and user menu.

### AuthModal (`components/AuthModal.tsx`)

Authentication modal for login and signup functionality.

### CartSidebar (`components/CartSidebar.tsx`)

Sliding sidebar showing shopping cart items with quantity controls.

### AppContext (`context/AppContext.tsx`)

Global state provider managing user, cart, products, orders, and authentication state.

## 🔄 Context & State Management

The app uses **React Context API** for state management through `AppContext`. It manages:

- **User State** - Current user information
- **Products** - Product catalog and details
- **Cart** - Shopping cart items and totals
- **Orders** - User's order history
- **Wishlist** - Saved favorite products
- **UI State** - Modal visibility, navigation

Access context using:

```tsx
import { useApp } from "../context/AppContext";

function MyComponent() {
  const { user, cart, addToCart } = useApp();
  // ...
}
```

## 📝 Development Guidelines

### Naming Conventions

- **Components:** PascalCase (e.g., `ProductCard.tsx`)
- **Functions/Variables:** camelCase (e.g., `handleAddToCart`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `DEFAULT_TIMEOUT`)

### Adding New Pages

1. Create a new file in `src/pages/`
2. Export a default component
3. Add route in `App.tsx`

### Adding New Components

1. Create a file in `src/components/`
2. Keep components focused and reusable
3. Export as default or named export

### Type Safety

Always define TypeScript types for props and state:

```tsx
interface ComponentProps {
  title: string;
  onClick: () => void;
}

export default function Component({ title, onClick }: ComponentProps) {
  // ...
}
```

### Styling

Use Tailwind CSS utility classes for all styling:

```tsx
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
  {/* Content */}
</div>
```

## 🔐 Payment Integration

The app integrates with **Razorpay** for payments:

- Test API Key: `rzp_test_ReP91msL6IjeMM`
- The checkout flow handles payment in `CheckoutPage.tsx`
- Supports card payments and fallback to simulated payments for development

## 📦 Dependencies

Main dependencies include:

- `react` - UI library
- `react-dom` - React DOM rendering
- `lucide-react` - Icon library
- `tailwindcss` - Utility-first CSS framework

See `package.json` for complete list.

## 🐛 Troubleshooting

### Port Already in Use

If port 5173 is in use, Vite will automatically use the next available port.

### Payment Gateway Not Loading

- Check DevTools Network tab for Razorpay script
- Disable browser extensions (adblock, etc.)
- Check for corporate proxy/firewall blocking
- Use simulated payments for development

### TypeScript Errors

- Run `npm install` to ensure all types are installed
- Check `tsconfig.json` for configuration

## 📞 Support

For issues or questions, check the DevTools console for error messages and refer to component documentation.

---

**Last Updated:** February 2026
**Version:** 1.0.0
