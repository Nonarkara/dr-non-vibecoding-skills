export default {
  async fetch(_request, env) {
    for (const item of items) {
      await env.KV.put(item.id, JSON.stringify(item));
    }
    return new Response("ok");
  },
};
