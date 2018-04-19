const Sort = require("./Sort");

class InsertSort extends Sort {
  /**
   * Do the Insert Sort
   */
  sort() {
    let a = this.array;
    const step = 1;
    let compares = 0;
    for (let i = 0; i < a.length; i++) {
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
    this.array = a;
  }
}

module.exports = InsertSort;
