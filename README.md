# Ruthful Hearts Merch Store Backend

## Description

The Ruthful Hearts Merch Store Backend serves as the robust core powering an online merchandise store. Built using **Node.js** and **Hono**, this backend system efficiently handles the following key functionalities:

- **Product Catalog Management**: Seamless management of product listings, including descriptions, images, pricing, and inventory.
- **User Authentication and Authorization**: Secure mechanisms for customer accounts and admin access.
- **Shopping Cart**: Intuitive shopping cart functionality to add, remove, and modify items.
- **Order Processing**: Comprehensive order handling, including payment processing, shipping, and order tracking.
- **Payment Integration**: Integration with payment gateways like Stripe and PayPal for secure transactions.
- **Inventory Management**: Real-time tracking and adjustment of product inventory.
- **Admin Dashboard**: A centralized interface for managing products, orders, customers, and settings.

The backend is designed for **scalability**, **security**, and **maintainability**, ensuring a seamless experience for both customers and store administrators.

---

## Table of Contents

- [Ruthful Hearts Merch Store Backend](#ruthful-hearts-merch-store-backend)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation Instructions](#installation-instructions)
    - [Prerequisites](#prerequisites)
    - [Setup/Installation Steps](#setupinstallation-steps)
    - [Configuration](#configuration)
  - [Usage Instructions](#usage-instructions)
    - [Running the Server](#running-the-server)
    - [API Endpoints](#api-endpoints)
      - [Product Endpoints](#product-endpoints)
      - [User Endpoints](#user-endpoints)
      - [Cart Endpoints](#cart-endpoints)
      - [Order Endpoints](#order-endpoints)
  - [Testing Instructions](#testing-instructions)
    - [Running Tests](#running-tests)
    - [Test Coverage](#test-coverage)
  - [Contributing](#contributing)
    - [Guidelines](#guidelines)
    - [Code Style](#code-style)
  - [License](#license)
  - [Credits/Attribution](#creditsattribution)
  - [Contact Information](#contact-information)
  - [Links](#links)
  - [Project Structure](#project-structure)

---

## Features

- **Product Catalog Management**: Manage product descriptions, images, pricing, and stock.
- **Secure Authentication**: Customer and admin account handling with JWT-based authentication.
- **Shopping Cart**: Add, remove, and modify items in the cart.
- **Order Processing**: Handles payment, shipping, and tracking.
- **Payment Gateways**: Supports Stripe and PayPal for transactions.
- **Inventory Management**: Monitors product stock levels and updates automatically.
- **Admin Dashboard**: Centralized control for store operations.

---

## Installation Instructions

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v14.x or later)
- **npm** (v6.x or later) or **Yarn**
- **MongoDB** (v4.x or later)

### Setup/Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ruthful-hearts-merch-store-backend.git
   cd ruthful-hearts-merch-store-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```
   Fill in the necessary environment variables (see [Configuration](#configuration)).

4. Run database migrations:
   Ensure your MongoDB server is running and execute:
   ```bash
   npm run migrate
   ```

### Configuration

In your `.env` file, configure the following environment variables:

- **PORT**: Port number for the server.
- **JWT_SECRET**: Secret key for JWT-based authentication.
- **MONGODB_URI**: MongoDB connection string.
- **STRIPE_SECRET_KEY**: Stripe API secret key.
- **STRIPE_PUBLISHABLE_KEY**: Stripe API publishable key.

Add other variables specific to your payment gateway and email services as needed.

---

## Usage Instructions

### Running the Server

Start the server using:
```bash
npm start
```
The server will run at the port specified in the `.env` file.

### API Endpoints

#### Product Endpoints
- `GET /api/products` - Fetch all products.
- `GET /api/products/:productId` - Fetch a specific product.
- `POST /api/products/create` - Add a new product.
- `PUT /api/products/:productId/update` - Update an existing product.
- `DELETE /api/products/:productId/delete` - Remove a product.

#### User Endpoints
- `POST /api/users/register` - Register a new user.
- `POST /api/users/login` - Authenticate a user.
- `GET /api/users/profile` - Retrieve user profile details.
- `PUT /api/users/update-profile` - Update user profile.

#### Cart Endpoints
- `GET /api/cart` - Retrieve the user's cart.
- `POST /api/cart/add` - Add a product to the cart.
- `DELETE /api/cart/remove` - Remove a product from the cart.
- `PUT /api/cart/update` - Modify the quantity of a product in the cart.

#### Order Endpoints
- `GET /api/orders` - Fetch all user orders.
- `POST /api/orders/create` - Place a new order.
- `GET /api/orders/:orderId` - Retrieve a specific order.

---

## Testing Instructions

### Running Tests

Run the test suite using:
```bash
npm test
```

### Test Coverage

Comprehensive test cases are included for all major components (controllers, services, and models). Ensure all tests pass before submitting a pull request.

---

## Contributing

### Guidelines

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/my-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add my feature'
   ```
4. Push your branch:
   ```bash
   git push origin feature/my-feature
   ```
5. Open a pull request.

### Code Style

- Use **ESLint** for linting.
- Use **Prettier** for code formatting.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Credits/Attribution

- **Author**: [Your Name](https://github.com/yourusername)
- **Acknowledgments**:
  - **Node.js** - Server runtime.
  - **MongoDB** - NoSQL database.
  - **Mongoose** - MongoDB ORM.
  - **Jest** - Testing framework.
  - **Stripe** - Payment gateway.

---

## Contact Information

**Maintainer**: Ruthful Hearts  
**Email**: [Your Email Address]

---

## Links

- [Project Repository](https://github.com/yourusername/ruthful-hearts-merch-store-backend)

---

## Project Structure

```
src/
  controllers/    # Handles HTTP requests and responses
  models/         # Data models
  routes/         # API routes
  services/       # Business logic and services
  utils/          # Utility functions
  config/         # Configuration and constants
  middleware/     # Request processing middleware
  database/       # Database connections and definitions
  tests/          # Unit and integration tests
app.js            # Hono.js app instance setup
index.js          # Entry point for the server
.env              # all environment variables and secret keys storage
package.json      # Dependencies and scripts
```
``` 

This updated version is polished, professional, and ready to be included in a repository or documentation. Let me know if you need any further adjustments!