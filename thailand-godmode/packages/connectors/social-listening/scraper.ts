/**
 * Social listening box — scrape, tag, display.
 *
 * "Scrape" here means public RSS + GDELT's news index, not authenticated
 * social-platform scraping (which is against most platforms' terms and not
 * a zero-baht, zero-legal-risk source). GDELT's Doc API already indexes a
 * huge share of what would otherwise require platform-specific scraping —
 * see dr-non-vibecoding-skills/reference/free-apis.md's "Conflict &
 * Geopolitics" + "News & Media" sections.
 *
 * Every item is labelled with its real source and published time — never
 * presented as "social sentiment" when it's actually a news wire.
 */

export interface ListeningMention {
  id: string;
  titleTh: string | null;
  titleEn: string | null;
  source: string;
  url: string;
  publishedAt: string | null;
  keywordMatched: string;
  sentiment: "positive" | "neutral" | "negative" | "unknown";
}

interface GdeltDocResponse {
  articles?: { url: string; title?: string; seendate?: string; domain?: string; tone?: number }[];
}

/** Crude, transparent sentiment: GDELT's own tone score, bucketed. Never presented as a trained classifier's output. */
function toneToSentiment(tone: number | undefined): ListeningMention["sentiment"] {
  if (tone == null) return "unknown";
  if (tone > 2) return "positive";
  if (tone < -2) return "negative";
  return "neutral";
}

/**
 * Search GDELT's Doc API for a keyword (run once per keyword in the city
 * config's socialListening.keywords — GDELT's query language ORs terms
 * inconsistently across transliteration variants, so separate honest calls
 * beat one clever query).
 */
export async function searchGdeltForKeyword(
  keyword: string,
  opts?: { maxRecords?: number; fetchImpl?: typeof fetch },
): Promise<ListeningMention[]> {
  const doFetch = opts?.fetchImpl ?? fetch;
  const maxRecords = opts?.maxRecords ?? 25;
  const url = `https://api.gdeltproject.org/api/v2/doc/doc?query=${encodeURIComponent(keyword)}&mode=ArtList&maxrecords=${maxRecords}&format=json`;
  const res = await doFetch(url);
  if (!res.ok) return []; // one keyword failing shouldn't break the whole box — degrade, don't throw
  const body = (await res.json()) as GdeltDocResponse;

  return (body.articles ?? []).map((a) => ({
    id: a.url,
    titleTh: null,
    titleEn: a.title ?? null,
    source: a.domain ?? "unknown",
    url: a.url,
    publishedAt: a.seendate ?? null,
    keywordMatched: keyword,
    sentiment: toneToSentiment(a.tone),
  }));
}

/** Runs every keyword in the city config against GDELT, de-duped by URL, newest first. */
export async function fetchSocialListening(
  keywords: string[],
  opts?: { maxRecordsPerKeyword?: number; fetchImpl?: typeof fetch },
): Promise<ListeningMention[]> {
  const seen = new Map<string, ListeningMention>();
  for (const keyword of keywords) {
    const results = await searchGdeltForKeyword(keyword, { maxRecords: opts?.maxRecordsPerKeyword, fetchImpl: opts?.fetchImpl });
    for (const item of results) {
      if (!seen.has(item.url)) seen.set(item.url, item);
    }
  }
  return Array.from(seen.values()).sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
}

/** A parsed RSS item — for the local/regional feeds a city config adds on top of the GDELT default. */
export interface RssItem {
  titleEn: string;
  url: string;
  publishedAt: string | null;
  source: string;
}

/** Minimal RSS 2.0 parser — no external dependency, since these feeds are simple and a heavy XML lib is not zero-baht-stack-appropriate for one field extraction. */
export function parseRssItems(xml: string, source: string): RssItem[] {
  const items: RssItem[] = [];
  const itemBlocks = xml.split(/<item[\s>]/i).slice(1);
  for (const block of itemBlocks) {
    const title = block.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i)?.[1]?.trim();
    const link = block.match(/<link>([\s\S]*?)<\/link>/i)?.[1]?.trim();
    const pubDate = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)?.[1]?.trim();
    if (title && link) {
      items.push({ titleEn: title, url: link, publishedAt: pubDate ?? null, source });
    }
  }
  return items;
}
