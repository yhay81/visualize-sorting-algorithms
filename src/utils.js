const ShellSort = require("./sorts/ShellSort");
const InsertionSort = require("./sorts/InsertionSort");

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
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

  for (let each of array1) {
    array2.push(shuffle(each));
  }
  return array3.concat(...array2);
}

function createArray(count, pattern) {
  switch (pattern) {
    case "reversed":
      return Array.from(new Array(count)).map((v, i) => count - i);

    case "sorted":
      return makeNearlySortedArray(count);

    case "few-unique":
      return shuffle(
        Array.from(new Array(count)).map((v, i) =>
          Math.ceil((5 * (i + 1)) / count)
        )
      );

    default:
      return shuffle(Array.from(new Array(count)).map((v, i) => i + 1));
  }
}

function getShell(count, pattern) {
  const array = createArray(count, pattern);
  const shell = new ShellSort(array);
  shell.sort();
  return shell;
}

function getInsertion(count, pattern) {
  const array = createArray(count, pattern);
  const insertion = new InsertionSort(array);
  insertion.sort();
  return insertion;
}

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

module.exports = { getShell, getInsertion, Counter };
