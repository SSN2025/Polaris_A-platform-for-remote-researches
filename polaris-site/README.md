This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Admin Panel (this session's additions)

An internal-only admin panel lives at `/admin` (not linked from the public nav):

- `/admin` — dashboard: total extracted documents, reviewed vs. pending, category & expedition breakdowns.
- `/admin/queue` — verification queue, ranked by each record's single lowest-confidence field.
- `/admin/review/[id]` — review a record: edit title/category/subcategory/summary/sites/tags side-by-side with the extracted evidence, then **Approve** or **Save Edits**. Both write straight back to that record's source `data.json` file and mark it `reviewed`.

**Access**: password-gated via a cookie set at `/admin/login`. Default password is `polaris2026` — copy `.env.example` to `.env.local` and set `ADMIN_PASSWORD` to change it before sharing a live link. This is a lightweight cookie check suited to a hackathon demo, not a production auth system — swap in real session auth (NextAuth, etc.) before any public deployment.

## What changed in this pass

- Fixed a dead duplicate search button in the navbar.
- Added `cleanCategoryLabel()` in `src/lib/research.js` — strips the raw `"2] "` / `"4]"` ordinal prefixes baked into the extraction pipeline's `taxonomy.category` values, applied everywhere a category is shown to a visitor. The underlying JSON is untouched; this is presentation-only.
- Archive page (`/archive`) now shows real, live counts for Reports (backed by all extracted papers) and honestly marks Publications/Datasets/Photos/Videos/Institutional Activities as pending pipeline output instead of faking data or using a raw `alert()`.
- Built the full Admin Panel described above (dashboard, verification queue, review/edit-with-evidence screen, password gate, write-back to source files).

## Backend hardening pass (this session)

- **Perf**: `getAllResearch()` now caches the parsed index in memory instead of re-reading all 637 files on every call (was happening 2-3x per page in places). Cache auto-invalidates on admin writes; force-rebuild with `POST /api/admin/reindex` if files change on disk while the server is running.
- **Auth**: admin cookie is now a signed, expiring HMAC token instead of a static guessable string — set `ADMIN_SESSION_SECRET` in `.env.local` before any real deployment (see `.env.example`).
- **Rate limiting**: admin login is throttled (8 attempts / 10 min per IP) — `src/lib/rateLimit.js`.
- **Input validation**: `PATCH /api/admin/papers/[id]` now strictly validates every field's type/length and rejects unknown keys (`src/lib/adminValidation.js`) instead of trusting the request body.
- **New**: `npm run validate-data` — standalone schema validator for all 637 source files, independent of the app. Currently: 0 parse failures, 0 schema errors, but confirms `taxonomy.category` has ~90 raw values vs. the 10-item locked list — flag for your pipeline teammate.
- Fixed `expeditions/[id]` doing `JSON.stringify()` on every paper on every request for station matching — now uses the cached index.

