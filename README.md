# Next News - Full-Stack Real-Time News Platform

**Next News** is a production-level full-stack news and media platform engineered with **Node.js, Express.js, React.js, TypeScript, MongoDB, Tailwind CSS, JWT authentication, and Server-Sent Events (SSE)**.

---

## 🚀 Key Features

1. **JWT Authentication & Security**:
   - Secure user registration, login, and token-based state persistence (`localStorage` + HTTP Bearer headers).
   - Password hashing using `bcryptjs` and token verification via reusable Express middleware.
   - Protected client-side routes and API endpoints.

2. **News & Article Management**:
   - High-impact dashboard with featured story hero, category navigation (*Technology, Business, World, Science, Culture*), tag filtering, search, and sorting (*Newest / Most Popular*).
   - Article detail pages with view count tracking, estimated read times, author information, and rich text formatting.
   - Live article publishing portal for posting breaking news stories dynamically.

3. **Interactive Commenting System**:
   - Real-time discussion section on articles allowing authenticated readers to post and delete comments.
   - Live comment notifications broadcast across active client sessions via SSE.

4. **Personal Watchlist Library**:
   - Bookmark articles to a personal reading list with instant status toggles.
   - Dedicated Watchlist dashboard for managing saved stories.

5. **User Profile & Axios Avatar Upload**:
   - Profile management interface allowing users to edit display names, bios, and upload custom profile photos via Axios multipart form data.

6. **Real-Time API Transports (SSE)**:
   - Server-Sent Events stream (`/api/v1/articles/realtime/stream`) delivering live breaking news alerts and real-time comment updates without polling or external vendor dependencies.

7. **Performance Strategy (Targeting 35% Page-Load Reduction)**:
   - Mongoose `.lean()` queries and document field projections (`.select(...)`).
   - Compound database indexing on high-frequency query paths (`category + createdAt`, `articleId + createdAt`, `userId`).
   - Asynchronous view count incrementing.
   - React Error Boundary UI fallback.

---

## 🛠️ Mandatory Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Axios, React Router 6, Vite
- **Backend**: Node.js, Express.js, TypeScript, Mongoose, JWT, Multer
- **Database**: MongoDB (Mongoose ORM)
- **Real-Time API**: Server-Sent Events (SSE)

---

## 📂 Project Structure

```text
Next News/
├── client/                     # React + TypeScript + Tailwind Frontend
│   ├── src/
│   │   ├── components/         # Navbar, ArticleCard, BreakingTicker, CommentSection, ErrorBoundary, CreateArticleModal
│   │   ├── context/            # AuthContext (JWT State Management)
│   │   ├── hooks/              # useAuth, useRealTimeNews (SSE Subscriber Hook)
│   │   ├── layouts/            # Main Layout Wrapper
│   │   ├── pages/              # HomePage, ArticleDetailPage, WatchlistPage, ProfilePage, LoginPage, RegisterPage
│   │   ├── services/           # Axios API services (auth, article, comment, watchlist, user)
│   │   ├── types/              # Central TypeScript definitions
│   │   ├── App.tsx             # Route Configuration
│   │   └── main.tsx            # Entry Point
│   ├── package.json
│   └── vite.config.ts
│
├── server/                     # Node.js + Express + TypeScript Backend
│   ├── src/
│   │   ├── config/             # DB & Environment variables
│   │   ├── controllers/        # auth, user, article, comment, watchlist
│   │   ├── middleware/         # authMiddleware, uploadMiddleware, errorMiddleware
│   │   ├── models/             # User, Article, Comment, Watchlist Mongoose Schemas
│   │   ├── routes/             # authRoutes, userRoutes, articleRoutes, commentRoutes, watchlistRoutes
│   │   ├── utils/              # appError, generateToken, sseBroadcaster, seedData
│   │   ├── app.ts              # Express App setup & static uploads
│   │   └── server.ts           # Server Listener & Auto-Seeder
│   └── package.json
│
├── prompt.md                   # Master Prompt & Architectural Rules
└── README.md
```

---

## ⚙️ Environment Configuration

### Backend (`server/.env`)
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/next-news
JWT_SECRET=super_secret_jwt_key_next_news_2026
JWT_EXPIRES_IN=30d
CLIENT_URL=http://localhost:5173
```

---

## 💻 Getting Started

### 1. Backend Setup
```bash
cd server
npm install
npm run dev
```
*The server starts on `http://localhost:5000` and automatically seeds initial sample news articles into MongoDB if empty.*

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```
*The React client starts on `http://localhost:5173` with proxying to the Express API.*

---

## 📡 REST API Endpoint Summary

| Endpoint | Method | Auth | Description |
| :--- | :--- | :--- | :--- |
| `/api/v1/auth/register` | `POST` | Public | Register new user account |
| `/api/v1/auth/login` | `POST` | Public | Authenticate user & issue JWT |
| `/api/v1/auth/me` | `GET` | Bearer | Get current user profile |
| `/api/v1/users/profile` | `GET` / `PUT` | Bearer | Get or update profile details |
| `/api/v1/users/profile/avatar` | `POST` | Bearer | Upload profile photo (Axios multipart) |
| `/api/v1/articles` | `GET` | Public | Fetch news with search, filter, pagination, sorting |
| `/api/v1/articles` | `POST` | Bearer | Create news article (emits SSE breaking news if flagged) |
| `/api/v1/articles/breaking` | `GET` | Public | Fetch latest breaking news |
| `/api/v1/articles/realtime/stream` | `GET` | Public | Real-time SSE stream |
| `/api/v1/articles/:idOrSlug` | `GET` | Public | Fetch article details & increment view count |
| `/api/v1/articles/:articleId/comments` | `GET` / `POST` | Public / Bearer | Fetch or post interactive comments |
| `/api/v1/watchlist` | `GET` / `POST` | Bearer | Fetch or save article to watchlist |
| `/api/v1/watchlist/:articleId` | `DELETE` | Bearer | Remove article from watchlist |

---

## 🧪 Verification Commands

- **Backend compilation**: `cd server && npm run build` (`tsc`)
- **Frontend compilation**: `cd client && npm run build` (`tsc && vite build`)
