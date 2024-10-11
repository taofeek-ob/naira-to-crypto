

# Naira to Crypto App

A full-stack decentralized application that allows users to convert Naira to cryptocurrency (e.g., USDT) by interacting with a blockchain wallet and unique bank account. The app leverages a wallet connection, transaction verification, and an intuitive dashboard for tracking balances and transactions. It uses modern technologies on both the frontend and backend to deliver a secure and user-friendly experience.
Built for the [Coinbase Base Africa Buildathon](https://based-africa.devfolio.co)

**Live Demo**: [Naira to Crypto App](https://nairatocrypto.vercel.app)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Setup](#setup)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Running the App](#running-the-app)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview

The **Naira to Crypto App** enables users to link their wallets, manage transactions, and check balances in both Naira and crypto (USDT). It is designed with security in mind, featuring a decentralized wallet connection using Wagmi, integrated blockchain transactions, and backend APIs for managing users and verifying transactions.

The repository is divided into two main sections:
- **Frontend**: User interface and wallet integration using Next.js.
- **Backend**: REST API built with Node.js and MongoDB to handle database queries and authentication.

## Features

- Wallet authentication with **Wagmi** and **OnchainKit** (Sign-In with Ethereum)
- Fetch user information and display bank account details
- Convert Naira to cryptocurrency via a secure transaction
- Display user balances (Naira, USDT) and transaction history
- Blockchain integration with Sepolia Testnet for transaction validation
- Responsive and user-friendly dashboard

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, Wagmi, OnchainKit
- **Backend**: Node.js, MongoDB, RESTful APIs
- **Blockchain**: Sepolia Testnet, Gnosis Safe
- **Deployment**: Vercel (Frontend), Custom/Cloud (Backend)

## Project Structure

The project is divided into two major parts: the frontend (Next.js) and the backend (Node.js + MongoDB). Below is an overview of how these are structured.

### Frontend

Located in the `frontend` directory, this part of the app is built using **Next.js** with the **App Router** for routing and authentication. It handles the user interface, wallet connections, and data fetching.

#### Key Features:

- **Wallet Authentication**: The frontend uses **Wagmi** and **OnchainKit** to handle wallet sign-in, allowing users to log in using their crypto wallets.
- **Responsive UI**: Built with **Tailwind CSS**, the app is responsive, ensuring a smooth experience on both mobile and desktop devices.
- **Dashboard**: Displays user data such as balances, bank account details, and transaction history.
- **API Integration**: The frontend communicates with the backend via RESTful API calls for fetching user data, transactions, and wallet details.

#### Frontend Structure:
```
/frontend
  /app
    /dashboard/[address]  # Dynamic route for user dashboard based on wallet address
    /login                # Wallet login page
    /api                  # API routes that interface with backend
    /actions.js            # API request and action handlers
  /components
    Button.jsx            # Reusable button component
    Card.jsx              # Displays user info (balance, transactions)
    Navbar.jsx            # Navigation bar for the app
  /lib
    mongodb.js            # MongoDB connection helper
 
```

### Backend

The backend is located in the `backend` directory and is responsible for automated transfer conversion, managing user data, wallet verification, and transaction logging. It connects to **MongoDB** and exposes **REST API endpoints** for the frontend to communicate.

#### Key Features:

- **User Authentication**: Uses signed Ethereum messages for user verification and authentication.
- **MongoDB Integration**: Manages user data, transaction history, and bank details.
- **Transaction Handling**: Automated Naira conversion to USDT and logging transactions.
- **API Endpoints**: RESTful APIs handle requests such as fetching user data by wallet address, fetching transaction history, and user sign-up.

#### Backend Structure:
```
/backend
  /lib
    /user                 # MongoDB schema for user data
    /transactions         # MongoDB schema for transaction logs
   /mongodb               # Helper functions for accessing database

 /index.js                # Backend entrypoint containing webhook

```

## Setup

To run the Naira to Crypto app locally, follow the steps below for both the frontend and backend.

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/taofeek-ob/naira-to-crypto.git
   cd naira-to-crypto/frontend
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd naira-to-crypto/backend
   ```

2. Install dependencies:
   ```bash
   bun install
   ```


## Running the App

### Frontend

To start the frontend development server, run:

```bash
npm run dev
```

The frontend will be accessible at `http://localhost:3000`.

### Backend

To start the backend server, run:

```bash
npm start
```

The backend will run on `http://localhost:5000` or the specified port in your `.env` file.

## Deployment

### Frontend Deployment

The frontend is optimized for deployment on Vercel. To deploy:

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Run the deployment command:
   ```bash
   vercel
   ```

### Backend Deployment

For backend deployment, you can use services such as Heroku, Render, DigitalOcean, or a custom cloud solution. Ensure your MongoDB database is accessible, and your environment variables are correctly set.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch.
3. Open a pull request with detailed information about your changes.
