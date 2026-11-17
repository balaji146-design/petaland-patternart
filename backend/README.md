# Petaland Patternart — Backend API

Node.js and Express REST API powering the Petaland Patternart customer website and admin panel. Built with PostgreSQL for data storage and Supabase Storage for image hosting.

## Tech Stack

- Node.js
- Express.js
- PostgreSQL (`pg`)
- JWT Authentication
- Multer (temporary uploads)
- Supabase Storage (image hosting)
- Nodemailer (contact form emails)
- Winston (logging)

## Prerequisites

- Node.js v18 or higher
- PostgreSQL v14 or higher
- A Supabase project with a storage bucket created

## Installation

```bash
cd backend
npm install
```

## Environment Setup

Copy the example environment file and fill in your own values.

```bash
cp .env.example .env
```

Refer to `docs/ENV_VARIABLES.md` for a full explanation of each variable.

## Database Setup

1. Create a PostgreSQL database:

```bash
createdb petaland_patternart
```

2. Run the schema file to create tables and seed default data:

```bash
psql -d petaland_patternart -f database/schema.sql
```

This creates the `admins`, `categories`, `banners`, `designs`, and `contacts` tables, and seeds a default admin account, default categories, and a default banner.

3. Update the default admin password hash in `database/schema.sql` or via a direct update query before going to production.

For an existing database, apply `database/migrations/001_add_design_images.sql` to enable up to five swipeable pages per design.

## Supabase Storage Setup

1. Create a storage bucket in your Supabase project matching `SUPABASE_BUCKET` in your `.env` file.
2. Set the bucket's access policy to allow public read access for uploaded images.
3. Copy your project URL and service role key into `.env`.

## Running the Project

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The server starts on the port defined in `PORT` (default `5000`) and exposes a health check at `GET /health`.

## Folder Structure