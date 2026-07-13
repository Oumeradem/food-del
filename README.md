# 🍅 Tomato — Full-Stack Food Delivery App

> A full-stack MERN food delivery application with user authentication, cart management, Stripe payments, and real-time order tracking — deployed and production-ready.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com)

---

## 🔗 Links

| | |
|---|---|
| 🌐 Live App | https://tomato-food-delivery-zeta.vercel.app |
| 💻 App Repo | https://github.com/Oumeradem/food-del |
| 🧪 E2E Test Suite | https://github.com/Oumeradem/food-delivery-tests |

---

## ✨ Features

- 🔐 **User Authentication** — JWT-based registration and login with token persistence
- 🛒 **Cart Management** — Add, remove, and update items with real-time cart sync
- 💳 **Stripe Payments** — Full Stripe checkout integration with test and live mode support
- 📦 **Order Tracking** — Real-time order status updates from placed to delivered
- 🍽️ **Menu Filtering** — Browse dishes by category with animated filter UI
- 📱 **Responsive Design** — Fully responsive across desktop, tablet, and mobile

---

## 🏗️ Architecture
food-del/
├── frontend/          # React + Vite client
│   ├── src/
│   │   ├── components/    # Navbar, Footer, FoodItem, Cart
│   │   ├── pages/         # Home, Cart, Orders, PlaceOrder
│   │   └── context/       # StoreContext — global state management
│   └── vercel.json        # React Router rewrite rules
├── backend/           # Node.js + Express API
│   ├── controllers/       # Auth, Food, Cart, Order logic
│   ├── models/            # Mongoose schemas
│   ├── routes/            # REST API endpoints
│   └── middleware/        # JWT auth middleware
└── admin/             # Admin dashboard

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Vite, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Auth | JWT |
| Payments | Stripe |
| Deployment | Vercel (frontend) · Render (backend) |
| Testing | Playwright + Cucumber BDD |

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Stripe account

### 1. Clone the Repository
```bash
git clone https://github.com/Oumeradem/food-del.git
cd food-del
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` in the backend folder:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```bash
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/user/register` | Register new user |
| POST | `/api/user/login` | Login user |
| GET | `/api/food/list` | Get all food items |
| POST | `/api/cart/add` | Add item to cart |
| POST | `/api/cart/remove` | Remove item from cart |
| POST | `/api/order/place` | Place order + Stripe session |
| POST | `/api/order/verify` | Verify Stripe payment |
| POST | `/api/order/userorders` | Get user orders |

---

## 👤 Oumer Adem
*Aspiring Software Engineer | Full-Stack Development | QA Automation*

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/oumer-adem)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Oumeradem)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:oumer.adamye@gmail.com)
