export class SessionDO {
  async fetch() {
    await this.ctx.storage.setAlarm(Date.now() + 5_000);
  }

  async alarm() {
    await this.work();
  }
}
