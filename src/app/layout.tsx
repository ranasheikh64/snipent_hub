import type { Metadata } from "next";
import { AuthProvider } from "@/frontend/hooks/useAuth";
import { ApiInterceptor } from "@/frontend/components/layout/ApiInterceptor";
import "./globals.css";

export const metadata: Metadata = {
  title: "SnippetHub - Save • Organize • Reuse • Share",
  description: "Personal and open-source code snippet library for Flutter, Web, and Backend developers.",
  icons: {
    icon: "/only_logo.png",
    shortcut: "/only_logo.png",
    apple: "/only_logo.png",
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
