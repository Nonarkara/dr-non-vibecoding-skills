const MAX_ALARM_RUNS = 50;

export class SessionDO {
  async fetch() {
    if (this.env.ALARMS_DISABLED === "1") return new Response("off");
    if (!(await this.ctx.storage.getAlarm())) {
      await this.ctx.storage.setAlarm(Date.now() + Math.min(2 ** 1 * 1000, 3_600_000));
    }
    return new Response("ok");
  }

  async alarm() {
    if (this.env.ALARMS_DISABLED === "1") return;
    const n = ((await this.ctx.storage.get<number>("alarmRuns")) ?? 0) + 1;
    if (n > MAX_ALARM_RUNS) {
      console.error("alarm cap hit");
      await this.ctx.storage.deleteAlarm();
      return;
    }
    await this.ctx.storage.put("alarmRuns", n);
  }
}
