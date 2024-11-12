# Hono.js API with Drizzle ORM

A modern API built with Hono.js and Drizzle ORM.

## Prerequisites

- Node.js (Latest LTS recommended)
- Database of your choice (SQLite by default)
  - Supported databases:
    - PostgreSQL
    - MySQL
    - SQLite
    - Turso (LibSQL)

## Setup

1. Clone the repository
2. Install dependencies:

```
npm install
npm run dev
```

## Development

1. Start the development server:

```
open http://localhost:3000
```

## Database Configuration

This project uses Drizzle ORM which supports multiple databases. You can switch between:

1. SQLite (Default for development):

2. PostgreSQL:

```
DATABASE_URL=postgres://user:password@localhost:5432/mydatabase
```

## Production Build & Deployment

1. Create production environment file:

   ```
   cp .env.example .env.production
   ```

2. Build the application:

   ```
   npm run build
   ```

3. Start the production server:
   ```
   node dist/index.mjs
   ```

## Additional Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run linting
- `npm run lint-fix` - Fix linting issues
