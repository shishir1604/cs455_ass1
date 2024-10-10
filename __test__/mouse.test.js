// Mocking necessary DOM elements and functions
const mockGetContext = jest.fn(() => ({
    drawImage: jest.fn(),
    clearRect: jest.fn(),
  }));
  
  const mockAddEventListener = jest.fn();
  
  // Declare mockCanvas here
  const mockCanvas = {
    getContext: mockGetContext,
    getBoundingClientRect: jest.fn(() => ({
      left: 0,
      top: 0,
    })),
    addEventListener: mockAddEventListener,
    width: 500,
    height: 500,
    style: { display: 'block' },
  };
  
  // Mock document.querySelector to return mock canvas and other DOM elements
  document.querySelector = jest.fn((selector) => {
    if (selector === '#gameCanvas') {
      return mockCanvas;
    }
    if (selector === '#startButton' || selector === '#restartButton') {
      return {
        addEventListener: jest.fn(),
      };
    }
    if (selector === '#backButton'){
      return {
        addEventListener: jest.fn(),
      };
    }
    if(selector === '#leaderBoardButton'){
      return {
        addEventListener: jest.fn(),
      };
    }
    if (selector === '#leaderBoardSection') {
      return {
        style: {
          display: 'block',
        },
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
    return null;
  });
  
  
  document.getElementById = jest.fn((id) => {
    if (id === 'score') {
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
    if (id === 'lives') {
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
    if (id === 'endScreen') {
      return {
        style: {
          display: 'none',
        },
      };
    }
    if (id === 'finalScore') {
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
    if (id === 'backButton') {
      return {
        addEventListener: jest.fn(),
      };
    }
    
    if (id === 'leaderBoardButton') {
      return {
        addEventListener: jest.fn(),
      };
    }
     return null;
  });
  


  const { mousemovement } = require('../js/game.js');

  describe('mousemovement', () => {
    let gameState;
  
    beforeEach(() => {
      gameState = {
        gameObjects: [],
        isGameOver: false,
        score: 0,
        endGame: jest.fn()
      };
    });
  
    test('should do nothing if game is over', () => {
      gameState.isGameOver = true;
      const initialGameObjects = [...gameState.gameObjects];
      
      mousemovement({ clientX: 100, clientY: 100 }, gameState);
      
      expect(gameState.gameObjects).toEqual(initialGameObjects);
      expect(gameState.score).toBe(0);
      expect(gameState.endGame).not.toHaveBeenCalled();
    });
  
    test('should increase score when fruit is sliced', () => {
      gameState.gameObjects = [{ type: 'fruit', x: 100, y: 100, radius: 20 }];
      
      mousemovement({ clientX: 105, clientY: 105 }, gameState);
      
      expect(gameState.score).toBe(1);
      expect(gameState.gameObjects).toHaveLength(0);
    });
  
    test('should end game when bomb is sliced', () => {
      gameState.gameObjects = [{ type: 'bomb', x: 100, y: 100, radius: 20 }];
      
      mousemovement({ clientX: 105, clientY: 105 }, gameState);
      
      expect(gameState.endGame).toHaveBeenCalled();
      expect(gameState.gameObjects).toHaveLength(0);
    });
  
    test('should not affect objects outside of slice radius', () => {
      gameState.gameObjects = [
        { type: 'fruit', x: 100, y: 100, radius: 20 },
        { type: 'bomb', x: 200, y: 200, radius: 20 }
      ];
      
      mousemovement({ clientX: 150, clientY: 150 }, gameState);
      
      expect(gameState.score).toBe(0);
      expect(gameState.gameObjects).toHaveLength(2);
      expect(gameState.endGame).not.toHaveBeenCalled();
    });
  });
