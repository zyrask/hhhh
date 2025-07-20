# codexyn Portfolio Website

## Overview

This is a modern, dark-themed portfolio website for codexyn, a Discord bot developer specializing in Python and Node.js. The application is built as a full-stack web application with React frontend and Express backend, featuring a progress tracker system and secret code functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with separate client and server directories, sharing common schemas and types. It uses a modern React frontend with Express.js backend and PostgreSQL database.

### Directory Structure
- `/client` - React frontend application
- `/server` - Express.js backend API
- `/shared` - Common schemas and types
- `/attached_assets` - Static assets and requirements

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **UI Library**: Radix UI components with custom styling
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **File Uploads**: Multer for image handling
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful endpoints with proper error handling

### Database Schema
- **Users Table**: Basic user authentication (id, username, password)
- **Progress Updates Table**: Content management for project updates (id, title, description, date, status, tags, imageUrl, timestamps)

### UI Design System
- **Color Scheme**: Dark theme with black/gray backgrounds and red accents
- **Typography**: Inter font family for modern appearance
- **Components**: Custom components built on Radix UI primitives
- **Animations**: Subtle CSS transitions and hover effects

## Data Flow

1. **Initial Load**: Client fetches progress updates from `/api/progress-updates`
2. **Secret Code**: Client-side keypress listener activates edit mode with code "9017598429"
3. **Content Management**: Edit mode allows CRUD operations on progress updates
4. **File Uploads**: Images uploaded to `/uploads` directory via multer
5. **Real-time Updates**: TanStack Query handles cache invalidation and refetching

## External Dependencies

### Frontend Dependencies
- React ecosystem (React, React DOM, React Router via Wouter)
- TanStack Query for data fetching and caching
- Radix UI for accessible component primitives
- Tailwind CSS for styling utilities
- Lucide React for icons

### Backend Dependencies
- Express.js for web server
- Drizzle ORM for database operations
- Neon Database serverless driver for PostgreSQL
- Multer for file upload handling
- Zod for schema validation

### Development Tools
- TypeScript for type safety
- Vite for frontend tooling
- ESBuild for backend bundling
- Drizzle Kit for database migrations

## Deployment Strategy

### Development Mode
- Vite dev server handles frontend with HMR
- Express server runs separately with file watching via tsx
- Database operations use development credentials

### Production Build
1. Frontend built with `vite build` to `/dist/public`
2. Backend bundled with ESBuild to `/dist/index.js`
3. Static files served by Express in production
4. Environment variables control database connections

### Database Management
- Schema defined in `/shared/schema.ts`
- Migrations generated in `/migrations` directory
- Database push via `drizzle-kit push` command

The application is designed to be deployed on platforms that support Node.js with PostgreSQL, with environment variables for database configuration and file storage paths.