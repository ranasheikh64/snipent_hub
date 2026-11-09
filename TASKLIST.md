# SnippetHub Extended Tasklist & Roadmap

### Core Rules (AGENTS.md):
- [x] Clean Architecture (`src/frontend/` & `src/backend/`)
- [x] Max 120 lines per file (Strictly enforced: max file length is 106 lines)
- [x] Neo-Brutalist UI (black borders, 4px hard offset shadow, custom button & textfields)
- [x] Brand Colors: Logo matching Royal Purple `#7C3AED`, Pale Lavender `#F5F3FF`, Pitch Black `#0A0A0A`, Warm Canvas `#FDFBF7`

---

### Step 1: Branding & Identity
- [x] Name updated across platform: **SnippetHub** ("Save • Organize • Reuse • Share")
- [x] Rounded brand logo icon configured as browser tab favicon (`src/app/icon.png`, `src/app/icon.jpg`, `src/app/apple-icon.png`)
- [x] Navbar and Footer updated with brand logo image and typography
- [x] Hero Banner styled to match logo's purple and lavender palette

### Step 2: Authentication & User Accounts (Email + GitHub OAuth)
- [x] User Mongoose Model (`src/backend/models/User.ts`)
- [x] Auth Service (`src/backend/services/authService.ts` with bcrypt & JWT)
- [x] Register & Login API (`/api/auth/register`, `/api/auth/login`, `/api/auth/me`)
- [x] GitHub OAuth Credentials (`GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET`) saved in `.env.local`
- [x] Neo-Brutalist Auth Modal (`src/frontend/components/auth/AuthModal.tsx`)

### Step 3: Expanded Stacks & Snippet Features
- [x] Stacks: Flutter, React, Next.js, Node.js, Python, Go, Rust, Kotlin, Swift, Docker, SQL
- [x] Categories: Auth, UI Components, Payment, API, State Management, Database
- [x] Visibility: Public (All), Private (Me), Draft
- [x] Star / Favorite counter with DB persistence (`/api/snippets/[id]/star`)
- [x] Fork snippet to personal vault (`/api/snippets/[id]/fork`)
- [x] Interactive DartPad playground link for Flutter/Dart code
- [x] Export to GitHub Gist & Direct File Download

### Step 4: Communities & Documentation
- [x] Community Spaces (`/communities`) with member & snippet counts
- [x] Developer Technical Blogs (`/blogs`)
- [x] Fixed Back Button overlap bug with neo-brutalist pill button

### Step 5: Verification & Build
- [x] Verified `npm run build`: Zero errors, production ready
- [x] Verified line counts ≤ 120 for all files (longest is 106 lines)
