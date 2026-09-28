/**
 * ITIC / Longdo CCTV — public Thai traffic camera + incident feeds.
 *
 * Two free JSON feeds, no key required:
 *   https://event.longdo.com/feed/json           incidents
 *   https://camera.longdo.com/feed/?command=json cameras
 *
 * Per dr-non-vibecoding-skills/skills/itic-cctv-integration: pick the
 * camera's liveness tier HONESTLY, per camera. A camera entry does not
 * guarantee a video stream:
 *   1. pin      — no imgurl/hls_url resolves. Show as a pin only.
 *   2. snapshot — an imgurl returns a fresh JPEG on request. This is what
 *                 most cameras actually offer. Label it as a refreshing
 *                 photo, never as "live video".
 *   3. stream   — an hls_url resolves to a real .m3u8.
 * Never promote a snapshot-polling camera to "live video" in the UI.
 */

export type CameraLiveness = "stream" | "snapshot" | "pin";

export interface ThaiTrafficCamera {
  id: string;
  lat: number;
  lon: number;
  liveness: CameraLiveness;
  imgUrl: string | null;
  hlsUrl: string | null;
  nameTh: string | null;
}

export interface ThaiTrafficIncident {
  id: string;
  type: string;
  descriptionTh: string;
  lat: number;
  lon: number;
  reportedAt: string | null;
}

interface LongdoCameraFeedItem {
  id?: string | number;
  lat: number;
  lon: number;
  imgurl?: string;
  hls_url?: string;
  title?: string;
}

interface LongdoEventFeedItem {
  id?: string | number;
  type?: string;
  title?: string;
  description?: string;
  lat: number;
  lon: number;
  time?: string;
}

function classifyLiveness(item: LongdoCameraFeedItem): CameraLiveness {
  if (item.hls_url) return "stream";
  if (item.imgurl) return "snapshot";
  return "pin";
}

/** bbox: [minLon, minLat, maxLon, maxLat] from the city config's cctv.bbox — filters the national feed to one province. */
export async function fetchThaiTrafficCameras(
  bbox: [number, number, number, number],
  opts?: { fetchImpl?: typeof fetch },
): Promise<ThaiTrafficCamera[]> {
  const doFetch = opts?.fetchImpl ?? fetch;
  const res = await doFetch("https://camera.longdo.com/feed/?command=json");
  if (!res.ok) throw new Error(`longdo camera feed returned ${res.status}`);
  const items = (await res.json()) as LongdoCameraFeedItem[];
  const [minLon, minLat, maxLon, maxLat] = bbox;

  return items
    .filter((item) => item.lon >= minLon && item.lon <= maxLon && item.lat >= minLat && item.lat <= maxLat)
    .map((item) => ({
      id: String(item.id ?? `${item.lat},${item.lon}`),
      lat: item.lat,
      lon: item.lon,
      liveness: classifyLiveness(item),
      // cache-bust snapshot polling — a bare imgurl often already has its own querystring, so append rather than replace
      imgUrl: item.imgurl ? `${item.imgurl}${item.imgurl.includes("?") ? "&" : "?"}_t=${Date.now()}` : null,
      hlsUrl: item.hls_url ?? null,
      nameTh: item.title ?? null,
    }));
}

export async function fetchThaiTrafficIncidents(
  bbox: [number, number, number, number],
  opts?: { fetchImpl?: typeof fetch },
): Promise<ThaiTrafficIncident[]> {
  const doFetch = opts?.fetchImpl ?? fetch;
  const res = await doFetch("https://event.longdo.com/feed/json");
  if (!res.ok) throw new Error(`longdo event feed returned ${res.status}`);
  const items = (await res.json()) as LongdoEventFeedItem[];
  const [minLon, minLat, maxLon, maxLat] = bbox;

  return items
    .filter((item) => item.lon >= minLon && item.lon <= maxLon && item.lat >= minLat && item.lat <= maxLat)
    .map((item) => ({
      id: String(item.id ?? `${item.lat},${item.lon}-${item.time ?? ""}`),
      type: item.type ?? "unknown",
      descriptionTh: item.description ?? item.title ?? "",
      lat: item.lat,
      lon: item.lon,
      reportedAt: item.time ?? null,
    }));
}

/** The Thai UI label for each liveness tier — never say "สด" (live) for a snapshot. */
export const CAMERA_LIVENESS_TH: Record<CameraLiveness, string> = {
  stream: "วิดีโอสด",
  snapshot: "ภาพนิ่งอัปเดตอัตโนมัติ",
  pin: "ตำแหน่งกล้อง (ไม่มีภาพ)",
};
