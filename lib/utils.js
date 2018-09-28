"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arePointsEqual = arePointsEqual;
function arePointsEqual(p1, p2) {
  if (p1 && p2) {
    return p1.x === p2.x && p1.y === p2.y;
  } else if (!p1 && !p2) {
    // If both are null
    return true;
  } else {
    // Only either one is null
    return false;
  }
}