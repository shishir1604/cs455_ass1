
// setupTest.js
global.Image = class {
  constructor() {
      this.src = ''; // Mock the src property
  }
};
Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 500 });
Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 500 });

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
  
    if (selector === '#backButton'){
      return {
        addEventListener: mockAddEventListener,
      };
    }
    if(selector === '#leaderBoardButton'){
      return {
        addEventListener: mockAddEventListener,
      };
    }
    if (selector === '#leaderBoardSection') {
      return {
        style: {
          display: 'none',
        },
      };
    }
    if (selector === '#startScreen' || selector === '#endScreen') {
      return {
        style: { display: 'none' } 
      };
    }
    if (selector === '#startButton' || selector === '#restartButton') {
      return {
        addEventListener: mockAddEventListener, 
      };
    }
    if (selector === '#score') {
      return {
        textContent: '',
        set textContent(value) {
          this._textContent = value;
        },
        get textContent() {
          return this._textContent;
        }
      };
    }
    if (selector === '#lives') {
      return {
        textContent: '',
        set textContent(value) {
          this._textContent = value;
        },
        get textContent() {
          return this._textContent;
        }
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
  
  document.getElementById = jest.fn((id) => {
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
  
    // Mock other IDs as needed
    return null; // Return null for unhandled IDs
  });
const { GameObject, gameObject } = require('../js/game.js'); // Adjust the path to your game file

describe('GameObject', () => {

  beforeEach(() => {
    // Set up a mock canvas context
    global.mockCtx = {
      drawImage: jest.fn(),
    };
    global.gameObjects = [];
    // Create a new GameObject instance
  
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  test('update() should update position based on velocity and gravity', () => {
    // Initial values
    const gameObjectInstance = new GameObject(100, 100, 60, 'fruit');
    gameObjectInstance.velocityX = 2; // Set some initial values for testing
    gameObjectInstance.velocityY = 3;
    gameObjectInstance.gravity = 1;
    const initialX = gameObjectInstance.x;
    const initialY = gameObjectInstance.y;
    
    // Call update
    gameObjectInstance.update();

    // Assertions
    expect(gameObjectInstance.x).toBe(initialX + gameObjectInstance.velocityX);
    expect(gameObjectInstance.y).toBe(initialY + gameObjectInstance.velocityY );
    expect(gameObjectInstance.velocityY).toBe(4); // Previous value (3) + gravity (1)
  });
});

describe('gameObject function', () => {
  let originalMathRandom;

  beforeEach(() => {
    originalMathRandom = Math.random; // Store the original Math.random
    Math.random = jest.fn(() => 0.5); // Mock Math.random to return a fixed value
    // Set up initial state
    global.gameObjects = [];
    

  });

  afterEach(() => {
    Math.random = originalMathRandom; // Restore the original Math.random
  });

  test('gameObject should push a new GameObject into gameObjects array', () => {
    global.isGameOver = false; // Set game to not over

    // Mock the canvas width to ensure consistency
    global.canvas = { width: 500, height: 500 }; // Set canvas dimensions
    const radius = 60;

    // Call gameObject function
    gameObject();
 
    // Assertions
    expect(global.gameObjects.length).toBe(1);
    expect(global.gameObjects[0]).toBeInstanceOf(GameObject);
    expect(global.gameObjects[0].x).toBe(250); // With mocked Math.random(), x should be (0.5 * (500 - 120)) + 60
    expect(global.gameObjects[0].y).toBe(500); // y should be canvas.height
    expect(global.gameObjects[0].type).toBe('fruit'); // Since Math.random > 0.1 returns true
});


  test('gameObject should not push if game is over', () => {
    global.isGameOver = true; // Set game to over

    

    // Call gameObject function
    gameObject();

    // Assertions
    expect(gameObjects.length).toBe(0); // No GameObject should be added
  });
});
