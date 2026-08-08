-- ============================================
-- PETALAND PATTERNART DATABASE SCHEMA
-- PostgreSQL
-- ============================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- TABLE: admins
-- ============================================
CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    phone VARCHAR(20),
    profile_image TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT admins_email_format CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')
);

CREATE INDEX IF NOT EXISTS idx_admins_email ON admins (email);

-- ============================================
-- TABLE: categories
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    image TEXT,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_categories_name ON categories (name);

-- ============================================
-- TABLE: banners
-- ============================================
CREATE TABLE IF NOT EXISTS banners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200),
    image TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_banners_is_active ON banners (is_active);

-- ============================================
-- TABLE: designs
-- ============================================
CREATE TABLE IF NOT EXISTS designs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    actual_price NUMERIC(10, 2) NOT NULL CHECK (actual_price >= 0),
    offer_price NUMERIC(10, 2) NOT NULL CHECK (offer_price >= 0),
    image TEXT NOT NULL,
    featured BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_designs_category
        FOREIGN KEY (category_id)
        REFERENCES categories (id)
        ON DELETE RESTRICT,
    CONSTRAINT designs_offer_price_check
        CHECK (offer_price <= actual_price)
);

CREATE INDEX IF NOT EXISTS idx_designs_category_id ON designs (category_id);
CREATE INDEX IF NOT EXISTS idx_designs_featured ON designs (featured);
CREATE INDEX IF NOT EXISTS idx_designs_name ON designs (name);

-- ============================================
-- TABLE: contacts
-- ============================================
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT contacts_email_format CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')
);

CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts (created_at);

-- ============================================
-- FUNCTION: auto-update updated_at
-- ============================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_admins_updated_at ON admins;
CREATE TRIGGER trg_admins_updated_at
BEFORE UPDATE ON admins
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_designs_updated_at ON designs;
CREATE TRIGGER trg_designs_updated_at
BEFORE UPDATE ON designs
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- ============================================
-- SEED DATA: Default Admin
-- Password: Admin@123 (bcrypt hashed, 12 salt rounds)
-- ============================================
INSERT INTO admins (full_name, email, password, phone)
VALUES (
    'Petaland Admin',
    'admin@petalandpatternart.com',
    '$2a$12$8Kj6i0m3O0eYVYVQ6HpZVe3nQ0yRlYw1jGm9YUe1sVnE8pQhq0N1e',
    '9100000000'
)
ON CONFLICT (email) DO NOTHING;

-- ============================================
-- SEED DATA: Default Categories
-- ============================================
INSERT INTO categories (name, image, description)
VALUES
    ('Bridal Henna', '/assets/images/category-bridal.jpg', 'Intricate bridal mandalas designed for weddings and special ceremonies.'),
    ('Arabic Henna', '/assets/images/category-arabic.jpg', 'Bold floral vines and flowing patterns inspired by Arabic tradition.'),
    ('Traditional Mehndi', '/assets/images/category-traditional.jpg', 'Classic motifs including peacocks, paisleys, and traditional jaal work.'),
    ('Minimalist Henna', '/assets/images/category-minimalist.jpg', 'Delicate, fine-line designs for everyday elegance.'),
    ('Kids Henna', '/assets/images/category-kids.jpg', 'Fun, simple, and playful designs made for children.'),
    ('Party Henna', '/assets/images/category-party.jpg', 'Festive patterns perfect for celebrations and gatherings.')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- SEED DATA: Default Banner
-- ============================================
INSERT INTO banners (title, image, is_active)
VALUES ('Timeless Henna Artistry', '/assets/images/banner-1.jpg', true);