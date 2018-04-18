/* global document */
const d3 = require("d3");

class ShellSort {
  constructor(array) {
    this.array = array;
    this.node = document.getElementById("log");
    this.allState = [];
  }

  /**
   * Do the Shell Sort
   */
  sort() {
    let a = this.array;
    for (
      let step = parseInt(a.length / 2);
      step > 0;
      step = parseInt(step / 2)
    ) {
      for (let i = step; i < a.length; i++) {
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
    }
    this.array = a;
  }

  /**
   * Show Image of sorting.
   * @param {*} i: index of status
   */
  show(i) {
    let { array, step, first, second, temp } = this.allState[i];
    const W = 1000;
    const H = 200;
    const BAR_W = 20;
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
        return H - d * 10;
      })
      .attr("width", BAR_W)
      .attr("height", function(d) {
        return d * 10;
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
        return H - d * 10 + 15;
      })
      .attr("font-size", "10px")
      .attr("fill", "white");
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
}

module.exports = ShellSort;
