const { getEmptyBoard } = require('common/helpers/utils');

const filledLine = [0, 8, 8, 8, 8, 8, 8, 8, 8, 8];

const TEST_BOARDS = {
  empty: getEmptyBoard(),
  filledLine,
  pattern1: [
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
  ],
  pattern2: [
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  ],
  pattern3: [
    [0, 0, 0, 0, 0, 6, 0, 0, 0, 0],
    [0, 0, 0, 6, 6, 6, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  ],
  pattern4: [
    [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 6, 0, 0, 0, 0],
    [0, 0, 0, 6, 6, 6, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  ],
  pattern5: [
    [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 6, 0, 0, 0, 0],
    [0, 0, 0, 6, 6, 6, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 3, 3, 0, 0],
    [0, 0, 0, 1, 0, 0, 3, 0, 0, 0],
  ],
  pattern1SwappedWith2: [
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [...filledLine],
  ],
  pattern5SwappedWith4: [
    [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 6, 0, 0, 0, 0],
    [0, 0, 0, 6, 6, 6, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [...filledLine],
    [...filledLine],
  ],
  pattern2Scrambled: [
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  ],
  clearLines1: [
    [0, 0, 0, 0, 0, 0, 0, 5, 5, 0],
    [0, 0, 6, 0, 0, 0, 0, 7, 5, 5],
    [6, 6, 6, 0, 0, 0, 0, 7, 7, 7],
  ],
  clearLines1Cleared: [
    [0, 0, 0, 0, 0, 0, 0, 5, 5, 0],
    [0, 0, 6, 0, 0, 0, 0, 7, 5, 5],
  ],
  clearLines2: [
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [3, 3, 0, 1, 0, 2, 2, 7, 7, 7],
    [3, 4, 4, 1, 0, 2, 2, 5, 5, 7],
    [4, 4, 6, 1, 0, 2, 2, 7, 5, 5],
    [6, 6, 6, 1, 0, 2, 2, 7, 7, 7],
  ],
  clearLines2Cleared3: [
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [3, 3, 0, 1, 1, 2, 2, 7, 7, 7],
  ],
  clearLines2Cleared4: [
    [3, 3, 3, 3, 0, 0, 0, 0, 0, 0],
  ],
  clearLines3: [
    [0, 0, 4, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 4, 4, 0, 0, 6, 0, 0, 0],
    [3, 3, 3, 4, 6, 6, 6, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
  clearLines3Cleared: [
    [0, 0, 4, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 4, 4, 0, 0, 6, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 7, 0, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
  fullBoard: [
    [0, 0, 4, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 4, 4, 0, 0, 6, 0, 0, 0],
    [3, 3, 3, 4, 6, 6, 6, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 4, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 4, 4, 0, 0, 6, 0, 0, 0],
    [3, 3, 3, 4, 6, 6, 6, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 4, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 4, 4, 0, 0, 6, 0, 0, 0],
    [3, 3, 3, 4, 6, 6, 6, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
};

module.exports = TEST_BOARDS;
