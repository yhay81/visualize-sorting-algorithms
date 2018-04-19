/* global document */
const d3 = require("d3");

class InsertSort {
  constructor(array) {
    this.array = array;
    this.node = document.getElementById("log");
    this.allState = [];
  }

  /**
   * Do the Insert Sort
   */
  sort() {
    let a = this.array;
    const step = 1;
    for (let i = 0; i < a.length; i++) {
      this.store(step, i, -1, -1);
      let tmp = a[i];
      this.store(step, i, -1, tmp);
      for (var j = i; j >= step; j -= step) {
        this.store(step, i, j - step, tmp);
        if (a[j - step] > tmp) {
          a[j] = a[j - step];
          this.store(step, i, j - step, tmp);
        } else {
          break;
        }
      }
      a[j] = tmp;
      this.store(step, i, j - step, tmp);
    }
    this.array = a;
  }

  /**
   * Show Image of sorting.
   * @param {*} i: index of status
   */
  show(i) {
    let { array, step, first, second, temp } = this.allState[i];
    const W = 500;
    const H = 200;
    const BAR_W = (W - 100) / array.length;
    const BAR_H = H / Math.max(...array);
    array = Array.from(array);
    array.push(temp);

    d3
      .select("#log")
      .select("svg")
      .remove();

    const svg = d3
      .select("#log")
      .append("svg")
      .attr("width", W)
      .attr("height", H);

    svg
      .selectAll("rect")
      .data(array)
      .enter()
      .append("rect")
      .attr("x", function(d, i) {
        return i * (BAR_W + 1);
      })
      .attr("y", function(d, i) {
        return H - d * BAR_H;
      })
      .attr("width", BAR_W)
      .attr("height", function(d) {
        return d * BAR_H;
      })
      .attr("fill", function(d, i) {
        if (i === array.length - 1) {
          return "black";
        } else if (i == first || i == second) {
          return "red";
        } else if (first - i > 0 && (first - i) % step === 0) {
          return "green";
        } else {
          return "turquoise";
        }
      });

    if (array.lenght < 30) {
      svg
        .selectAll("text")
        .data(array)
        .enter()
        .append("text")
        .text(function(d) {
          return d;
        })
        .attr("text-anchor", "middle")
        .attr("x", function(d, i) {
          return i * (BAR_W + 1) + 10;
        })
        .attr("y", function(d) {
          return H - d * BAR_H + 15;
        })
        .attr("font-size", "10px")
        .attr("fill", "white");
    }
  }

  /**
   * Store each status during sorting.
   * @param {Number} step
   * @param {Numebr} first
   * @param {Number} second
   * @param {Number} temp
   */
  store(step, first, second, temp) {
    this.allState.push({
      array: Array.from(this.array),
      step,
      first,
      second,
      temp,
    });
  }

  async autoPlay(counter, speed = 100) {
    if (this.running) return;
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    this.stop = false;
    this.running = true;
    for (; !counter.isEnd && !this.stop; counter.inc()) {
      this.show(counter.count);
      await sleep(speed);
    }
    this.stop = true;
    this.running = false;
  }

  stopPlay() {
    this.stop = true;
  }
}

module.exports = InsertSort;
