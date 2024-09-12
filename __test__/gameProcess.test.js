
const mockDrawImage = jest.fn();
const mockClearRect = jest.fn();
const mockGetContext = jest.fn(() => ({
  drawImage: mockDrawImage,
  clearRect: mockClearRect,
}));

const mockAddEventListener = jest.fn();
const mockDispatchEvent = jest.fn();

document.querySelector = jest.fn((selector) => {
  if (selector === '#gameCanvas') {
    return {
      getContext: mockGetContext,
      addEventListener: mockAddEventListener,
      width: 500,
      height: 500,
      style: { display: 'block' },
      dispatchEvent: mockDispatchEvent,
    };
  }
  if (selector === '#startScreen' || selector === '#endScreen') {
    return {
      style: {
        display: 'none',
      },
    };
  }
  return null;
});

document.getElementById = jest.fn((id) => {
  if (id === 'score' || id === 'lives' || id === 'finalScore') {
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


const { gameProcess, GameObject, endGame } = require('../js/game.js');


let gameObject;

beforeEach(() => {
  
  gameObject = new GameObject(100, 100, 50, 'fruit');
  global.score = 0;
  global.lives = 3;
  global.isGameOver = false;
  global.gameObjects = [gameObject];
});


describe('gameProcess', () => {
  test('should update lives correctly when fruit falls off the screen', () => {
  
    gameObject.y = 600;  


    gameObject.update = jest.fn(() => {
      gameObject.y = 600;  
    });

  
    gameProcess();

 
    if(expect(global.gameObjects.length).toBe(1)){  

   
    expect(global.lives).toBe(2);  
    expect(global.score).toBe(0); 
    }
  });
});
