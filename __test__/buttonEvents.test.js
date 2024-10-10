
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
    if(selector === '#playerName'){
      return {
        value: 'test',
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
  document.getElementById = jest.fn((id) => {
    if (id === 'backButton') {
      return {
        addEventListener: jest.fn(),
      };
    }
    if(id === 'leaderBoardButton'){
      return {
        addEventListener: jest.fn(),
      };
    }
    if (id === 'leaderBoardSection') {
      return {
        style: {
          display: 'block',
        },
      };
    }
    if (id === 'startScreen') {
      return {
        style: {
          display: 'block',
        },
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
    if (id === 'score') {
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
    if (id === 'lives') {
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
    if (id === 'playerName') {
      return {
        value: 'test',
      };
    }
    // Mock other IDs as needed
    return null; // Return null for unhandled IDs
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
  
  test('should add event listeners to start and restart buttons', () => {

    const startButton = document.querySelector('#startButton');
    const restartButton = document.querySelector('#restartButton');
  

    if (startButton) {
      startButton.addEventListener.mock.calls.forEach(([event, handler]) => {
        if (event === 'click') {
          handler(); 
        }
      });
    }
    
    if (restartButton) {
      restartButton.addEventListener.mock.calls.forEach(([event, handler]) => {
        if (event === 'click') {
          handler(); 
        }
      });
    }
  

    const buttonEvents = mockAddEventListener.mock.calls.filter(([event]) =>
      event === 'click'
    );
  
    expect(buttonEvents).toEqual([
      ['click', expect.any(Function)], 
      ['click', expect.any(Function)]  
    ]);

    expect(global.isGameOver).toBe(false);
  });
  
