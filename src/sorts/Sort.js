/* global document */
const d3 = require("d3");

class Sort {
  constructor(array) {
    this.array = array;
    this.node = document.getElementById("log");
    this.stepsNode = document.getElementById("steps");
    this.allState = [];
  }

  /**
   * Do the Sort
   */
  sort() {}

  /**
   * Show Image of sorting.
   * @param {*} i: index of status
   */
  show(i) {
    let { array, step, first, second, temp, compares } = this.allState[i];
    this.stepsNode.innerHTML =
      "How Many Comparing: " +
      compares +
      " / " +
      this.allState[this.allState.length - 1].compares;
    const W = 500;
    const H = 200;
    const BAR_W = W / (array.length + 1) - 1;
    const BAR_H = H / Math.max(...array);
    array = Array.from(array);
    array.push(temp);

    d3.select("#log")
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
      .attr("y", function(d) {
        return H - d * BAR_H;
      })
      .attr("width", BAR_W)
      .attr("height", function(d) {
        return d * BAR_H;
      })
      .attr("fill", function(d, i) {
        if (i === array.length - 1) {
          return "DarkRed";
        } else if (i == second) {
          return "red";
        } else if (i == second - step) {
          return "OrangeRed";
        } else if (i == first) {
          return "green";
        } else if (first - i > 0 && (first - i) % step === 0) {
          return "OliveDrab";
        } else {
          return "turquoise";
        }
      });

    if (array.length < 30) {
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
          return i * (BAR_W + 1) + BAR_W / 2;
        })
        .attr("y", function(d) {
          return H - d * BAR_H + BAR_W / 1.5;
        })
        .attr("font-size", function() {
          return BAR_W / 2 + "px";
        })
        .attr("fill", "white");
    }
  }

  store(step, first, second, temp, compares) {
    this.allState.push({
      array: Array.from(this.array),
      step,
      first,
      second,
      temp,
      compares,
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

module.exports = Sort;
