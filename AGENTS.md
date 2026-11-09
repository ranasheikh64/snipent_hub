# SnippetHub Project Guidelines & Architecture Rules

## 1. Clean Architecture & Directory Structure
The project strictly separates Frontend and Backend layers under `src/`:

```
src/
├── app/                  # Next.js App Router (Pages, Icons & API endpoints)
│   ├── icon.png          # Rounded SnippetHub favicon
│   ├── api/              # API route controllers delegating to backend services
│   ├── snippets/         # Snippet pages (list, detail, new)
│   ├── blogs/            # Blog & documentation pages
│   ├── communities/      # Developer Spaces & Communities
│   └── page.tsx          # Main SnippetHub Developer Vault Explorer
├── backend/              # Clean Backend Core
│   ├── config/           # Database (MongoDB Mongoose) & Cloudinary config
│   ├── models/           # Mongoose schemas (Snippet, Category, Blog, Community, User)
│   ├── services/         # Business logic layer
│   └── repositories/     # Data access layer
├── frontend/             # Clean Frontend UI & Presentation
│   ├── components/       # Neo-Brutalist design system & feature widgets
│   │   ├── ui/           # Brutalist primitives (Button, TextField, Badge, Card)
│   │   ├── snippets/     # Snippet card, multi-file code viewer, modal
│   │   ├── filters/      # Left sidebar topics & technology filter
│   │   ├── layout/       # Navbar, HeroBanner, Footer, CommandPalette
│   │   ├── auth/         # Login & Register Modal
│   │   └── community/    # Community cards and creator modal
│   ├── hooks/            # Custom React hooks (useClipboard, useAuth)
│   └── types/            # Shared TypeScript interfaces & types
```

---

## 2. Strict Coding Rules (MANDATORY)

1. **Max 120 Lines Per File Rule**:
   - Every single file MUST be kept under **120 lines of code**.
   - Modular, single-responsibility files only.

2. **Clean & Short Code**:
   - Strictly typed with TypeScript. Pure functions.

3. **Neo-Brutalist UI & SnippetHub Brand Standards**:
   - **Borders**: Crisp black borders (`border-2 border-black` or `border-3 border-black`).
   - **Shadows**: Unblurred hard offset shadows (`shadow-[4px_4px_0px_#000]`).
   - **Colors**: Royal Purple (`#7C3AED`), Pale Lavender Canvas (`#F5F3FF`), Warm Ivory (`#FDFBF7`), Pitch Black (`#0A0A0A`).
   - **Favicon**: Rounded hexagonal `</>` icon.
