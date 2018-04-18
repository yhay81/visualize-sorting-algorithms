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
}

module.exports = Counter;
