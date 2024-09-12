
const mockGetContext = jest.fn(() => ({
    drawImage: jest.fn(),
    clearRect: jest.fn(),
  }));
  
  const mockAddEventListener = jest.fn();
  
  document.querySelector = jest.fn((selector) => {
    if (selector === '#gameCanvas') {
      return {
        getContext: mockGetContext,
        addEventListener: mockAddEventListener,
        width: 500,
        height: 500,
        style: { display: 'block' },
      };
    }
    if (selector === '#startScreen') {
      return {
        style: {
          display: 'none',
        },
      };
    }
    if (selector === '#endScreen') {
      return {
        style: {
          display: 'none',
        },
      };
    }
    if (selector === '#finalScore') {
      return {
        _textContent: '', 
        set textContent(value) {
          this._textContent = value;
        },
        get textContent() {
          return this._textContent;
        }
      };
    }
    return null;
  });
  
  
  global.score = 0;
  global.lives = 1; 
  global.isGameOver = false;
  global.gameObjects = [];
  const mockSetInterval = jest.fn();
  const mockClearInterval = jest.fn();
  
  global.setInterval = mockSetInterval;
  global.clearInterval = mockClearInterval;
  

  const { startGame } = require('../js/game.js');
  
  test('should display start screen initially', () => {

    const startScreenElement = document.querySelector('#startScreen');
  
    startGame();
    expect(startScreenElement.style.display).toBe('none');
    expect(document.querySelector('#gameCanvas').style.display).toBe('block');
  });
  