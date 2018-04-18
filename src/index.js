/* global window */
const ShellSort = require("./Sort");
const Counter = require("./Counter");
require("./index.css");

const shell = new ShellSort([10, 3, 1, 9, 7, 6, 12, 8, 2, 4, 5, 11]);
shell.sort();
const counter = new Counter(shell.allState.length);

const LEFT = 37;
const RIGHT = 39;
const move = (e) => {
  switch (e.keyCode) {
    case LEFT:
      counter.dec();
      shell.show(counter.count);
      break;
    case RIGHT:
      counter.inc();
      shell.show(counter.count);
      break;
  }
};
window.addEventListener("keydown", move);
