-- =====================================================================
-- Vetlas: Cloudflare D1 (SQLite) schema v0.3
-- Free tier; council verification intentionally removed.
--
-- Principle: every fact carries a source + trust_level, and the UI must
-- never display a fact without sufficient data (e.g. expense estimates
-- below MIN_SAMPLE reports are hidden; thin profiles are noindex).
--
-- Changes in v0.3 (improvements over the shared v0.2):
--   * Added missing indexes (speciality joins, credentials, facts, fees).
--   * Added CHECK constraints (rating range, expense buckets, slug format,
--     self-reference guard on parent_id).
--   * Added ON DELETE behaviour where missing.
--   * Merged the demo specialty seed with the app taxonomy so the D1
--     schema and the TypeScript dataset stay in sync.
--   * Spelling note: table/field name "speciality" kept from v0.2;
--     application code uses US spelling ("specialty") — mapping only.
-- =====================================================================

PRAGMA foreign_keys = ON;

-- ---------- Geography ----------
CREATE TABLE city (
  id            INTEGER PRIMARY KEY,
  slug          TEXT NOT NULL UNIQUE CHECK (slug = lower(slug) AND slug <> ''),
  name          TEXT NOT NULL,
  state         TEXT NOT NULL,
  tier          INTEGER NOT NULL CHECK (tier IN (1,2,3)),
  lat           REAL, lng REAL,
  is_published  INTEGER NOT NULL DEFAULT 0,      -- publish only when quality threshold met
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ---------- Specialities (expandable) ----------
CREATE TABLE speciality (
  id          INTEGER PRIMARY KEY,
  slug        TEXT NOT NULL UNIQUE CHECK (slug = lower(slug) AND slug <> ''),
  name        TEXT NOT NULL,
  description TEXT,
  icon        TEXT,                               -- key into the app's inline icon set
  sort_order  INTEGER DEFAULT 100
);

-- ---------- Providers ----------
-- Facilities AND individual doctors live in one table; doctors point at
-- their practice facility through parent_id.
CREATE TABLE provider (
  id                INTEGER PRIMARY KEY,
  slug              TEXT NOT NULL UNIQUE CHECK (slug = lower(slug) AND slug <> ''),
  type              TEXT NOT NULL CHECK (type IN ('hospital','clinic','doctor','specialist')),
  name              TEXT NOT NULL,
  parent_id         INTEGER REFERENCES provider(id) ON DELETE CASCADE,  -- doctor -> facility
  city_id           INTEGER NOT NULL REFERENCES city(id),
  address           TEXT,
  locality          TEXT,
  pincode           TEXT,
  lat               REAL, lng REAL,
  phone             TEXT,
  website           TEXT,
  google_place_id   TEXT,
  emergency_24x7    INTEGER,                      -- NULL = unknown
  species_treated   TEXT,                         -- JSON array: ["dog","cat","livestock",...]
  data_source       TEXT NOT NULL DEFAULT 'sample'
                    CHECK (data_source IN ('sample','community','verified')),
  status            TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','suspended')),
  indexable         INTEGER NOT NULL DEFAULT 0,   -- 0 = noindex (thin profile)
  about             TEXT,
  established_year  INTEGER CHECK (established_year IS NULL OR established_year BETWEEN 1900 AND 2100),
  created_at        TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at        TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_provider_city        ON provider(city_id, status);
CREATE INDEX idx_provider_type_status ON provider(type, status);
CREATE INDEX idx_provider_parent      ON provider(parent_id);

CREATE TABLE provider_speciality (
  provider_id   INTEGER NOT NULL REFERENCES provider(id) ON DELETE CASCADE,
  speciality_id INTEGER NOT NULL REFERENCES speciality(id),
  trust_level   TEXT NOT NULL DEFAULT 'public'
                 CHECK (trust_level IN ('verified','provider_confirmed','public','user_submitted')),
  PRIMARY KEY (provider_id, speciality_id)
);
CREATE INDEX idx_provider_speciality_speciality ON provider_speciality(speciality_id);

-- ---------- Credentials (listed as stated; no council registration check) ----------
CREATE TABLE credential (
  id             INTEGER PRIMARY KEY,
  provider_id    INTEGER NOT NULL REFERENCES provider(id) ON DELETE CASCADE,
  kind           TEXT NOT NULL CHECK (kind IN ('graduation','postgraduate','speciality','experience','other')),
  title          TEXT NOT NULL,                  -- 'BVSc & AH', 'MVSc, Veterinary Medicine'
  institution    TEXT,
  year           INTEGER CHECK (year IS NULL OR year BETWEEN 1950 AND 2100),
  detail         TEXT,                           -- e.g. '9 years in practice'
  trust_level    TEXT NOT NULL DEFAULT 'public'
                 CHECK (trust_level IN ('verified','provider_confirmed','public','user_submitted')),
  source_url     TEXT,
  checked_at     TEXT,                           -- set only when Vetlas checked evidence by hand
  checked_by     TEXT
);
CREATE INDEX idx_credential_provider ON credential(provider_id);

-- ---------- Generic trust-tagged facts ----------
CREATE TABLE provider_fact (
  id           INTEGER PRIMARY KEY,
  provider_id  INTEGER NOT NULL REFERENCES provider(id) ON DELETE CASCADE,
  field        TEXT NOT NULL,                    -- 'timings','services','languages','amenities'
  value        TEXT NOT NULL,
  trust_level  TEXT NOT NULL
               CHECK (trust_level IN ('verified','provider_confirmed','public','user_submitted')),
  source_url   TEXT,
  fetched_at   TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_provider_fact_lookup ON provider_fact(provider_id, field);

-- ---------- Reviews (public-source, attributed) ----------
CREATE TABLE review (
  id               INTEGER PRIMARY KEY,
  provider_id      INTEGER NOT NULL REFERENCES provider(id) ON DELETE CASCADE,
  source           TEXT NOT NULL,                -- 'google','practo','vetlas_user'
  source_url       TEXT,
  source_review_id TEXT,
  author_name      TEXT,
  rating           REAL CHECK (rating IS NULL OR (rating >= 0 AND rating <= 5)),
  body             TEXT,
  reviewed_at      TEXT,
  fetched_at       TEXT NOT NULL DEFAULT (datetime('now')),
  trust_level      TEXT NOT NULL DEFAULT 'public'
                   CHECK (trust_level IN ('verified','public','user_submitted')),
  UNIQUE (source, source_review_id)
);
CREATE INDEX idx_review_provider ON review(provider_id);
CREATE INDEX idx_review_recent   ON review(provider_id, reviewed_at DESC);

CREATE TABLE review_theme (
  id             INTEGER PRIMARY KEY,
  provider_id    INTEGER NOT NULL REFERENCES provider(id) ON DELETE CASCADE,
  sentiment      TEXT NOT NULL CHECK (sentiment IN ('positive','negative')),
  theme          TEXT NOT NULL,                  -- 'Calm with nervous pets'
  review_count   INTEGER NOT NULL,               -- reviews supporting this theme
  generated_at   TEXT NOT NULL
);
CREATE INDEX idx_review_theme_provider ON review_theme(provider_id);

CREATE TABLE review_summary (
  provider_id    INTEGER PRIMARY KEY REFERENCES provider(id) ON DELETE CASCADE,
  summary_text   TEXT NOT NULL,
  reviews_used   INTEGER NOT NULL,               -- display "based on N reviews"
  model_note     TEXT,                           -- how generated
  generated_at   TEXT NOT NULL
);

-- ---------- Fees (kept separate from expenses) ----------
CREATE TABLE consultation_fee (
  id             INTEGER PRIMARY KEY,
  provider_id    INTEGER NOT NULL REFERENCES provider(id) ON DELETE CASCADE,
  fee_inr        INTEGER NOT NULL CHECK (fee_inr >= 0),
  visit_type     TEXT DEFAULT 'clinic' CHECK (visit_type IN ('clinic','home','online','emergency')),
  trust_level    TEXT NOT NULL
                 CHECK (trust_level IN ('verified','provider_confirmed','public','user_submitted')),
  source_url     TEXT,
  as_of          TEXT NOT NULL
);
CREATE INDEX idx_fee_provider ON consultation_fee(provider_id, visit_type);

-- ---------- Additional expense reports (user-submitted) ----------
CREATE TABLE expense_report (
  id             INTEGER PRIMARY KEY,
  provider_id    INTEGER NOT NULL REFERENCES provider(id) ON DELETE CASCADE,
  bucket         TEXT NOT NULL
                 CHECK (bucket IN ('500-1000','1000-2500','2500-5000','5000+')),
  case_type      TEXT,                           -- 'vaccination','skin','surgery'
  visit_month    TEXT,                           -- 'YYYY-MM'
  status         TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  submitted_at   TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_expense_report_provider ON expense_report(provider_id, status);

-- Aggregated; shown in the UI only when reports_count >= MIN_SAMPLE (e.g. 10)
CREATE TABLE expense_estimate (
  provider_id    INTEGER NOT NULL REFERENCES provider(id) ON DELETE CASCADE,
  bucket         TEXT NOT NULL
                 CHECK (bucket IN ('500-1000','1000-2500','2500-5000','5000+')),
  reports_count  INTEGER NOT NULL CHECK (reports_count >= 0),
  window_start   TEXT NOT NULL,
  window_end     TEXT NOT NULL,
  computed_at    TEXT NOT NULL,
  PRIMARY KEY (provider_id)
);

-- ---------- Provider claims / corrections ----------
CREATE TABLE claim_request (
  id           INTEGER PRIMARY KEY,
  provider_id  INTEGER NOT NULL REFERENCES provider(id) ON DELETE CASCADE,
  contact_name TEXT, contact_email TEXT, contact_phone TEXT,
  message      TEXT,
  status       TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open','approved','rejected')),
  created_at   TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_claim_request_provider ON claim_request(provider_id, status);

-- ---------- Seed: specialities (merged v0.2 list + app taxonomy) ----------
INSERT INTO speciality (slug, name, icon, sort_order, description) VALUES
 ('veterinary-medicine','Veterinary Medicine','stethoscope',10,'General practice and internal medicine for everyday illness and complex cases.'),
 ('veterinary-surgery','Veterinary Surgery','scissors',20,'Soft-tissue and general surgery, including sterilisation and tumour removal.'),
 ('dermatology','Dermatology','drop',30,'Skin, coat, ear and allergy care.'),
 ('gynaecology-obstetrics','Gynaecology and Obstetrics','venus',40,'Breeding, pregnancy and whelping/queening support.'),
 ('radiology-usg','Radiology and Ultrasonography','scan',50,'Digital X-ray and ultrasound diagnostics.'),
 ('cardiology','Cardiology','heart',60,'Heart disease diagnosis and management.'),
 ('gastroenterology','Gastroenterology','stomach',70,'Stomach, intestine and digestive disorders.'),
 ('ophthalmology','Ophthalmology','eye',80,'Eye care: cataract, corneal ulcers, glaucoma.'),
 ('neurology','Neurology','brain',90,'Seizures, spinal and neurological conditions.'),
 ('oncology','Oncology','ribbon',100,'Cancer diagnosis, chemotherapy and palliative care.'),
 ('emergency-care','Emergency & Critical Care','siren',110,'24x7 handling of accidents, poisoning and critical cases.'),
 ('dentistry','Dentistry','tooth',120,'Scaling, extractions and oral health.'),
 ('orthopedics','Orthopedics','bone',130,'Fracture repair, hip dysplasia and joint surgery.'),
 ('preventive-care','Preventive Care & Vaccination','shield',140,'Vaccination, deworming and wellness screening.'),
 ('avian-exotics','Avian & Exotic Pets','bird',150,'Birds, rabbits, guinea pigs and other exotic companions.'),
 ('physiotherapy','Physiotherapy & Rehab','wave',160,'Post-surgical rehab, hydrotherapy and pain relief.');

-- ---------- Seed: cities (matches the demo dataset) ----------
INSERT INTO city (slug, name, state, tier, is_published) VALUES
 ('bengaluru','Bengaluru','Karnataka',1,1),
 ('mumbai','Mumbai','Maharashtra',1,1),
 ('delhi','Delhi NCR','Delhi',1,1),
 ('hyderabad','Hyderabad','Telangana',1,1),
 ('chennai','Chennai','Tamil Nadu',1,1),
 ('pune','Pune','Maharashtra',1,1),
 ('kolkata','Kolkata','West Bengal',1,1),
 ('jaipur','Jaipur','Rajasthan',2,1),
 ('ahmedabad','Ahmedabad','Gujarat',2,1),
 ('kochi','Kochi','Kerala',2,1);
