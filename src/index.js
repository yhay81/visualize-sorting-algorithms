/* global document window */

// How can we use require here if it's frontend? We can thank webpack.
const Sort = require("./Sort");

// A link to our styles!
require("./index.css");

let sort = new Sort([10, 3, 1, 9, 7, 6, 8, 2, 4, 5]);
sort.sort();

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
}
let counter = new Counter(sort.allState.length);

function move(e) {
  const left = 37;
  const right = 39;
  switch (e.keyCode) {
    case left:
      counter.dec();
      sort.show(counter.count);
      break;
    case right:
      counter.inc();
      sort.show(counter.count);
      break;
  }
}
window.addEventListener("keydown", move);
