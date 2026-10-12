export class SessionDO {
  async alarm() {
    await this.work();
    await this.ctx.storage.setAlarm(Date.now());
  }
}
