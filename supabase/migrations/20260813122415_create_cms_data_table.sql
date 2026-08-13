/*
# Create cms_data table for Rute Seru CMS

## Purpose
The Rute Seru travel site needs durable storage for all CMS content (trips, destinations,
testimonials, gallery, team, site settings). Previously this was stored in a JSON file
on the server, which doesn't persist on serverless platforms like Netlify. This migration
creates a single table that stores the entire CMS data blob as JSON, with a single row.

## New Tables
- `cms_data`
  - `id` (int, primary key, always 1) — singleton row identifier
  - `data` (jsonb, not null) — the full CMS data object
  - `updated_at` (timestamptz) — last modification timestamp

## Security
- RLS enabled on `cms_data`.
- This is a single-tenant app with no user sign-in (admin login is hardcoded in the app).
- Policies allow anon + authenticated to read and write, since the data is intentionally
  shared/public and the admin auth check happens in the application layer.

## Notes
1. Only one row will ever exist (id = 1). The app upserts this row.
2. The admin password check remains in the Next.js API route — Supabase RLS is open
   because the anon key client needs read/write access without a Supabase auth session.
*/

CREATE TABLE IF NOT EXISTS cms_data (
  id int PRIMARY KEY DEFAULT 1,
  data jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Add constraint to ensure only one row
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'cms_data_singleton'
  ) THEN
    ALTER TABLE cms_data ADD CONSTRAINT cms_data_singleton CHECK (id = 1);
  END IF;
END $$;

ALTER TABLE cms_data ENABLE ROW LEVEL SECURITY;

-- Allow anon + authenticated to read (public site needs to load data)
DROP POLICY IF EXISTS "anon_read_cms_data" ON cms_data;
CREATE POLICY "anon_read_cms_data" ON cms_data
  FOR SELECT TO anon, authenticated USING (true);

-- Allow anon + authenticated to insert (admin saves via API route)
DROP POLICY IF EXISTS "anon_insert_cms_data" ON cms_data;
CREATE POLICY "anon_insert_cms_data" ON cms_data
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Allow anon + authenticated to update (admin updates via API route)
DROP POLICY IF EXISTS "anon_update_cms_data" ON cms_data;
CREATE POLICY "anon_update_cms_data" ON cms_data
  FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

-- Allow anon + authenticated to delete (reset functionality)
DROP POLICY IF EXISTS "anon_delete_cms_data" ON cms_data;
CREATE POLICY "anon_delete_cms_data" ON cms_data
  FOR DELETE TO anon, authenticated USING (true);