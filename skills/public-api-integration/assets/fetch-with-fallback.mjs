// MIT. Public, non-sensitive JSON only. TTL cache, not SWR or a circuit breaker.
export async function fetchWithFallback(cacheKey, url, {
  validate, ttlMs = 300_000, maxStaleMs = 86_400_000, timeoutMs = 8_000,
  maxBytes = 1_000_000, storage, fetcher = globalThis.fetch, now = Date.now,
} = {}) {
  if (typeof validate !== 'function') throw new TypeError('A payload validator is required');
  if (![ttlMs,maxStaleMs,timeoutMs,maxBytes].every(n=>Number.isFinite(n)&&n>0) || maxStaleMs<ttlMs) {
    throw new TypeError('Invalid fetch/cache limits');
  }
  const target = new URL(url);
  if (target.protocol !== 'https:' || target.username || target.password) throw new TypeError('HTTPS without URL credentials required');
  const checked = data => { try { return validate(data) === true; } catch { return false; } };
  let cache = null;
  try {
    storage ??= globalThis.localStorage;
    const raw = storage?.getItem(cacheKey);
    const parsed = raw && raw.length <= maxBytes ? JSON.parse(raw) : null;
    const age = now() - parsed?.timestamp;
    if (parsed && Number.isFinite(parsed.timestamp) && Number.isFinite(new Date(parsed.timestamp).getTime())
        && Number.isFinite(age) && age>=0 && age<=maxStaleMs && checked(parsed.data)) cache = parsed;
    else if (raw) storage.removeItem(cacheKey);
  } catch { /* Optional storage cannot prevent a valid network request. */ }
  const result = (entry, source, error=null) => ({
    data: entry?.data ?? null, source, isFresh: source==='network'||source==='cache',
    fetchedAt: entry ? new Date(entry.timestamp).toISOString() : null,
    ageMs: entry ? Math.max(0,now()-entry.timestamp) : null, error,
  });
  if (cache && now()-cache.timestamp < ttlMs) return result(cache,'cache');
  const controller = new AbortController();
  const timer = setTimeout(()=>controller.abort(),timeoutMs);
  let failure = 'network';
  try {
    const response = await fetcher(target.href, {signal:controller.signal,credentials:'omit',redirect:'error',headers:{Accept:'application/json'}});
    if (!response.ok) { failure=`http-${response.status}`; throw new Error(failure); }
    if (!response.body?.getReader) throw new Error('stream unavailable');
    const reader = response.body.getReader();
    const chunks = [];
    let length = 0;
    try {
      while (true) {
        const {done,value} = await reader.read();
        if (done) break;
        length += value.byteLength;
        if (length>maxBytes) { failure='response-too-large'; await reader.cancel(); throw new Error(failure); }
        chunks.push(value);
      }
    } finally { reader.releaseLock(); }
    const bytes = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk,offset); offset+=chunk.byteLength; }
    let data;
    try { data=JSON.parse(new TextDecoder().decode(bytes)); }
    catch { failure='invalid-payload'; throw new Error(failure); }
    if (!checked(data)) { failure='invalid-payload'; throw new Error(failure); }
    const entry={data,timestamp:now()};
    try { storage?.setItem(cacheKey,JSON.stringify(entry)); } catch { /* Quota failure does not invalidate network data. */ }
    return result(entry,'network');
  } catch {
    if (controller.signal.aborted) failure='timeout';
    if (cache && now()-cache.timestamp<=maxStaleMs) return result(cache,'stale-cache',failure);
    return result(null,'unavailable',failure);
  } finally { clearTimeout(timer); }
}
