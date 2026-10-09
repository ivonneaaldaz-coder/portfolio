export type GitHubContributionDay = {
  date: string;
  level: number;
  count: number;
};

export type GitHubContributionData = {
  total: number;
  days: GitHubContributionDay[];
};

const GITHUB_USER = "ivonneaaldaz-coder";
const CONTRIBUTIONS_URL = `https://github.com/users/${GITHUB_USER}/contributions`;

function decodeHtml(value: string) {
  return value
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&#39;", "'")
    .replaceAll("&quot;", '"')
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function parseCount(text: string) {
  const clean = decodeHtml(text).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (/no contributions?/i.test(clean)) return 0;
  const match = clean.match(/([\d,]+)\s+contributions?/i);
  return match ? Number(match[1].replaceAll(",", "")) : 0;
}

export async function getGitHubContributions(): Promise<GitHubContributionData | null> {
  try {
    const response = await fetch(CONTRIBUTIONS_URL, {
      headers: {
        Accept: "text/html",
        "User-Agent": "ivonnealdaz.com",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error("GitHub contributions unavailable:", response.status);
      return null;
    }

    const html = await response.text();
    const tooltipCounts = new Map<string, number>();

    for (const match of html.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/gi)) {
      tooltipCounts.set(match[1], parseCount(match[2]));
    }

    const days: GitHubContributionDay[] = [];

    for (const match of html.matchAll(/<[^>]+data-date="(\d{4}-\d{2}-\d{2})"[^>]*>/gi)) {
      const tag = match[0];
      const date = match[1];
      const levelMatch = tag.match(/data-level="(\d+)"/i);
      if (!levelMatch) continue;

      const idMatch = tag.match(/id="([^"]+)"/i);
      const ariaMatch = tag.match(/aria-label="([^"]+)"/i);
      const count = idMatch?.[1]
        ? tooltipCounts.get(idMatch[1]) ?? (ariaMatch?.[1] ? parseCount(ariaMatch[1]) : 0)
        : (ariaMatch?.[1] ? parseCount(ariaMatch[1]) : 0);

      days.push({
        date,
        level: Math.max(0, Math.min(4, Number(levelMatch[1]))),
        count,
      });
    }

    if (!days.length) {
      console.error("GitHub contributions markup could not be parsed.");
      return null;
    }

    const uniqueDays = Array.from(new Map(days.map(day => [day.date, day])).values())
      .sort((a, b) => a.date.localeCompare(b.date));

    return {
      total: uniqueDays.reduce((sum, day) => sum + day.count, 0),
      days: uniqueDays,
    };
  } catch (error) {
    console.error("GitHub contributions fetch failed:", error);
    return null;
  }
}
