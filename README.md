# 🚀 SnippetHub — Save • Organize • Reuse • Share
> **Personal Developer Knowledge Hub & Open-Source Code Snippet Library**

SnippetHub is a high-performance developer command center designed to organize, reuse, and share Flutter, Web (React/Next.js), Backend (Node.js/Express/Go/Python), Database, and UI component code snippets daily.

---

## ✨ Features

- **Multi-File Code Storage**: Store complete multi-file implementations (e.g. Flutter `main.dart`, `google_auth_service.dart`, and `pubspec.yaml`).
- **1-Click Instant Copy**: Copy any file with visual feedback and copy counter increment.
- **Neo-Brutalist Design System**: Crisp black borders (`border-2 border-black`), 4px hard unblurred offset shadows, and Royal Purple (`#7C3AED`) brand styling.
- **Developer Spaces & Communities**: Join/leave community hubs (e.g. *Flutter Artisans*, *Backend Ninjas*) and post code with dedicated hashtags (e.g. `#flutter-artisans`).
- **Personalized Feed Algorithm**: Your feed prioritizes snippets from the communities you have joined.
- **GitHub Integration**: 1-click GitHub OAuth login, export snippets directly to GitHub Gists, and file downloads.
- **Interactive Playgrounds**: 1-click "Run in DartPad" for Flutter code.
- **Technical Blogs & Documentation**: In-depth architecture guides and tutorials.
- **Quick Notes & Cheats**: Built-in scratchpad for terminal commands and config snippets.
- **Spotlight Search**: Keyboard-driven `Cmd + K` search across the entire vault.

---

## 🏗️ Architecture & Strict Coding Rules

Built following **Clean Architecture** with a strict rule: **Every single file is strictly under 120 lines of code**.

```
src/
├── app/                  # Next.js App Router (Pages, Icons & API endpoints)
│   ├── icon.png          # Rounded SnippetHub favicon
│   ├── api/              # API route controllers delegating to backend services
│   ├── snippets/         # Snippet pages
│   ├── blogs/            # Blog & documentation pages
│   ├── communities/      # Developer Spaces & Communities
│   └── page.tsx          # Main SnippetHub Explorer
├── backend/              # Clean Backend Core
│   ├── config/           # Database (MongoDB Mongoose) & Cloudinary config
│   ├── models/           # Mongoose schemas (Snippet, Category, Blog, Community, User)
│   ├── services/         # Business logic layer
│   └── repositories/     # Data access layer
├── frontend/             # Clean Frontend UI & Presentation
│   ├── components/       # Neo-Brutalist design system & feature widgets
│   │   ├── ui/           # Brutalist primitives (Button, TextField, Badge, Card)
│   │   ├── snippets/     # Snippet card, multi-file code viewer, modals
│   │   ├── filters/      # Left sidebar topics & technology filter
│   │   ├── layout/       # Navbar, HeroBanner, Footer, CommandPalette
│   │   ├── auth/         # Login & Register Modal
│   │   └── community/    # Community cards and creator modal
│   ├── hooks/            # Custom React hooks (useClipboard, useAuth)
│   └── types/            # Shared TypeScript interfaces & types
```

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS + Custom Neo-Brutalist Tokens
- **Database**: MongoDB Atlas via Mongoose
- **Image Storage**: Cloudinary
- **Authentication**: JWT & GitHub OAuth
- **Icons**: Lucide React

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/snippethub.git
cd snippethub
npm install
```

### 2. Configure Environment Variables
Copy `.env.local.example` to `.env.local` and add your credentials:
```env
# MongoDB Atlas
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/devvault?retryWrites=true&w=majority

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

NEXT_PUBLIC_APP_NAME=SnippetHub
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Seed Realistic Developer Data
```bash
npm run seed
```

### 4. Start Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
