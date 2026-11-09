export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://snipenthubbaceknd.vercel.app";

export function getApiUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
}

