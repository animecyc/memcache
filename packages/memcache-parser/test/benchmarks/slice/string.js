/* eslint-disable */
var generateRandomString = require("../generate-random-string");
var measure = require("../measure");
var params = require("./params");

var itemSize = params.itemSize;
var totalItems = params.totalItems;
var iterations = params.iterations;
var sliceSize = params.sliceSize;

var i;
var bufs = new Array(totalItems);
for (i = 0; i < totalItems; i++) {
  bufs[i] = generateRandomString(itemSize);
}

var sliced;

measure(iterations, "string slice", {
  pre: () => {
    global.gc();
    sliced = new Array(totalItems);
  },
  test: () => {
    for (i = 0; i < totalItems; i++) {
      sliced[i] = bufs[i].slice(0, sliceSize);
    }
  },
  post: () => {
    sliced = undefined;
  }
});
