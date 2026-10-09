export default {
  async fetch(_request, env) {
    for (const row of rows) {
      await env.DB.prepare("insert into t values (?)").bind(row).run();
    }
    return new Response("ok");
  },
};
