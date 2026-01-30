# 📚 Book Catalog

A modern, full-stack web application for managing a book collection. Built with Node.js, Express, MongoDB, and React featuring JWT-based authentication and a beautiful dark-themed UI.

![Book Catalog](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)

## 🌟 What This Application Does

**Book Catalog** is a complete book management system that allows users to:

- **Browse Books** - View all books in the catalog without needing to sign up
- **Search & Filter** - Find books by title, author, or genre
- **User Registration** - Create an account with secure password hashing
- **User Login** - Authenticate and receive a JWT token for secure access
- **Add New Books** - Logged-in users can add books with title, author, genre, price, and stock status
- **Edit Books** - Update book information (authenticated users only)
- **Delete Books** - Remove books from the catalog (authenticated users only)

### 🎯 Key Features

| Feature | Description |
|---------|-------------|
| 🔐 **JWT Authentication** | Secure token-based authentication for protected routes |
| 🔒 **Password Security** | Passwords are hashed using bcrypt before storage |
| 📖 **Public Browsing** | Anyone can view books without signing in |
| ✏️ **Protected CRUD** | Create, Update, Delete operations require authentication |
| 🎨 **Modern Dark UI** | Beautiful glassmorphism design with smooth animations |
| 📱 **Responsive Design** | Works seamlessly on desktop and mobile devices |
| ⚡ **Rate Limiting** | API protection against abuse (100 requests per 15 minutes) |
| ✅ **Input Validation** | All inputs are validated on both client and server |

## 🏗️ Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│     React       │────▶│   Express API   │────▶│    MongoDB      │
│    Frontend     │◀────│    Backend      │◀────│    Database     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │
        │                       │
   Port 3000               Port 5000
```

## 📁 Project Structure

```
Book-Catalog/
├── server/                 # Backend API
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── controllers/
│   │   ├── userController.js    # Auth logic
│   │   └── bookController.js    # CRUD logic
│   ├── middleware/
│   │   ├── authMiddleware.js    # JWT verification
│   │   ├── validationMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── User.js        # User schema
│   │   └── Book.js        # Book schema
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── bookRoutes.js
│   ├── utils/
│   │   └── responseHelper.js
│   ├── .env.example
│   └── index.js           # Entry point
│
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── BookCard.js
│   │   │   └── BookModal.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Books.js
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.css
│   └── public/
│
└── README.md
```

## 🚀 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:-------------:|
| POST | `/api/users/register` | Register a new user | ❌ |
| POST | `/api/users/login` | Login and get JWT token | ❌ |

### Books
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:-------------:|
| GET | `/api/books` | Get all books | ❌ |
| GET | `/api/books/:id` | Get book by ID | ❌ |
| POST | `/api/books` | Create a new book | ✅ |
| PUT | `/api/books/:id` | Update a book | ✅ |
| DELETE | `/api/books/:id` | Delete a book | ✅ |

## 💻 Local Development

### Prerequisites
- Node.js v18 or higher
- MongoDB (local installation or MongoDB Atlas account)
- Git

### Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your values:
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/bookcatalog
# JWT_SECRET=your_super_secret_key_here
# JWT_EXPIRES_IN=7d
# CLIENT_URL=http://localhost:3000

# Start development server
npm run dev
```

### Frontend Setup

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## 🌐 Deployment

### Backend (Render)

1. Create account at [render.com](https://render.com)
2. New → Web Service → Connect GitHub repo
3. **Root Directory:** `server`
4. **Build Command:** `npm install`
5. **Start Command:** `node index.js`
6. Add environment variables:
   - `MONGO_URI` - MongoDB Atlas connection string
   - `JWT_SECRET` - Strong secret key
   - `JWT_EXPIRES_IN` - `7d`
   - `CLIENT_URL` - Your Vercel frontend URL

### Frontend (Vercel)

1. Create account at [vercel.com](https://vercel.com)
2. Import GitHub repository
3. **Root Directory:** `client`
4. **Framework:** Create React App
5. Add environment variable:
   - `REACT_APP_API_URL` - Your Render backend URL + `/api`

## 🧪 Test Credentials

```
Email: john@example.com
Password: Password123
```

## 📝 Environment Variables

### Server (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/bookcatalog` |
| `JWT_SECRET` | Secret for JWT signing | `your_super_secret_key` |
| `JWT_EXPIRES_IN` | Token expiration time | `7d` |
| `CLIENT_URL` | Frontend URL (for CORS) | `http://localhost:3000` |

### Client
| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:5000/api` |

## 🛠️ Technologies Used

**Backend:**
- Node.js & Express.js
- MongoDB with Mongoose ODM
- JSON Web Tokens (JWT)
- bcrypt for password hashing
- express-validator for input validation
- express-rate-limit for API protection

**Frontend:**
- React 19
- React Router DOM v6
- Axios for HTTP requests
- React Icons
- CSS with CSS Variables

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ by [Amplaytro](https://github.com/Amplaytro)
