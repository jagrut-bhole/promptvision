# AI Image Generation Website

A full-stack web application for AI image generation and community sharing built with React.js and Node.js. and PollinationAI

## Features

- **AI Image Generation** - Generate images from text prompts using Pollinations AI
- **Community Sharing** - Share your creations with the community
- **User Authentication** - Secure JWT-based authentication
- **Multiple Art Styles** - Choose from various artistic styles
- **User Profiles** - View your own generated images

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

### Environment Setup

Create .env file in server directory with these variables:

```env
# Server Configuration
PORT=8000

# Database Configuration
MONGODB_URI=<DataBase Link>

# JWT Configuration
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=

ACCESS_TOKEN_EXPIRY=
REFRESH_TOKEN_EXPIRY=

# POLLINATION AI Api Key
POLLINATION_AI_API_KEY=

go and take the api key from here:- https://enter.pollinations.ai/
```

### Install Dependencies and run 

#### Backend
```bash
cd server
npm install
npm run start
```

#### Frontend
```bash
cd client 
npm install
npm run dev
```

### Access the Application
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

## Project Structure

```
ImageGen/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── lib/            # Utilities
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middlewares/    # Custom middlewares
│   │   └── utils/          # Utility functions
└── README.md
```