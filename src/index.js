/* global window document */
const { getShell, getInsertion } = require("./utils");
const Counter = require("./Counter");
require("./index.css");

const DOWN = 38;
const UP = 40;

let getSort = getInsertion;
let shell;
let counter;
const countOfArray = document.forms.setting.count;

function reset() {
  const pattern = document.querySelector('input[name="pattern"]:checked').value;
  const countStr = countOfArray.value === "" ? 20 : countOfArray.value;
  shell = getSort(parseInt(countStr), pattern);
  counter = new Counter(shell.allState.length);
  shell.show(0);
}
reset();

function move(e) {
  switch (e.keyCode) {
    case DOWN:
      counter.dec();
      shell.show(counter.count);
      break;
    case UP:
      counter.inc();
      shell.show(counter.count);
      break;
  }
}
window.addEventListener("keydown", move);

const startButton = document.getElementById("start-button");
const speed = document.forms.property.speed;
startButton.addEventListener("click", () => {
  shell.autoPlay(counter, speed.value);
});

const stopButton = document.getElementById("stop-button");
stopButton.addEventListener("click", () => {
  shell.stopPlay();
});

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", () => {
  counter.count = 0;
  shell.show(0);
});

const generateButton = document.getElementById("generate-button");
generateButton.addEventListener("click", () => {
  if (!shell.running) reset();
});

const insertionTab = document.getElementById("insertion");
const shellTab = document.getElementById("shell");
// const vsTab = document.getElementById("insertion-vs-shell");
insertionTab.addEventListener("click", () => {
  if (insertionTab.classList.contains("active")) return;
  insertionTab.classList.add("active");
  shellTab.classList.remove("active");
  // vsTab.classList.remove("active");
  getSort = getInsertion;
  reset();
});

shellTab.addEventListener("click", () => {
  if (shellTab.classList.contains("active")) return;
  insertionTab.classList.remove("active");
  shellTab.classList.add("active");
  // vsTab.classList.remove("active");
  getSort = getShell;
  reset();
});

// vsTab.addEventListener("click", () => {
//   if (vsTab.classList.contains("active")) return;
//   insertionTab.classList.remove("active");
//   shellTab.classList.remove("active");
//   vsTab.classList.add("active");
//   reset();
// });
