# Environment Variables — Petaland Patternart Backend

This document explains every environment variable used by the backend API. Copy `backend/.env.example` to `backend/.env` and fill in values appropriate to your environment.

---

## Server Configuration

| Variable   | Description                                                | Example                 |
|------------|----------------------------------------------------------------|----------------------------|
| `PORT`     | Port the Express server listens on                          | `5000`                     |
| `NODE_ENV` | Application environment (`development` or `production`)     | `development`               |

---

## Database Configuration

| Variable        | Description                                                            | Example                                                             |
|-----------------|------------------------------------------------------------------------|-----------------------------------------------------------------------|
| `DATABASE_URL`  | Full PostgreSQL connection string                                       | `postgresql://user:password@localhost:5432/petaland_patternart`       |
| `DATABASE_SSL`  | Whether to enable SSL for the database connection (`true` or `false`)  | `false`                                                                |

---

## Authentication

| Variable          | Description                                              | Example                        |
|-------------------|---------------------------------------------------------|-----------------------------------|
| `JWT_SECRET`      | Secret key used to sign and verify JWT tokens             | A long, random, unpredictable string |
| `JWT_EXPIRES_IN`  | Token expiration duration                                  | `7d`                              |

`JWT_SECRET` must be kept private and rotated if ever exposed. Never commit the real value to source control.

---

## Supabase Storage

| Variable                     | Description                                                       | Example                                        |
|-------------------------------|---------------------------------------------------------------------|---------------------------------------------------|
| `SUPABASE_URL`                | Your Supabase project URL                                           | `https://your-project-ref.supabase.co`             |
| `SUPABASE_ANON_KEY`           | Public anon key, used only for client-safe operations if needed     | Provided in Supabase project settings              |
| `SUPABASE_SERVICE_ROLE_KEY`   | Service role key used server-side for privileged storage operations | Provided in Supabase project settings              |
| `SUPABASE_BUCKET`             | Name of the storage bucket used for design, banner, and profile images | `petaland-patternart`                           |

The service role key grants full access to your Supabase project and must never be exposed to the frontend or committed to source control.

---

## Email (Nodemailer)

| Variable       | Description                                        | Example                     |
|----------------|--------------------------------------------------------|---------------------------------|
| `EMAIL_HOST`   | SMTP host used to send outgoing email                   | `smtp.gmail.com`                 |
| `EMAIL_PORT`   | SMTP port                                                | `587`                            |
| `EMAIL_USER`   | SMTP account username / sender email address            | `your_email@gmail.com`            |
| `EMAIL_PASS`   | SMTP account password or app-specific password           | Generated app password            |
| `ADMIN_EMAIL`  | Address that receives contact form notifications         | `admin@petalandpatternart.com`     |

---

## CORS / Frontend URLs

| Variable        | Description                                       | Example                     |
|-----------------|-------------------------------------------------------|---------------------------------|
| `FRONTEND_URL`  | URL of the customer-facing website, allowed by CORS     | `http://localhost:5173`          |
| `ADMIN_URL`     | URL of the admin panel, allowed by CORS                 | `http://localhost:5174`          |

---

## Rate Limiting

| Variable                  | Description                                             | Example    |
|----------------------------|--------------------------------------------------------------|--------------|
| `RATE_LIMIT_WINDOW_MS`     | Time window for the general API rate limiter, in milliseconds | `900000`     |
| `RATE_LIMIT_MAX_REQUESTS`  | Maximum requests allowed per IP within the window              | `200`        |

---

## Security Notes

- Never commit a real `.env` file to version control. Only `.env.example` (with placeholder values) should be tracked.
- Rotate `JWT_SECRET` and Supabase keys immediately if they are ever exposed.
- Use different values for `JWT_SECRET`, database credentials, and email credentials across development, staging, and production environments.