# Book Catalog API

A full-stack Book Catalog application with JWT authentication built using Node.js, Express, MongoDB, and React.

## Features

- 🔐 **User Authentication** - Register and login with JWT tokens
- 📚 **Book Management** - Full CRUD operations for books
- 🎨 **Modern UI** - Beautiful dark theme with glassmorphism effects
- 🔒 **Protected Routes** - Edit/Delete operations require authentication
- ⚡ **Rate Limiting** - API protection against abuse

## Tech Stack

**Backend:**
- Node.js & Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

**Frontend:**
- React 19
- React Router DOM
- Axios for API calls
- React Icons

## Project Structure

```
Book Catalog API/
├── server/              # Backend API
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Auth, validation, error handling
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── utils/           # Helper functions
│   └── index.js         # Entry point
│
├── client/              # React Frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── context/     # Auth context
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service
│   │   └── App.js       # Main app
│   └── public/
│
└── README.md
```

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/users/register | Register user | ❌ |
| POST | /api/users/login | Login user | ❌ |
| GET | /api/books | Get all books | ❌ |
| GET | /api/books/:id | Get book by ID | ❌ |
| POST | /api/books | Create book | ✅ |
| PUT | /api/books/:id | Update book | ✅ |
| DELETE | /api/books/:id | Delete book | ✅ |

## Local Development

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/bookcatalog
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d
```

Start the server:
```bash
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm start
```

The app will be available at http://localhost:3000

## Deployment

### Backend (Render/Railway/Heroku)

1. Set environment variables:
   - `PORT`
   - `MONGO_URI` (MongoDB Atlas connection string)
   - `JWT_SECRET`
   - `JWT_EXPIRES_IN`
   - `CLIENT_URL` (your frontend URL)

2. Deploy using Git or CLI

### Frontend (Vercel/Netlify)

1. Set environment variable:
   - `REACT_APP_API_URL` = your backend URL + `/api` (e.g., `https://your-api.onrender.com/api`)

2. Build command: `npm run build`
3. Publish directory: `build`

## Test Credentials

```
Email: john@example.com
Password: Password123
```

## License

MIT
