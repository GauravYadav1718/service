# GigFlow - Smart Leads Dashboard

A full-stack Lead Management Dashboard built with the MERN stack and TypeScript.

## Features

- **Authentication System**: JWT-based user registration and login with role-based access control (Admin, Sales User).
- **Leads Management**: Complete CRUD operations for leads (Name, Email, Status, Source).
- **Advanced Filtering & Search**: Debounced search by name/email, combined with filters for status and source, and sorting.
- **Pagination**: Server-side pagination (10 records per page).
- **Export**: Export leads data to CSV.
- **Modern UI**: Responsive, beautiful dashboard built with Tailwind CSS, including Dark Mode support and loading/empty states.
- **Dockerized**: Easy setup with Docker and Docker Compose.

## Tech Stack

**Frontend**: React, TypeScript, Vite, Tailwind CSS, React Router DOM, Axios, Lucide React
**Backend**: Node.js, Express.js, TypeScript, MongoDB, Mongoose, JWT, bcrypt

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- MongoDB (running locally or via Docker)
- Docker & Docker Compose (optional but recommended)

### 1. Using Docker (Recommended)

1. Rename `.env.example` to `.env` in the root and fill in any required variables.
2. Run the application:
   ```bash
   docker-compose up --build
   ```
3. The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:5000`.

### 2. Manual Setup

#### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory (refer to `.env.example`).
4. Start the development server:
   ```bash
   npm run dev
   ```

#### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` directory with:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the frontend:
   ```bash
   npm run dev
   ```

## API Documentation

- `POST /api/auth/register`: Register a new user (Body: name, email, password, role)
- `POST /api/auth/login`: Login user (Body: email, password)
- `GET /api/leads`: Get leads with pagination, search, sorting, and filtering
- `POST /api/leads`: Create a new lead
- `PUT /api/leads/:id`: Update an existing lead
- `DELETE /api/leads/:id`: Delete a lead (Admin only)
