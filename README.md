# AI Image Generation Website

A full-stack web application for AI-powered image generation and community sharing built with React.js and Node.js.

## Features

- 🎨 **AI Image Generation** - Generate images from text prompts using Pollinations AI
- 👥 **Community Sharing** - Share your creations with the community
- 🔐 **User Authentication** - Secure JWT-based authentication
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- 🎭 **Multiple Art Styles** - Choose from various artistic styles
- 📊 **User Profiles** - View your own generated images

## Tech Stack

### Frontend
- React.js 19
- TailwindCSS
- React Router DOM
- Axios
- Framer Motion
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ImageGen
```

### 2. Install Dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd client
npm install
```

### 3. Environment Setup

Create a `.env` file in the `server` directory with the following variables:

```env
# Server Configuration
PORT=8000
CORS_ORIGIN=http://localhost:5173

# Database Configuration
MONGODB_URI=<Your DataBase Link>

# JWT Configuration
ACCESS_TOKEN_SECRET=your_access_token_secret_key_here_make_it_very_long_and_secure
REFRESH_TOKEN_SECRET=your_refresh_token_secret_key_here_make_it_very_long_and_secure
ACCESS_TOKEN_EXPIRY=expiry_should_be_short_term
REFRESH_TOKEN_EXPIRY=expiry_should_be_long_term
```

### 4. Start MongoDB
Make sure MongoDB is running on your system.

### 5. Start the Application

#### Start manually

Terminal 1 (Backend):
```bash
cd server
npm start
```

Terminal 2 (Frontend):
```bash
cd client
npm run dev
```

### 6. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Images
- `GET /api/images` - Get all community images
- `POST /api/images/generate` - Generate AI image
- `POST /api/images/share` - Share image with community
- `GET /api/images/user/:userId` - Get user's images

## Usage

1. **Register/Login** - Create an account or sign in
2. **Browse Community** - View shared images from other users
3. **Create Art** - Generate new AI images with custom prompts
4. **Share** - Share your creations with the community
5. **Profile** - View your own generated images

## Project Structure

```
ImageGen/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── lib/          # Utilities
├── server/                # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   ├── middlewares/  # Custom middlewares
│   │   └── utils/        # Utility functions
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request