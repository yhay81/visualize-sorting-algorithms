const Sort = require("./Sort");

class ShellSort extends Sort {
  /**
   * Do the Shell Sort
   */
  sort() {
    let a = this.array;
    let compares = 0;
    for (
      let k = 2, step = Math.floor(a.length / 2);
      step > 0;
      k *= 2, step = Math.floor(a.length / k)
    ) {
      for (let i = step; i < a.length; i++) {
        this.store(step, i, 0, 0, compares);
        let tmp = a[i];
        this.store(step, i, 0, tmp, compares);
        for (var j = i; j >= step; j -= step) {
          this.store(step, i, j, tmp, compares);
          compares++;
          if (a[j - step] > tmp) {
            a[j] = a[j - step];
            this.store(step, i, j, tmp, compares);
          } else {
            break;
          }
        }
        a[j] = tmp;
        this.store(step, i, j, tmp, compares);
      }
    }
    this.array = a;
  }
}

module.exports = ShellSort;
