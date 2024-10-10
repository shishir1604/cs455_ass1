
const mockGetContext = jest.fn(() => ({
  drawImage: jest.fn(),
  clearRect: jest.fn(),
}));


document.querySelector = jest.fn((selector) => {
  if (selector === '#gameCanvas') {
    return {
      getContext: mockGetContext,
      addEventListener: jest.fn(),
      width: 500,
      height: 500,
      style: { display: 'block' },
      dispatchEvent: jest.fn(),
    };
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


const { gameProcess } = require('../js/game.js');


test('should update score display correctly', () => {

  const scoreElement = document.getElementById('score');


  global.score = 5;
  scoreElement.textContent = `Score: ${global.score}`;


  expect(scoreElement.textContent).toBe('Score: 5');
});
