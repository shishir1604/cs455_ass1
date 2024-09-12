
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


const { GameObject, endGame, gameProcess, startGame } = require('../js/game.js');

describe('GameObject', () => {
  let gameObject;

  beforeEach(() => {

    gameObject = new GameObject(100, 100, 50, 'fruit');
  });

  test('should initialize correctly', () => {
    expect(gameObject.x).toBe(100);
    expect(gameObject.y).toBe(100);
    expect(gameObject.radius).toBe(50);
    expect(gameObject.type).toBe('fruit');
    expect(gameObject.velocityX).toBeGreaterThanOrEqual(-2);
    expect(gameObject.velocityX).toBeLessThanOrEqual(2);
    expect(gameObject.velocityY).toBeGreaterThanOrEqual(-10);
    expect(gameObject.velocityY).toBeLessThanOrEqual(4);
    expect(gameObject.gravity).toBe(0.1);
  });
});
