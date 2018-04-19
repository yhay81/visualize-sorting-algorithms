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
      let k = 2, step = Math.floor(a.length / 2);
      step > 0;
      k *= 2, step = Math.floor(a.length / k)
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

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getShell(count, pattern) {
  let array = null;
  switch (pattern) {
    case "reversed":
      array = Array.from(new Array(count)).map((v, i) => count - i);
      break;

    case "sorted":
      array = makeNearlySortedArray(count);
      break;

    case "few-unique":
      array = shuffle(
        Array.from(new Array(count)).map((v, i) =>
          Math.ceil(5 * (i + 1) / count)
        )
      );
      break;

    default:
      array = shuffle(Array.from(new Array(count)).map((v, i) => i + 1));
      break;
  }
  const shell = new ShellSort(array);
  shell.sort();
  return shell;
}

function makeNearlySortedArray(count) {
  const array0 = Array.from(new Array(count)).map((v, i) => i + 1);
  const size = count > 10 ? 4 : 2;
  const array1 = [],
    array2 = [],
    array3 = [];
  for (let i = 0; i < Math.ceil(count / size); i++) {
    array1.push(array0.slice(i * size, (i + 1) * size));
  }
  console.log(array1);

  for (let each of array1) {
    array2.push(shuffle(each));
  }
  console.log(array2);
  return array3.concat(...array2);
}

module.exports = getShell;
