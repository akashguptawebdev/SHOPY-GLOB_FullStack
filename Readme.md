# ShoopyGlob

ShoopyGlob is a full-featured e-commerce application that allows users to explore products, add them to a cart, and place orders. The platform also includes admin functionalities to manage products, categories, and user orders. Built using the MERN stack with additional state management and authentication mechanisms, ShoopyGlob provides a seamless shopping experience.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Backend API](#backend-api)
- [Frontend Setup](#frontend-setup)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license)
- [Deployment](#deployment)

---

## Features

### User Features:
- User authentication and authorization using JWT
- Browse products by category
- Add products to cart and place orders
- View order history and account details
- Real-time product search functionality
- Responsive design for all devices

### Admin Features:
- Admin dashboard for managing products, categories, and orders
- Add, update, or delete products and categories
- Manage users and their roles

### Security:
- Password encryption using bcrypt
- Protected routes using JWT tokens
- Input validation for user registration and login

---

## Tech Stack

**Frontend**:  
- React.js
- Redux for state management
- MUI and Tailwind CSS for UI components and styling

**Backend**:  
- Node.js  
- Express.js  
- MongoDB (NoSQL Database)  
- JWT for authentication

---

## Installation

### Prerequisites

- Node.js (v14+)
- MongoDB (either local or cloud-based such as MongoDB Atlas)

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/akashguptawebdev/SHOPY-GLOB_FullStack
   cd shoopyglob/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:
   ```bash
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `frontend` directory with the following:
   ```bash
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the frontend development server:
   ```bash
   npm start
   ```

---

## Environment Variables

- `PORT`: Port number for backend (default: 5000)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for signing JWT tokens
- `REACT_APP_API_URL`: URL to connect frontend with the backend API

---

## Backend API

The backend API includes routes for:

- **Authentication**: User registration, login, token validation
- **Product Management**: CRUD operations on products
- **Cart Management**: Add items to cart, remove items
- **Order Management**: Place and view orders
- **Admin Panel**: Manage products, users, and orders

---

## Frontend Setup

The frontend is built using React, with Redux for state management. The application is styled using Material-UI and TailwindCSS for responsiveness and custom design.

---

## Running Tests

To run the tests for both backend and frontend:

### Backend
```bash
npm test
```

### Frontend
```bash
npm test
```

---

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue. Please make sure your code follows the project's guidelines and is properly tested before submitting.

---

## License

This project is licensed under the MIT License.

---

## Deployment

You can access the deployed application here:

- **Frontend**: [ShoopyGlob Frontend](https://shopy-glob-full-stack.vercel.app/)
- **Backend**: [ShoopyGlob Backend](https://shopy-glob-fullstack-1.onrender.com)

---

## GitHub Repository

You can find the source code here:

- **Repository**: [ShoopyGlob GitHub](https://github.com/yourusername/shoopyglob)

