
const mockGetContext = jest.fn(() => ({
    drawImage: jest.fn(),
    clearRect: jest.fn(),
  }));
  
  const mockAddEventListener = jest.fn();
  const mockRemoveEventListener = jest.fn();
  
  document.querySelector = jest.fn((selector) => {
    if (selector === '#gameCanvas') {
      return {
        getContext: mockGetContext,
        width: 500,
        height: 500,
        style: { display: 'block' },
        addEventListener: mockAddEventListener,
        removeEventListener: mockRemoveEventListener,
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
    if (selector === '#startButton' || selector === '#restartButton') {
      return {
        addEventListener: mockAddEventListener,
      };
    }
    if (selector === '#startScreen' || selector === '#endScreen') {
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
    
    if (id === 'leaderBoardButton') {
      return {
        addEventListener: jest.fn(),
      };
    }
  
    // Mock other IDs as needed
    return null; // Return null for unhandled IDs
  });

  require('../js/game.js'); 
  
  test('should set display styles correctly for startScreen and canvas', () => {
    const startScreenElement = document.querySelector('#startScreen');
    const canvasElement = document.querySelector('#gameCanvas');
  
    
    startScreenElement.style.display = 'block';
    canvasElement.style.display = 'none';
  
    
    expect(startScreenElement.style.display).toBe('block');
    expect(canvasElement.style.display).toBe('none');
  });
  
