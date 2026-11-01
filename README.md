# Polaris — NCPOR Polar Research Outreach Portal

> **SIH 2026, Problem Statement 26063:** Integrated Polar Science Outreach, Knowledge Repository and Media Dissemination Portal  
> **Agency:** National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences, Government of India.

Polaris is a public web portal that archives India's Antarctic and Arctic research as structured, searchable, evidence-backed records, and provides creators and educators with an **Outreach Kit** to translate verified research into accessible public science content.

---

## Architecture & Technology Stack

- **Framework:** Next.js (JavaScript, App Router, `src/` directory, `@/*` import alias)
- **Styling:** Tailwind CSS (mobile-first responsive design, accessible contrast)
- **Database & ORM:** PostgreSQL with Prisma ORM
- **Extraction Pipeline:** Modular PDF parser with OCR fallback (Tesseract.js) and LLM extraction (Google Gemini / built-in scientific heuristic engine)
- **Authentication:** JWT & bcrypt internal admin authentication for review queues

---

## Data Schema (Locked Single-Paper Model)

The `Paper` model stores all research records with scalar columns for efficient filtering/indexing and JSONB groups for flexible, structured data:

- **Identifiers:** `id` (slug), `document_id` (`NCPOR-000001`...), `source_file`, `pdf_url`
- **Scalar Filters:** `title`, `year`, `expedition`, `category`, `subcategory`
- **`bibliographic` (JSONB):** `title`, `authors[{name, affiliation}]`, `expedition`, `publication_series`, `report_type`, `year`, `page_range`, `doi`, `language`
- **`content` (JSONB):** `abstract` (verbatim), `summary` (plain-language, 2-3 lines), `keywords[]`, `research_sites[]`, `num_pages`
- **`taxonomy` (JSONB):** `category`, `subcategory`, `tags[]`
- **`outreach` (JSONB):** `highlight` (boolean), `social_caption`
- **`evidence[]` (JSONB):** `{field, source_text, page_number, section}` (strictly for inferred fields: `research_sites`, `category`, `subcategory`)
- **`pipeline` (JSONB):** `status` (`extracted` | `reviewed` | `published`), `methods_used[]`, `confidence{title, authors, year, category, research_sites, summary}`, `reviewed` (boolean), `extracted_at`

### Fixed Scientific Categories:
1. `Biology / Microbiology`
2. `Glaciology`
3. `Geophysics`
4. `Geology`
5. `Oceanography`
6. `Atmospheric Science / Meteorology`
7. `Marine Biology`
8. `Environmental Science`
9. `Logistics / Expedition Operations`
10. `Other`

---

## Setup & Getting Started

### 1. Prerequisites
- Node.js 18.x or 20.x
- PostgreSQL instance (local or hosted, e.g., Supabase / Neon / AWS RDS)

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```env
# PostgreSQL connection string
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/polaris?schema=public"

# Optional: Google Gemini API Key for AI extraction (falls back to heuristic parser if empty)
GEMINI_API_KEY="your-gemini-api-key"

# Internal Admin credentials (seeded on first login or via npm run db:seed)
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="polaris-admin-2026"

# NextAuth / JWT secret
NEXTAUTH_SECRET="your-secure-random-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Initialize Database
Push the Prisma schema to your PostgreSQL database and seed the default admin account:
```bash
# Push schema and generate Prisma client
npx prisma db push

# Seed initial admin user
npm run db:seed
```

### 4. Ingest Research Paper PDFs
1. Place your NCPOR research paper PDF files into the directory:
   ```
   public/pdfs/
   ```
2. Run the extraction pipeline:
   ```bash
   npm run extract
   ```
   The pipeline will:
   - Detect every PDF in `public/pdfs/` not yet processed.
   - Extract text (routing scanned pages through OCR).
   - Perform LLM classification and structured JSON generation.
   - Extract exact source evidence quotes with page numbers and sections.
   - Calculate confidence scores across core fields.
   - Save records into PostgreSQL and write backup JSON files to `data/generated/`.
   - Report a batch summary (processed, skipped, failed, low-confidence).

### 5. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Portal Routes & Features

| Route | Name | Purpose |
|---|---|---|
| `/` | **Home** | Archive stats, expedition timeline, featured research, "Explore by Science" category cards, outreach workflow visual. |
| `/expeditions` | **Expeditions** | Timeline and expedition cards with live paper counts. |
| `/expeditions/[name]` | **Expedition Detail** | Header stats, category drill-down (Category → Subcategory → Paper), and asset tabs with proper empty states. |
| `/research` | **Research Explorer** | Search & multi-facet filters (Expedition, Category, Subcategory, Year, Site, Keywords) backed by database queries and URL state. |
| `/research/[id]` | **Research Paper Detail** | Plain-language summary, scientific abstract toggle, glossary tooltips, AI classification & confidence bar, source evidence block, provenance block, related content engine, original PDF viewer. |
| `/discover` | **Discover** | Browse by 10 categories and popular tags, interactive Polar Map (Maitri, Bharati, Schirmacher Oasis, Larsemann Hills, Arctic) with site location view, and chronological publication timeline. |
| `/archive` | **Archive** | Catalog for Reports, Datasets, Publications, Photos, Videos, and Activities with clear "data not available yet" states. |
| `/creators` | **For Creators** | Creator landing page explaining the 4-step workflow and topic selection. |
| `/creators/kit/[id]` | **Outreach Kit** | 10 structured building blocks (Simple Explanation, Key Facts, Numbers, Why It Matters, Story Angles, Evidence, Images, Videos, Original Research, Academic Citation). |
| `/about` | **About & Methodology** | Purpose, NCPOR background, technology stack, and full AI-to-human verification pipeline diagram. |
| `/admin` | **Admin Dashboard** | Ingest counts, verification statistics, and quick queue access. |
| `/admin/verification` | **Verification Queue** | Lowest-confidence prioritized queue with per-field confidence. |
| `/admin/verification/[id]` | **Review Screen** | Side-by-side field editing, source evidence comparison, and [Approve] action. |

---

## Verification & Integrity Principles
- **No Mock or Fake Data:** All public portal content originates strictly from the database. When the database is empty, pages display thoughtful empty states.
- **Traceable Evidence:** Inferred metadata (`category`, `research_sites`, `subcategory`) contains exact verbatim source quotes with page and section references.
- **Creator Autonomy:** The Outreach Kit equips educators and communicators with factual building blocks, preserving creator editorial voice rather than publishing automated synthetic posts.
