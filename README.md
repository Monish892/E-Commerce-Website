# 🛒 E-Commerce Website (TypeScript + Razorpay Integration)

A full-stack E-Commerce Web Application built using **TypeScript**, featuring product listing, cart management, authentication, and secure online payments using Razorpay.

---

## 🚀 Features

- 🔐 JWT Authentication (Register/Login)
- 🛍️ Product Listing & Search
- 🛒 Add to Cart / Remove from Cart
- 📦 Order Creation & Management
- 💳 Razorpay Payment Integration
- 📱 Fully Responsive UI
- 📊 Admin Dashboard (Optional)

---

## 🏗️ Tech Stack

### Frontend
- React
- TypeScript
- Axios
- React Router
- Tailwind CSS / CSS

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- Razorpay SDK

---

## 📁 Project Structure

```
ecommerce-app/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── App.tsx
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.ts
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/ecommerce-app.git
cd ecommerce-app
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

Start the backend server:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 💳 Razorpay Integration

### Install Razorpay

```bash
npm install razorpay
```

---

### Backend Razorpay Configuration (TypeScript)

```ts
import Razorpay from "razorpay"

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string
})
```

---

### Create Order API

```ts
router.post("/create-order", async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: "receipt_order_1"
    }

    const order = await razorpay.orders.create(options)
    res.json(order)
  } catch (error) {
    res.status(500).json({ message: "Error creating order" })
  }
})
```

---

### Frontend Razorpay Payment Handler

```ts
const handlePayment = async () => {
  const { data } = await axios.post("/api/payment/create-order", {
    amount: totalAmount
  })

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: data.amount,
    currency: "INR",
    order_id: data.id,
    handler: function (response: any) {
      console.log(response)
    }
  }

  const rzp = new (window as any).Razorpay(options)
  rzp.open()
}
```

---

## 🔐 Environment Variables

| Variable | Description |
|----------|------------|
| MONGO_URI | MongoDB connection string |
| JWT_SECRET | Secret key for authentication |
| RAZORPAY_KEY_ID | Razorpay public key |
| RAZORPAY_KEY_SECRET | Razorpay secret key |

---

## 📦 Available Scripts

### Backend

```bash
npm run dev
npm run build
```

### Frontend

```bash
npm run dev
npm run build
```

---

## 🌍 Deployment

### Backend
- Render
- Railway

### Frontend
- Vercel
- Netlify

---

## 🧪 Future Improvements

- Order History Page
- Payment Signature Verification
- Coupon & Discount System
- Wishlist Feature
- Admin Product Management
- Email Notifications

---

## 👨‍💻 Author

Your Name  
GitHub: https://github.com/your-username  

---

## 📄 License

This project is licensed under the MIT License.
