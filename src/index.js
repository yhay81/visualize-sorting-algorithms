/* global window document */
const { getShell, getInsertion, Counter } = require("./utils");
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
  const cnt = parseInt(countStr);
  if (cnt > 300) {
    countOfArray.value == ">300 is not allowed";
    return;
  }
  shell = getSort(cnt, pattern);
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

const sortName = document.getElementById("sort-name");
insertionTab.addEventListener("click", () => {
  if (insertionTab.classList.contains("active")) return;
  insertionTab.classList.add("active");
  shellTab.classList.remove("active");
  sortName.innerText = "Insertion Sort";
  getSort = getInsertion;
  reset();
});

shellTab.addEventListener("click", () => {
  if (shellTab.classList.contains("active")) return;
  insertionTab.classList.remove("active");
  shellTab.classList.add("active");
  sortName.innerText = "Shell Sort";
  getSort = getShell;
  reset();
});
