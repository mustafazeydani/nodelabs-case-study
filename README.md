# NodeLabs Case Study

A modern financial dashboard application built with [Next.js](https://nextjs.org), [React Query](https://tanstack.com/query/latest), and [Xior](https://github.com/suhaotian/xior) for API interactions with auto-generated types using [Orval](https://orval.dev).

## Prerequisites

- **Node.js** 18+ or higher
- **pnpm** (enforced via `preinstall` script)

## Installation

Install dependencies:

```bash
pnpm install
```

Set up environment variables by copying the example file:

```bash
cp .env.example .env
```

Then configure the required environment variables in `.env`:

```bash
NEXT_PUBLIC_API_BASE_URL=<your-api-base-url>
NEXT_PUBLIC_OPENAPI_URL=<your-openapi-spec-url>
```

> **Note:** The generated API client files are not committed to git. You must generate them locally using Orval before running the project.

## Generating API Client

The project uses **Orval** to auto-generate API client types from the OpenAPI specification. This includes:
- **React Query hooks** for data fetching
- **Zod validators** for type validation
- **Type-safe model definitions**

### Generate the API Client

Run the following command to generate all API client files:

```bash
pnpm run orval
```

This command will:
- Fetch the OpenAPI specification from the configured `NEXT_PUBLIC_OPENAPI_URL`
- Generate React Query hooks in `src/api/generated/react-query`
- Generate Zod validators in `src/api/generated/zod`
- Generate TypeScript models in `src/api/generated/models`

> **Important:** Run this command after cloning the repository and whenever the API specification changes.

## Development

Start the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

The page will automatically update when you modify files.

### HTTPS Support

To run the development server with HTTPS support:

```bash
pnpm run dev:https
```

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run dev:https` - Start development server with HTTPS
- `pnpm run build` - Build for production
- `pnpm run start` - Start production server
- `pnpm run orval` - Generate API client from OpenAPI spec
- `pnpm run check-types` - Check TypeScript types
- `pnpm run lint` - Run ESLint
- `pnpm run lint:fix` - Fix ESLint issues
- `pnpm run format` - Format code with Prettier

## Key Features

- **Type-Safe API Integration**: Automatically generated types from OpenAPI spec
- **React Query Integration**: Efficient data fetching and caching
- **Token Refresh Logic**: Automatic token refresh with request queuing
- **Form Validation**: Zod-based form validation
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Full type safety

## Tech Stack

- **Framework**: Next.js 16+
- **UI Library**: React 19+
- **State Management**: React Query 5+
- **HTTP Client**: Xior 0.8+
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Styling**: Tailwind CSS
- **Code Generation**: Orval
- **Code Quality**: ESLint, Prettier, TypeScript

## Build & Deployment

Build the application for production:

```bash
pnpm run build
```

Start the production server:

```bash
pnpm run start
```

## Code Quality

Ensure code quality before committing:

```bash
pnpm run check-types  # Type checking
pnpm run lint         # Linting
pnpm run format       # Code formatting
```

The project uses Husky and lint-staged to enforce code quality checks on commits.

## Troubleshooting

### API Client Not Generated
If you encounter errors related to missing API client files, ensure you've run:
```bash
pnpm install
pnpm run orval
```

### Environment Variables Not Loaded
Make sure your `.env` file is in the root directory and contains the required variables.

### Port 3000 Already in Use
To run on a different port:
```bash
pnpm run dev -- -p 3001
```
