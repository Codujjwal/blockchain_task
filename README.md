# ICP Token Wallet Prototype

A frontend prototype of an Internet Computer Protocol (ICP) token wallet with simulated functionality. This project demonstrates a modern web application for managing ICP tokens with features like sending, receiving, and transaction history.

## Features

- User authentication (login/register)
- View wallet balance
- Send tokens to other users
- Receive tokens via username
- Transaction history
- Wallet locking mechanism

## Tech Stack

- Frontend: React with TypeScript
- UI Components: shadcn/ui
- State Management: React Query
- Routing: Wouter
- Forms: React Hook Form with Zod validation
- Styling: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd icp-wallet-prototype
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open http://localhost:5000 in your browser

### Demo Account

You can use the following demo account to test the application:
- Username: demo
- Password: password123

## Project Structure

```
├── client/              # Frontend source code
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── contexts/    # React contexts
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utility functions
│   │   └── pages/       # Application pages
├── server/              # Backend source code
│   ├── routes.ts        # API routes
│   └── storage.ts       # In-memory storage implementation
└── shared/              # Shared types and schemas
    └── schema.ts        # Database schema and types
```

## Future Features

- Integration with actual ICP blockchain
- Real token transaction implementation
- Secure key management system
- Multi-token support

## Contributing

This is a prototype project. Feel free to fork and extend it for your needs.

## License

MIT
