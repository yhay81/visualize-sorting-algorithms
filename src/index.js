/* global window document */
const getShell = require("./Sort");
const Counter = require("./Counter");
require("./index.css");

let shell = getShell(20);
let counter = new Counter(shell.allState.length);

const DOWN = 38;
const UP = 40;
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
const countOfArray = document.forms.setting.count;
resetButton.addEventListener("click", () => {
  if (shell.running) return;

  const pattern = document.querySelector('input[name="exampleRadios"]:checked')
    .value;
  console.log(pattern);
  shell = getShell(parseInt(countOfArray.value), pattern);
  counter = new Counter(shell.allState.length);
  shell.show(0);
});
