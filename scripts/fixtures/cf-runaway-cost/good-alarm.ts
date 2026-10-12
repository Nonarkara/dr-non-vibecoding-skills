const MAX_ALARM_RUNS = 50;

export class SessionDO {
  async work() {}

  async hasPendingWork() {
    return false;
  }

  async alarm() {
    if (this.env.ALARMS_DISABLED === "1") return;
    const n = ((await this.ctx.storage.get<number>("alarmRuns")) ?? 0) + 1;
    if (n > MAX_ALARM_RUNS) { console.error("alarm cap hit"); await this.ctx.storage.deleteAlarm(); return; }
    await this.ctx.storage.put("alarmRuns", n);
    try { await this.work(); await this.ctx.storage.put("alarmRuns", 0); }
    finally {
      if (await this.hasPendingWork() && !(await this.ctx.storage.getAlarm()))
        await this.ctx.storage.setAlarm(Date.now() + Math.min(2 ** n * 1000, 3_600_000));
    }
  }
}
