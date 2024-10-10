
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
  let consoleOutput = [];
  const mockConsoleLog = output => consoleOutput.push(output);
  const originalConsoleLog = console.log;

  beforeEach(() => {
    originalMathRandom = Math.random;
    Math.random = jest.fn(() => 0.5);
    
    // Mock global variables
    global.isGameOver = false;
    global.canvas = { width: 500, height: 500 };
    global.gameObjects = [];
    global.fruitImages = [new Image()]; // Mock fruit images
    global.bombImage = new Image(); // Mock bomb image

    // Mock console.log
    console.log = mockConsoleLog;
    consoleOutput = [];
  });

  afterEach(() => {
    Math.random = originalMathRandom;
    console.log = originalConsoleLog;
  });



  test('gameObject should not push if game is over', () => {
    global.isGameOver = true;

    // Call gameObject function
    gameObject();

    // Log captured console output
    console.log('Captured console output:', consoleOutput);

    // Assertions
    expect(gameObjects.length).toBe(0); // No GameObject should be added
  });
});
