# Bookstore Application

This is a full-featured bookstore application built using modern web technologies such as **Next.js**, **Prisma**, **TypeScript**, **Tailwind CSS**, and **Chakra UI**. The application allows users to purchase and borrow books, and chat with support. It integrates **Stripe** for seamless payment processing and uses **PostgreSQL** for the database. The application also features an admin interface for managing books, generating reports, and monitoring user interactions.

## Features

### User Features
- **Browse Books**: Users can browse books and view detailed information.
- **Purchase Books**: Stripe integration allows users to securely buy books.
- **Borrow Books**: Users can borrow books and view their borrowing history.
- **Chat Support**: A chat option is available for users to contact each other.
- **View Purchase/Borrow History**: Users can track their purchases and borrowings in their profile.

### Admin Features
- **Book Management**: Admins can post new books, approve book listings, and update or remove books.
- **Reports Generation**: Admins can generate reports to track user interactions and transactions.
- **Approve Borrow Requests**: Admins can manage book borrow requests and approve/deny them.
- **User Management**: Admins can monitor user activity and interactions with the platform.

## Tech Stack

### Frontend
- **Next.js**: A React framework for server-rendered applications.
- **TypeScript**: Ensures type safety throughout the application.
- **Tailwind CSS**: A utility-first CSS framework for designing the UI.
- **Chakra UI**: A component library for building a modern, accessible design system.

### Backend
- **Prisma**: An ORM used for interacting with the PostgreSQL database.
- **Stripe**: Used for handling payments securely.
- **PostgreSQL**: A powerful, open-source relational database used to store book data, user information, purchases, borrow history, etc.

### Real-time Communication
- **Chat Feature**: Provides a support channel for users to communicate with support staff.

## Setup and Installation

### Prerequisites
- **Node.js**: Ensure you have Node.js installed (version 16+).
- **PostgreSQL**: Make sure PostgreSQL is installed and running on your system.
- **Stripe Account**: You'll need a Stripe account for payment processing.

### Steps

1. **Clone the repository**:
    ```bash
    git clone (https://github.com/sarmad006/Book-Store.git)
    cd bookstore-app
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add the following variables:
    ```bash
    DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
    STRIPE_SECRET_KEY=your_stripe_secret_key
    ```

4. **Run database migrations**:
    Use Prisma to migrate the database schema:
    ```bash
    npx prisma migrate dev
    ```

5. **Run the application**:
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:3000`.

### Admin Setup
To access the admin functionalities, you can set up specific user roles in the database. Once a user is marked as an admin, they will have access to the admin panel.

## Database Schema

The PostgreSQL database schema is managed via Prisma and includes the following key entities:
- **User**: Stores user data like username, email, and role (user/admin).
- **Book**: Contains information about the book (title, author, price, availability).
- **StripePayments**: Stores payment details.
- **BorrowedBooks**: Stores borrowing history.
- **Reports**: Generated reports for admin review.

## Stripe Integration

- Stripe is used to handle book purchases. Payments are processed securely, and transaction data is stored in the `StripePayments` table.
- Make sure to add your Stripe keys to the environment variables and configure the `Stripe` instance in your application.

## Chat Functionality

The chat functionality allows users to engage in real-time conversations with support staff or administrators. This feature is built using **web sockets** or **Firebase**, and it is accessible from the user dashboard.

## Admin Panel

Admins can:
- Approve or reject new book listings.
- View reports of user interactions and transactions.
- Manage book borrow requests.
- Generate analytics reports.

The admin interface is accessible through a protected route and only visible to users with admin privileges.

## Borrowing Books

Users have the option to borrow books for a specified period, and admins can approve or deny these borrow requests. The borrowing process is tracked in the system, and users can view their borrowing history under their profile.

## Reports

Admins can generate reports detailing user activity such as:
- Total purchases
- Books borrowed
- User interactions with the site

These reports can be exported and viewed by users and admins alike.

## Styles and Theming

The application uses **Tailwind CSS** for utility-based styling and **Chakra UI** for reusable and accessible components. Custom theming is also supported via Chakra UI's theme configuration.

## Future Enhancements

- **Wishlist Feature**: Users can save books to a wishlist for future purchases.
- **User Reviews and Ratings**: Allow users to leave reviews and rate books.
- **Recommendation System**: Suggest books
