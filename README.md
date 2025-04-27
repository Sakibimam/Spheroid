# 🌐 Spheroid: Payment 3.0

Spheroid is onchain payment platform and loyalty protocol designed to make it easy for businesses to accept cryptocurrency payments and distribute loyalty onchain

## ✨ Features

- Users and merchants can sign up using just their email address, with automatic smart wallet creation
- We sponsor gas fees for merchants new to web3, reducing barriers to entry
- Merchants can create personalized loyalty tokens by simply uploading an image and providing basic details
- Automatic loyalty token rewards for customers on every purchase
- Accept payments via Visa card with automatic crypto conversion using onramp services
- Track top customers and manage reward distributions

## Sponsers

### Base

We are using base to delpoy all the contracts used by this app and usinng the payment system provided by base.

### Coinbase

We are using coinbase developer tool as a chery onn top for base to enhance the experience of the user. We are using this to make smart wallets for users.

### Sign Protocol

We are utilizing custom hooks of sign protocol for loyalty point distribution across users. Also we are attesting the users purchases on chain so that we can categorize users in future.

### Dynamic

We are using the wallet connnect and non pop up signing of dynamic to make the experience of the user more smooth.

### CurveGrid

We are using CurveGrid's Multibass to make custom webhooks to read data from our contract.

### Blockscout

We are using the Blockscout contract verification.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or later)
- pnpm (v8 or later)
- Git

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Sakibimam/Spheroid.git
cd monorepo
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

```env
ANALYZE=false
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_LIGHTHOUSE_API_KEY=your_lighthouse_key
PRIVATE_KEY=your_wallet_private_key
```

4. **Start the development server**

```bash
pnpm run dev
```

Visit `http://localhost:3000` to see your application running.

## 🛠 Technology Stack

- **Frontend**: Next.js, React, TailwindCSS
- **Blockchain**: Ethereum, Smart Contracts
- **Storage**: Lighthouse
- **Authentication**: Dyanmic and Coinbase
- **Payment Processing**: Using Coinbase onramp payment

## 📱 Key Components

### For Users

- Email-based signup with automatic wallet creation
- Simple payment process using familiar methods
- User can earn loyalty tokens set by the merchant
- User can just scan to pay the bill

### For Merchants

- Easy onboarding with email signup
- Merchants can create their own loaylty token with just uploading the image, name and symbol
- later they can set the giveaway of their token on every sale to the custommer
- Gas-sponsored transactions for newcomers

## 🔧 Configuration

### Environment Variables

| Variable                       | Description                | Required |
| ------------------------------ | -------------------------- | -------- |
| ANALYZE                        | Bundle analysis flag       | Yes      |
| NEXT_PUBLIC_API_URL            | Backend API endpoint       | Yes      |
| NEXT_PUBLIC_LIGHTHOUSE_API_KEY | Lighthouse storage API key | Yes      |
| PRIVATE_KEY                    | Wallet private key         | Yes      |

## 🔐 Security

- Never commit your `.env.local` file
- Keep your private keys secure
- Regularly update dependencies
- Report security issues through our bug bounty program

## 📝 License

This project is licensed under the MIT License.

## 🙋‍♂️ Support

Need help? Feel free to:

- Open an issue
- Join our Discord community
- Check our FAQ section
- Contact support at support@spheroid.com

## 🌟 Acknowledgments

- Thanks to all our contributors
- Special thanks to our early adopters and testers
- Built with support from the web3 community

---

Made with ❤️ by the Spheroid Team
