const Sort = require("../src/Sort");
const { expect } = require("chai");

describe("Sort", () => {
  it("should be a function", () => {
    expect(Sort).to.be.a("function");
  });
  it("should have a sort method", () => {
    expect(Sort.prototype.sort).to.be.a("function");
  });
  it("should sort correctly", () => {
    const sort = new Sort([10, 3, 1, 9, 7, 6, 8, 2, 4, 5]);
    sort.sort();
    expect(sort.array).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
