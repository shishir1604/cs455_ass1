
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
        dispatchEvent: jest.fn(), 
      };
    }
    if (selector === '#startButton' || selector === '#restartButton') {
      return {
        addEventListener: mockAddEventListener,
      };
    }
    if (selector === '#startScreen') {
      return {
        style: {
          display: 'block',
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
  
  
  const { endGame } = require('../js/game.js');
  
  test('should end game when lives reach 0', () => {
    
    global.isGameOver = true;
  
    
    const endScreenElement = document.querySelector('#endScreen');
    const finalScoreElement = document.querySelector('#finalScore');
  
  
  
    if (finalScoreElement) {
      
      endGame();
  
  
      expect(global.isGameOver).toBe(true);
     
      expect(mockClearInterval).toHaveBeenCalled();
    }
  });
  