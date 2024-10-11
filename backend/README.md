
# Naira to Crypto Service

A simple and efficient service that enables users to convert Naira to USDT and execute transfers via bank transfer. This application is built with Express, Ethers.js, and Nodemailer, making it easy to handle Ethereum transactions and send email notifications.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
  - [GET `/`](#get-)
  - [POST `/webhook`](#post-webhook)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Fast and Reliable Transfers:** Instant conversions from Naira to USDT and reliable transaction processing.
- **Email Notifications:** Users receive email confirmations after successful transfers.
- **Gnosis Safe Integration:** Securely manage funds and execute transactions via Gnosis Safe.
- **Dynamic Conversion Rate:** Fetches the latest USDT to Naira conversion rate from CoinGecko.

## Technologies Used

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Ethers.js](https://docs.ethers.io/v5/)
- [Nodemailer](https://nodemailer.com/)
- [MongoDB](https://www.mongodb.com/)
- [Gnosis Safe](https://gnosis-safe.io/)
- [CoinGecko API](https://www.coingecko.com/en/api)

## Getting Started

### Prerequisites

- Node.js installed on your machine
- MongoDB database for storing user and transaction data
- Access to the Ethereum network (Infura or Alchemy)
- Gnosis Safe Address is at https://sepolia.basescan.org/address/0x1193e35A5D7ae8064BDF7dA655Cf6af1724C803F
- USDT Testnet Token at: https://sepolia.basescan.org/address/0x323e78f944A9a1FcF3a10efcC5319DBb0bB6e673

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/taofeek-ob/naira-to-crypto.git
   cd naira-to-crypto
   cd backend
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Create a `.env` file in the root directory and add your environment variables (see [Configuration](#configuration)).

4. Start the server:

   ```bash
   bun run index.js
   ```

## Configuration

Create a `.env` file in the root directory and include the following variables:

```env
PORT=3000
SAFE_ADDRESS=your_gnosis_safe_address
PROVIDER_URL=https://your.ethereum.provider.url
PRIVATE_KEY=your_private_key
USDT_TOKEN_ADDRESS=your_usdt_token_contract_address
COINGECKO_API_KEY=your_coingecko_api_key
```

## API Endpoints

### GET `/`

- **Description:** Returns a simple "Hello World!" message.
- **Response:** `200 OK` with message.

### POST `/webhook`

- **Description:** Receives payment notifications and processes transactions.
- **Request Body:**

  ```json
  {
    "data": {
      "amount": <amount_in_naira>,
      "customer": {
        "email": "<customer_email>"
      }
    }
  }
  ```

- **Response:** 
  - `200 OK` with transaction hash on success.
  - `500 Internal Server Error` on failure.

## Usage

1. Make a POST request to the `/webhook` endpoint with the payment data to trigger the conversion and transfer process.
2. Users will receive an email notification upon successful completion of the transfer to their registered wallet address.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'add: new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
