# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript reviews aggregator application with a Node.js Express backend. The frontend is built with Vite and uses React Router, Tailwind CSS, and Lucide React icons. The backend provides JSON-based data storage with JWT authentication.

## Architecture

### Frontend Structure
- **Framework**: React 18 + TypeScript with Vite build tool
- **Routing**: React Router DOM v7 for client-side routing
- **Styling**: Tailwind CSS with PostCSS
- **State Management**: React Context for authentication
- **Icons**: Lucide React
- **SEO**: React Helmet Async for meta tags

### Backend Structure  
- **Server**: Express.js (CommonJS module in `server/index.cjs`)
- **Authentication**: JWT with bcryptjs for password hashing
- **Data Storage**: JSON files (`server/data/reviews.json`, `server/data/users.json`)
- **CORS**: Configured to allow all origins for development

### Key Components
- `src/context/AuthContext.tsx` - Authentication state management
- `src/config/api.ts` - Centralized API endpoint configuration
- `src/components/Layout.tsx` - Main layout wrapper
- `src/pages/` - Route components (Home, CompanyPage, CategoryPage, etc.)

## Development Commands

### Frontend (root directory)
```bash
npm run dev          # Start development server with Vite
npm run build        # Build for production  
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### Backend (server directory)
```bash
cd server
npm run dev          # Start with nodemon (auto-restart)
npm start           # Start production server
node index.cjs      # Direct server start
```

## Environment Configuration

### Development
- Frontend proxy configured in `vite.config.ts` routes `/api` to `http://localhost:3001`
- Backend runs on port 3001 by default

### Production/VPS Deployment
Create `.env` file in root:
```bash
VITE_API_URL=http://your-vps-ip:3001
```

Then rebuild frontend:
```bash
npm run build
```

## API Structure

All API endpoints are prefixed with `/api`:
- `GET /api/reviews` - All reviews (sorted by date)
- `GET /api/reviews/company/{name}` - Company-specific reviews  
- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration
- `POST /api/reviews` - Create review (requires auth)

## Data Flow

The application was recently migrated from static file access to proper API usage. All frontend requests now go through the centralized API configuration in `src/config/api.ts` rather than directly accessing JSON files.

## Testing Server

Use the test endpoint to verify server connectivity:
```bash
curl http://localhost:3001/test
# or for VPS:
curl http://your-vps-ip:3001/test
```