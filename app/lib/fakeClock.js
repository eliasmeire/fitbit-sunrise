export class FakeClock {
  _ticker = null;
  _minutes = 0;
  _hours = 0;
  _ontick = () => {};
  interval = 16;

  start = () => {
    const now = new Date();
    this._hours = now.getHours();
    this._minutes = now.getMinutes();
    this._ticker = setInterval(this.tick, this.interval);
  };

  tick = () => {
    this._minutes++;
    if (this._minutes === 60) {
      this._hours++;
      this._minutes = 0;
    }
    if (this._hours === 24) {
      this._hours = 0;
    }
    const event = {
      date: { getHours: () => this._hours, getMinutes: () => this._minutes }
    };
    this._ontick(event);
  };

  stop = () => {
    clearInterval(this._ticker);
  };

  set ontick(value) {
    if (value) {
      this.start();
      this._ontick = value;
    } else {
      this.stop();
    }
  }
}
