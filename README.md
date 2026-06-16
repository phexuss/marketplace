# marketplacenext

> A full-stack marketplace/e-commerce app built with Next.js App Router, Prisma + Postgres, Better Auth, Stripe Checkout, UploadThing uploads, and Resend email.

This README is written for `v0.1.0` (last verified: 2026-05).

## Why This Exists

You want a real-world Next.js project that covers the “hard parts” (auth, database, uploads, payments) without needing multiple services and repos.
This codebase is a single Next.js app that ties those pieces together end-to-end.

## Tech Stack

- **Next.js** (App Router) + **React**
- **Prisma v7** + **PostgreSQL** (Prisma Adapter PG)
- **Better Auth** (email/password + Google OAuth)
- **Stripe** (Checkout Sessions)
- **UploadThing** (authenticated image uploads)
- **Resend** (transactional emails)
- **Biome** (lint + format)

## Quick Start (Local)

### Prerequisites

- Node.js **20+**
- npm **9+** (or newer)
- A PostgreSQL database (local, Docker, or hosted)

### 1) Install dependencies

```bash
npm ci
```

### 2) Create your environment file

```bash
cp .env.example .env
```

If you are on Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

### 3) Fill in the required environment variables

At minimum for local development, set:

- `DATABASE_URL`
- `NEXT_PUBLIC_BASE_URL` (use `http://localhost:3000` locally)

If you plan to use sign-up/sign-in, uploads, or checkout, you must also configure the related keys (see the table below).

### 4) Run database migrations

```bash
npx prisma migrate dev
```

### 5) (Optional) Seed the database

This repo includes a seed script that creates categories/styles/colors/sizes and sample products.

```bash
npx prisma db seed
```

### 6) Start the dev server

```bash
npm run dev
```

Open http://localhost:3000

## Environment Variables

Copy `.env.example` to `.env` and fill in values.

| Variable                 |                    Required | Used for                                        | Notes                                                                |
| ------------------------ | --------------------------: | ----------------------------------------------- | -------------------------------------------------------------------- |
| `DATABASE_URL`         |                         Yes | Prisma + Postgres                               | Example:`postgresql://user:pass@localhost:5432/db?schema=public`   |
| `NEXT_PUBLIC_BASE_URL` |                         Yes | Next.js metadata + Stripe redirects             | Must be a valid absolute URL (ex:`http://localhost:3000`)          |
| `BETTER_AUTH_SECRET`   |                    For auth | Better Auth                                     | Set a long random secret string                                      |
| `BETTER_AUTH_URL`      |                    For auth | Better Auth                                     | Usually the same as `NEXT_PUBLIC_BASE_URL` locally                 |
| `RESEND_API_KEY`       |             For email flows | Better Auth email verification + password reset | `src/lib/email.ts` sends via Resend                                |
| `GOOGLE_CLIENT_ID`     |                    Optional | Google OAuth                                    | Only needed if you enable Google sign-in                             |
| `GOOGLE_CLIENT_SECRET` |                    Optional | Google OAuth                                    | Only needed if you enable Google sign-in                             |
| `UPLOADTHING_TOKEN`    |                 For uploads | UploadThing                                     | Needed for the `/api/uploadthing` route                            |
| `STRIPE_SECRET_KEY`    | For checkout/admin products | Stripe API                                      | Use a test key locally (`sk_test_...`)                             |
| `ROUTER_AI_API_KEY`    |                    Optional | (Reserved)                                      | Present in `.env.example` but not referenced in `src/` currently |

## Database (Prisma)

- Schema: `prisma/schema.prisma`
- Migrations: `prisma/migrations/*`
- Prisma config: `prisma.config.ts` (loads `.env` via `dotenv/config`)
- Generated client output: `src/generated/prisma`

Common commands:

```bash
# Apply migrations and generate Prisma Client
npx prisma migrate dev

# Seed data (runs: tsx prisma/seed.ts)
npx prisma db seed

# Reset the database (DANGEROUS: deletes data)
npx prisma migrate reset
```

## Authentication

- The Better Auth handler is mounted at `src/app/api/auth/[...all]/route.ts`.
- Email/password auth is enabled.
- Google OAuth is configured if you set `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET`.

### Admin access

The admin page requires `session.user.role === "admin"`.
To grant yourself access locally, update your user in the database and set `role` to `admin`.

## Payments (Stripe)

- Checkout sessions are created in the server action `src/app/actions/checkout.ts`.
- After Stripe redirects back, `src/app/(main)/checkout/success/page.tsx` verifies payment and updates the order status to `PAID`.

You must set:

- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_BASE_URL` (used for `success_url` / `cancel_url`)

## Uploads (UploadThing)

- Upload route: `src/app/api/uploadthing/*`
- The UploadThing middleware requires an authenticated session.
- Next.js image remote patterns are configured for UploadThing hosts in `next.config.ts`.

## Troubleshooting

### `TypeError: Invalid URL` on startup

You are missing `NEXT_PUBLIC_BASE_URL`. Set it to a full URL, for example:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Prisma cannot connect / `DATABASE_URL` missing

- Ensure `.env` exists and contains `DATABASE_URL`.
- Ensure your Postgres instance is running and reachable.

### Resend email errors

`src/lib/email.ts` sends from `noreply@phexuss.dev`. In Resend, you must verify the domain/sender or change the `from` address to something your Resend account is allowed to send.
