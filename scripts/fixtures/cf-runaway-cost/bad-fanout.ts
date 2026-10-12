export default {
  async scheduled(_event, env) {
    for (const name of names) {
      await env.ROOM.getByName(name).fetch("https://example.com/tick");
    }
  },
};
