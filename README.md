git clone https://github.com/Codujjwal/blockchain_task.git
cd blockchain_task
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