export default {
  async fetch(_request, env) {
    const { success } = await env.MY_RATE_LIMITER.limit({ key: "global" });
    if (!success) return new Response("slow down", { status: 429 });
    await env.KV.put("latest", await _request.text());
    return new Response("ok");
  },
};
