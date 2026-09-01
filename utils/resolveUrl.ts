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

/**
 * Validates an admin-entered external URL (partner/university websites, etc.)
 * before it's used as an anchor href, rejecting javascript:/data:/vbscript:
 * and other unsafe schemes. Bare domains (no protocol) are treated as https.
 * Returns null if the value isn't a safe http(s) URL.
 */
export function getSafeExternalUrl(urlStr?: string | null): string | null {
  if (!urlStr) return null;
  const candidate = urlStr.startsWith("http://") || urlStr.startsWith("https://") ? urlStr : `https://${urlStr}`;
  try {
    const parsed = new URL(candidate);
    return parsed.protocol === "http:" || parsed.protocol === "https:" ? candidate : null;
  } catch {
    return null;
  }
}


