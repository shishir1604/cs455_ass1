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
  


const { mousemovement } = require('../js/game.js'); // Adjust the import based on your file structure



describe('mousemovement', () => {
  beforeEach(() => {
    // Reset global state before each test
    jest.clearAllMocks();
    global.score = 0;
    global.lives = 3;
    global.isGameOver = false;
    global.endGame= jest.fn();
    global.gameObjects = [
      { x: 100, y: 100, radius: 30, type: 'fruit' }, // Fruit object
      { x: 200, y: 200, radius: 30, type: 'bomb' },  // Bomb object
    ];


  });

  test('should increment score when fruit is sliced', () => {
    // Simulate mouse movement near the fruit
    const event = {
      clientX: 115, // Adjusted to be within the fruit's radius
      clientY: 115, // Adjusted to be within the fruit's radius
    };

    mousemovement(event); // Call the function

    console.log('Score after slicing fruit:', global.score); // Debugging output
    console.log('Game objects remaining:', global.gameObjects); // Debugging output

    expect(global.score).toBe(1); // Score should increment
    expect(global.gameObjects.length).toBe(1); // One object should be removed
    expect(global.gameObjects[0].type).toBe('bomb'); // Remaining object is bomb
  });

  test('should call endGame when bomb is sliced', () => {
    // Simulate mouse movement near the bomb
    const event = {
      clientX: 215, // Adjusted to be within the bomb's radius
      clientY: 215, // Adjusted to be within the bomb's radius
    };

    mousemovement(event); // Call the function

    expect(global.endGame).toHaveBeenCalled(); // endGame should be called
    expect(global.gameObjects.length).toBe(1); // One object should be removed
    expect(global.gameObjects[0].type).toBe('fruit'); // Remaining object is fruit
  });

  test('should not do anything if the game is over', () => {
    global.isGameOver = true; // Set game over
 
    // Simulate mouse movement near the fruit
    const event = {
      clientX: 115, // Adjusted to be within the fruit's radius
      clientY: 115, // Adjusted to be within the fruit's radius
    };

    mousemovement(event); // Call the function

    expect(global.score).toBe(0); // Score should not change
    expect(global.gameObjects.length).toBe(2); // No objects should be removed
    expect(global.endGame).not.toHaveBeenCalled(); // endGame should not be called
  });
});
