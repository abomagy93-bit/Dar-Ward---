/**
 * Utilities for TikTok Video embedding and ID extraction
 */

export function extractTikTokVideoId(url: string): string | null {
  if (!url) return null;

  // Trim and check
  const cleanUrl = url.trim();

  // If user pasted an iframe code, extract src
  const iframeMatch = cleanUrl.match(/src=["']([^"']+)["']/i);
  const targetUrl = iframeMatch ? iframeMatch[1] : cleanUrl;

  // Pattern 1: https://www.tiktok.com/@username/video/1234567890123456789
  const videoMatch = targetUrl.match(/\/video\/(\d+)/i);
  if (videoMatch && videoMatch[1]) {
    return videoMatch[1];
  }

  // Pattern 2: /embed/v2/1234567890123456789 or /player/v1/1234567890123456789
  const embedMatch = targetUrl.match(/\/(?:embed\/v2|player\/v1|v)\/(\d+)/i);
  if (embedMatch && embedMatch[1]) {
    return embedMatch[1];
  }

  // Pattern 3: Direct digits if user entered just the ID
  if (/^\d{15,25}$/.test(targetUrl)) {
    return targetUrl;
  }

  return null;
}

export function getTikTokEmbedUrl(url: string): string | null {
  if (!url) return null;

  const videoId = extractTikTokVideoId(url);
  if (videoId) {
    return `https://www.tiktok.com/player/v1/${videoId}?music_info=1&description=1&autoplay=0`;
  }

  // If already an embed or player URL, return cleaned
  if (url.includes('tiktok.com/embed') || url.includes('tiktok.com/player')) {
    return url;
  }

  return null;
}
