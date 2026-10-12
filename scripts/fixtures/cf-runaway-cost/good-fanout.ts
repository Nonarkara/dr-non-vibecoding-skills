const MAX_FANOUT = 25;

export default {
  async scheduled(_event, env) {
    for (const name of names.slice(0, MAX_FANOUT)) {
      await env.ROOM.getByName(name).fetch("https://example.com/tick");
    }
  },
};
