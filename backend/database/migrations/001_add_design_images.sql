ALTER TABLE designs
ADD COLUMN IF NOT EXISTS images JSONB NOT NULL DEFAULT '[]'::jsonb;

UPDATE designs
SET images = jsonb_build_array(image)
WHERE images = '[]'::jsonb AND image IS NOT NULL;
