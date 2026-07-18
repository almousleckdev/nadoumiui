export function resolveDocumentUrl(pathStr?: string | null): string {
  if (!pathStr) return "";
  if (pathStr.startsWith("http://") || pathStr.startsWith("https://")) {
    return pathStr;
  }

  const backendBase =
    process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ??
    "http://localhost:3002";

  const cleanPath = pathStr.startsWith("/") ? pathStr : `/${pathStr}`;
  return `${backendBase}${cleanPath}`;
}


