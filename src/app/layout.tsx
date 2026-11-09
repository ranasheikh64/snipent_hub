import type { Metadata } from "next";
import { AuthProvider } from "@/frontend/hooks/useAuth";
import { ApiInterceptor } from "@/frontend/components/layout/ApiInterceptor";
import "./globals.css";

const isExport = process.env.NEXT_EXPORT === "true" || process.env.GITHUB_ACTIONS === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isExport ? "/snipent_hub" : "");

export const metadata: Metadata = {
  title: "SnippetHub - Save • Organize • Reuse • Share",
  description: "Personal and open-source code snippet library for Flutter, Web, and Backend developers.",
  icons: {
    icon: `${basePath}/only_logo.png`,
    shortcut: `${basePath}/only_logo.png`,
    apple: `${basePath}/only_logo.png`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FDFBF7] text-[#0A0A0A] antialiased">
        <ApiInterceptor />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
