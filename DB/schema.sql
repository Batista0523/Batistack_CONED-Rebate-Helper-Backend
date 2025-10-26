\c batistack_dev


DROP TABLE IF EXISTS project_photo;
DROP TABLE IF EXISTS project;
DROP TABLE IF EXISTS client;
DROP TABLE IF EXISTS rebate_user;



CREATE TABLE IF NOT EXISTS rebate_user (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS client (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT,
  phone_number TEXT,
  address TEXT,
  disadvantage BOOLEAN DEFAULT FALSE,         
  electricity_acct TEXT,
  coned_eligibility_key TEXT,
  project_amount_total NUMERIC(12,2),
  offered_rebate_amount NUMERIC(12,2),
  approved_rebate_amount NUMERIC(12,2),
  total_client_pay_after_rebate NUMERIC(12,2),
  building_year_built INTEGER,
  building_sqft INTEGER,
  conditioned_sqft INTEGER,
  condenser_models TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project (
  id SERIAL PRIMARY KEY,
  client_id INTEGER NOT NULL REFERENCES client(id) ON DELETE CASCADE,
  title TEXT,
  address TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project_photo (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES project(id) ON DELETE CASCADE,
  url TEXT NOT NULL,        
  label TEXT,               
  created_at TIMESTAMP DEFAULT NOW()
);


CREATE INDEX IF NOT EXISTS idx_project_client_id ON project(client_id);
CREATE INDEX IF NOT EXISTS idx_photo_project_id ON project_photo(project_id);
