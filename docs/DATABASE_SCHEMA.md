# Database Schema — Petaland Patternart

PostgreSQL database schema documentation. The full SQL definition is available in `backend/database/schema.sql`.

## Overview

The database consists of five tables: `admins`, `categories`, `banners`, `designs`, and `contacts`. There is no `users` or `customers` table since the platform supports only a single predefined admin and does not require customer accounts.

---

## Table: `admins`

Stores the single administrator account used to manage the platform.

| Column         | Type          | Constraints                          | Description                                  |
|----------------|---------------|----------------------------------------|-----------------------------------------------|
| id             | UUID          | Primary Key, default `gen_random_uuid()` | Unique admin identifier                     |
| full_name      | VARCHAR(150)  | NOT NULL                                | Admin's full name                            |
| email          | VARCHAR(150)  | NOT NULL, UNIQUE, valid email format    | Login email address                          |
| password       | TEXT          | NOT NULL                                | Bcrypt-hashed password                       |
| phone          | VARCHAR(20)   | Nullable                                | Contact phone number                         |
| profile_image  | TEXT          | Nullable                                | Supabase public URL for profile photo        |
| created_at     | TIMESTAMPTZ   | NOT NULL, default `NOW()`               | Record creation timestamp                    |
| updated_at     | TIMESTAMPTZ   | NOT NULL, default `NOW()`, auto-updated | Last update timestamp (via trigger)          |

**Indexes:** `idx_admins_email` on `email`.

---

## Table: `categories`

Stores henna design categories (e.g., Bridal, Arabic, Traditional).

| Column       | Type          | Constraints                    | Description                          |
|--------------|---------------|-----------------------------------|-----------------------------------------|
| id           | UUID          | Primary Key, default `gen_random_uuid()` | Unique category identifier      |
| name         | VARCHAR(100)  | NOT NULL, UNIQUE                   | Category display name              |
| image        | TEXT          | Nullable                            | Supabase public URL for category image |
| description  | TEXT          | Nullable                            | Short category description          |
| created_at   | TIMESTAMPTZ   | NOT NULL, default `NOW()`           | Record creation timestamp           |

**Indexes:** `idx_categories_name` on `name`.

---

## Table: `banners`

Stores homepage banner/slider images.

| Column      | Type          | Constraints                          | Description                            |
|-------------|---------------|-----------------------------------------|------------------------------------------|
| id          | UUID          | Primary Key, default `gen_random_uuid()`  | Unique banner identifier              |
| title       | VARCHAR(200)  | Nullable                                 | Optional overlay title text            |
| image       | TEXT          | NOT NULL                                  | Supabase public URL for banner image  |
| is_active   | BOOLEAN       | NOT NULL, default `true`                  | Whether the banner is currently shown |
| created_at  | TIMESTAMPTZ   | NOT NULL, default `NOW()`                 | Record creation timestamp             |

**Indexes:** `idx_banners_is_active` on `is_active`.

---

## Table: `designs`

Stores individual henna design listings.

| Column        | Type            | Constraints                                        | Description                                 |
|---------------|------------------|--------------------------------------------------------|------------------------------------------------|
| id            | UUID            | Primary Key, default `gen_random_uuid()`                 | Unique design identifier                    |
| category_id   | UUID            | NOT NULL, Foreign Key → `categories(id)` (`ON DELETE RESTRICT`) | Associated category                       |
| name          | VARCHAR(150)    | NOT NULL                                                  | Design name                                 |
| description   | TEXT            | NOT NULL                                                  | Full description of the design              |
| actual_price  | NUMERIC(10,2)   | NOT NULL, `>= 0`                                          | Original listed price                       |
| offer_price   | NUMERIC(10,2)   | NOT NULL, `>= 0`, `<= actual_price`                        | Discounted booking price                    |
| image         | TEXT            | NOT NULL                                                  | Supabase public URL for design image        |
| featured      | BOOLEAN         | NOT NULL, default `false`                                 | Whether shown in the "Featured Designs" section |
| created_at    | TIMESTAMPTZ     | NOT NULL, default `NOW()`                                 | Record creation timestamp                   |
| updated_at    | TIMESTAMPTZ     | NOT NULL, default `NOW()`, auto-updated                   | Last update timestamp (via trigger)         |

**Indexes:** `idx_designs_category_id`, `idx_designs_featured`, `idx_designs_name`.

**Foreign Key Behavior:** A category cannot be deleted while designs reference it (`ON DELETE RESTRICT`).

---

## Table: `contacts`

Stores messages submitted through the public contact form.

| Column      | Type          | Constraints                          | Description                        |
|-------------|---------------|-----------------------------------------|----------------------------------------|
| id          | UUID          | Primary Key, default `gen_random_uuid()`  | Unique message identifier          |
| name        | VARCHAR(150)  | NOT NULL                                 | Sender's full name                 |
| phone       | VARCHAR(20)   | NOT NULL                                 | Sender's phone number              |
| email       | VARCHAR(150)  | NOT NULL, valid email format             | Sender's email address             |
| message     | TEXT          | NOT NULL                                 | Message content                    |
| created_at  | TIMESTAMPTZ   | NOT NULL, default `NOW()`                 | Submission timestamp               |

**Indexes:** `idx_contacts_created_at` on `created_at`.

---

## Triggers

A shared `set_updated_at()` trigger function automatically updates the `updated_at` column on the `admins` and `designs` tables whenever a row is modified.

## Seed Data

The schema seeds:
- One default admin account (`admin@petalandpatternart.com`)
- Six default categories (Bridal, Arabic, Traditional, Minimalist, Kids, Party)
- One default active banner

The default admin password must be changed immediately after first login in any production deployment.