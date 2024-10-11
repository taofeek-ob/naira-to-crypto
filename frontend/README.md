# Naira to Crypto App

A decentralized application (DApp) that automates Naira-to-USDT conversion by assigning users a unique bank account. Any transfer to this account is automatically converted to USDT in the user's registered wallet. The app integrates blockchain technologies, enabling wallet sign-in, transaction verification, and history tracking. Built on Base Sepolia using Coinbase OnchainKit, Smart Wallet, Gnosis Safe, Next.js, and MongoDB.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Components](#components)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- Sign in with wallet using [OnChainKit](https://onchainkit.xyz/) and [Wagmi](https://wagmi.sh)
- Verify wallet address with the backend
- Display user balances in Naira and USDT
- Automated conversion of any naira transfer to user personlaised bank account to USDT
- Fetch and display bank account information
- Integration with [Sepolia](https://sepolia.basescan.org/) testnet to track transactions
- Responsive design with multiple card layouts for user dashboard
- Transaction history displayed with links to the Sepolia explorer

## Project Structure

The project is structured to separate concerns and make the application scalable and easy to maintain. Below is a high-level overview of the folder structure.

```
        ├── LICENSE
        ├── README.md
        ├── public
        ├── src
        │   ├── app
        │   ├── components
        │   ├── lib
        │   ├── models

```

### `/app`

This folder contains the main application pages, including routing and authentication logic for verifying users.
- `/page.jsx`: The landing page.
- `/dashboard/[address]`: Handles the user dashboard and displays user information (balance, bank account, transactions).
- `/login`: Wallet sign-in functionality using Sign-In With Ethereum (SIWE).
- `/signup`: New user registration.
- `/api/`: Backend API routes for authentication and transaction verification.
- `actions.js`: Contains functions like `checkUserExists()` and user verification.

### `/components`

All reusable UI components are located here. These include:
- `Button`: A reusable button component using ShadCN's [UI Library](https://shadcn.dev).
- `Card`: Modular UI for displaying user information (balances, bank accounts, etc.).
- `LoginButton`: Handles wallet connection using Wagmi.
- `Navbar`: Main navigation component.

### `/lib`

Contains helper functions for MongoDB, user fetching, and transaction handling.
- `mongodb.js`: Handles MongoDB connection and database queries.
- `flutterwave.js`:Flutterwave helper functions to generate virtual account.

### `/public`

Contains static assets such as images, icons, and fonts.

## Tech Stack

- **Frontend**: Next.js 13 (App Router), React, OnchainKit, ShadCN UI
- **Backend**: Node.js, MongoDB, Flutterwave,
- **Blockchain Integration**: Wagmi, SIWE, Gnosis Safe, Base Sepolia Testnet
- **API**: RESTful API for user and transaction management

## Setup

To run this project locally, follow these steps:

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas or a local MongoDB instance
- A wallet (e.g., Coinbase Wallet) connected to Sepolia Testnet

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/taofeek-ob/naira-to-crypto.git
   cd naira-to-crypto
   cd frontend
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

### Environment Variables

Create a `.env.local` file in the root directory to store sensitive information. The required environment variables include:

```
NEXT_PUBLIC_MONGODB_URI=<your_mongodb_connection_string>
NEXT_PUBLIC_SEPOLIA_RPC_URL=<your_sepolia_rpc_url>

```

## Running the App

To start the development server:

```bash
bun run dev
```

Navigate to `http://localhost:3000` to access the app.

## Folder Structure

### `/app`

Handles routing, API endpoints, and authentication logic:
- **Login**: The login page allows users to sign in using their wallet.
- **Dashboard**: Displays the user's wallet details and transaction history.
- **API**: The API folder contains the server-side logic for verifying signatures and interacting with MongoDB.

### `/components`

Contains all the reusable components:
- **Button**: Standard button used throughout the app.
- **Card**: UI component for displaying wallet balances, bank account, and other user details.
- **LoginButton**: Handles wallet authentication using Wagmi.

### `/lib`

The `/lib` directory contains helper utilities for database and authentication:
- **mongodb.js**: Manages MongoDB connections.
- **flutterwave.js**: Contains backend logic for interaction with flutterwave.

## API Endpoints

- `POST /api/verify`: Verifies the signed wallet message and checks its validity.
- `GET /api/user/:address`: Fetches user data by wallet address.

## Components

### DashboardComponent

This component displays:
- User's total balance in Naira and USDT
- User's bank account details (bank name and account number)
- User's wallet address (with a link to Sepolia Explorer)
- Recent transactions

### LoginButton

Handles wallet connection using Wagmi and redirects the user to the dashboard after successful login.

### Card

Used to display user data in a responsive grid format.

## Deployment

### Vercel

This project is optimized for deployment on [Vercel](https://vercel.com/). You can deploy your own version by following these steps:

1. Install the Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Run the deployment command:
   ```bash
   vercel
   ```

### Custom Deployment

If you prefer custom deployment (e.g., Docker, DigitalOcean), make sure the environment variables are correctly configured and your MongoDB instance is accessible.

## Contributing

We welcome contributions to this project! To contribute:

1. Fork the repository.
2. Create a feature branch.
3. Submit a pull request detailing your changes.

### Development

- Run the app locally using `bun run dev`.
- Write unit tests for new features.
- Ensure the app is responsive and works across multiple devices.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

