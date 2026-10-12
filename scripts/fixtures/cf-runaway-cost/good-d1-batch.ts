export default {
  async fetch(_request, env) {
    await env.DB.batch([env.DB.prepare("insert into t values (?)").bind(1)]);
    return new Response("ok");
  },
};
