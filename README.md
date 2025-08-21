# DoctorHelp 

A full-stack web application that allows users to seamlessly book and manage appointments. The system is built using Node.js, Express, MongoDB, and React.

## Features

- Secure user authentication using **JWT**
- Role-based access: **Patient** & **Admin**
- Patients can view available slots and book appointments
- Patients can view their own bookings
- Admins can view and manage all bookings
- Prevents double-booking for the same time slot
- Responsive UI that works on mobile and desktop

## Tech Stack

- **Backend:** Node.js + Express  
- **Database:** MongoDB (Mongoose)  
- **Auth:** JSON Web Tokens (JWT)  
- **Frontend:** React.js  
- **Styling:** CSS

## Prerequisites

Ensure you have the following installed locally:

- [Node.js](https://nodejs.org/) (includes `npm`)  
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/appointmentDB
   JWT_SECRET=your-secret-key-here
   NODE_ENV=development
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:3000`

### Frontend Setup

## API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Slots
- `GET /api/slots` - Get available slots (query params: from, to)
- `POST /api/slots/generate` - Generate slots (admin only)

### Bookings
- `POST /api/bookings` - Book a slot (protected)
- `GET /api/bookings/my-bookings` - Get user's bookings (protected)
- `GET /api/bookings/all` - Get all bookings (admin only)
- `PUT /api/bookings/:bookingId/cancel` - Cancel a booking (protected)

## Test Credentials

### Admin
- Email: admin@example.com
- Password: Passw0rd!

### Patient
- Email: patient@example.com
- Password: Passw0rd!

## Deployment

### Backend
1. Set up a MongoDB Atlas database and update the `MONGO_URI` in `.env`
2. Deploy to a platform like Render, Heroku, or Railway


## Project strucuture 
Wundrsight-Assignment/
├── backend/
│   ├── src/
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   └── package.json
├── .gitignore
└── README.md

