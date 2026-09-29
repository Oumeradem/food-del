# Tomato — Full-Stack Food Delivery App

> A full-stack MERN food delivery application with user authentication, cart management, Stripe payments, and real-time order tracking — deployed and production-ready.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com)

---

## Links

| | |
|---|---|
| Live App | [tomato-food-delivery-zeta.vercel.app](https://tomato-food-delivery-zeta.vercel.app) |
| App Repo | [github.com/Oumeradem/food-del](https://github.com/Oumeradem/food-del) |
| E2E Test Suite | [github.com/Oumeradem/food-delivery-tests](https://github.com/Oumeradem/food-delivery-tests) |

---

## Features

- **User Authentication** — JWT-based registration and login with token persistence
- **Cart Management** — Add, remove, and update items with real-time cart sync
- **Stripe Payments** — Full Stripe checkout integration with test and live mode support
- **Order Tracking** — Real-time order status updates from placed to delivered
- **Menu Filtering** — Browse dishes by category with an animated filter UI
- **Responsive Design** — Fully responsive across desktop, tablet, and mobile
- **Production Security** — Secrets rotation, secure environment handling, and scrubbed git history
- **Error Resilience** — Robust Stripe integration with whitespace tolerance

---

## Architecture

```text
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
```

---

## Tech Stack

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

## Quick Start

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

```text
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Start the server:

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

## Production Deployment

This project is fully deployed and production-ready:

- **Frontend**: Deployed on [Vercel](https://vercel.com) with automatic deployments from the main branch
- **Backend API**: Deployed on [Render](https://render.com) with environment-based configuration
- **Database**: MongoDB Atlas with secure connection pooling
- **Payments**: Stripe production account with webhook verification

### Security Highlights

- All secrets rotated and securely managed via environment variables
- No hardcoded credentials in the codebase (git history scrubbed)
- JWT tokens with expiration for session management
- Stripe API integration with error resilience (handles environment whitespace)
- CORS configured for frontend and backend communication

### Testing in Production

To test the live app with Stripe:

1. Register a new account at [tomato-food-delivery-zeta.vercel.app](https://tomato-food-delivery-zeta.vercel.app)
2. Add items to the cart and proceed to checkout
3. Use the Stripe test card **4242 4242 4242 4242** (any future date, any CVC)

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/user/register` | Register a new user |
| POST | `/api/user/login` | Login a user |
| GET | `/api/food/list` | Get all food items |
| POST | `/api/cart/add` | Add an item to the cart |
| POST | `/api/cart/remove` | Remove an item from the cart |
| POST | `/api/order/place` | Place an order and create a Stripe session |
| POST | `/api/order/verify` | Verify a Stripe payment |
| POST | `/api/order/userorders` | Get a user's orders |

---

## Author

**Oumer Adem**
*Aspiring Software Engineer | Full-Stack Development | QA Automation*

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/oumer-adem)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Oumeradem)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:oumer.adamye@gmail.com)
