const {
  TEST_BOARDS,
  getTestBoard,
  getTestPieces,
} = require('common/mockData/mocks')
const { subscribe } = require('frontend/helpers/pubSub');

/**
 * Gets a mock html canvas ctx
 * @returns {object}
 */
const getMockCtx = () => ({
  canvas: {
    width: 0,
    height: 0,
    xScale: 1,
    yScale: 1
  },
  scale(xScale, yScale) {
    this.canvas.xScale = xScale;
    this.canvas.yScale = yScale;
  },
  fillStyle: "",
  fillRect: jest.fn(),
  lineWidth: 0,
  strokeStyle: "",
  strokeRect: jest.fn(),
  clearRect: jest.fn(),
});

/**
 * Gets a mock DOM selector
 * @returns {object}
 */
const getMockDOMSelector = () => ({
  id: "",
  innerText: "",
  parentNode: {
    removeChild: jest.fn()
  },
  classList: {
    classes: [],
    add(className) {
      const idx = this.classes.indexOf(className);
      if (idx < 0) this.classes.push(className)
    },
    remove(className) {
      const idx = this.classes.indexOf(className);
      if (idx > -1) this.classes.splice(idx, 1);
    },
    replace(class1, class2) {
      const idx = this.classes.indexOf(class1);
      if (idx > -1) this.classes[idx] = class2;
    },
    contains(className) {
      return this.classes.indexOf(className) > -1;
    }
  },
  getContext: () => getMockCtx(),
  appendChild: jest.fn(),
});

/**
 * Mocks document.requestAnimationFrame
 */
const mockAnimation = () => {
  let t = 0;
  return (callback) => setTimeout(() => {
    t += 100;
    callback(t);
  }, 100)
};

/**
 * Subscribes objects to pubSub topics so that they can be tracked
 * in tests when called
 * @returns {Object[]} - a list of mock functions subscribed to individual topics
 */
const pubSubMocks = () => {
  const mocks = {
    gameOverMock: jest.fn(),
    gameOverMock: jest.fn(),
    lowerPieceMock: jest.fn(),
    drawMock: jest.fn(),
    clearMock: jest.fn(),
    boardMock: jest.fn(),
    updateScoreMock: jest.fn(),
    executeCommandsMock: jest.fn(),
  }

  const unsubscribe = [
    subscribe('gameOver', mocks.gameOverMock),
    subscribe('lowerPiece', mocks.lowerPieceMock),
    subscribe('draw', mocks.drawMock),
    subscribe('clearLines', mocks.clearMock),
    subscribe('boardChange', mocks.boardMock),
    subscribe('updateScore', mocks.updateScoreMock),
    subscribe('sendMessage', mocks.executeCommandsMock),
  ]

  const clearMockSubscriptions = () => {
    unsubscribe.forEach(unsub => unsub());
  }

  return {
    ...mocks,
    clearMockSubscriptions
  }
}

module.exports = {
  TEST_BOARDS,
  getTestBoard,
  getTestPieces,
  getMockCtx,
  getMockDOMSelector,
  mockAnimation,
  pubSubMocks,
}