class Counter {
  constructor(max) {
    this.max = max;
    this.count = 0;
  }
  inc() {
    if (this.count < this.max) this.count++;
  }
  dec() {
    if (this.count > 0) this.count--;
  }
  get isEnd() {
    return this.count === this.max;
  }
  get isStart() {
    return this.count === 0;
  }
}

module.exports = Counter;
