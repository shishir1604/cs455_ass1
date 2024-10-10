// Mocking getContext for canvas
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
    if (selector === '#startButton' || selector === '#restartButton' || selector === '#backButton' || selector === '#leaderBoardButton') {
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
    if (id === 'endScreen') {
      return {
        style: {
          display: 'none',
        },
      };
    }
    if (id === 'backButton' || id === 'leaderBoardButton') {
      return {
        addEventListener: jest.fn(),
      };
    }
    return null;
  });
  

const { fetchtopScore } = require('../js/game.js'); 
global.fetch = jest.fn();

describe('fetchtopScore', () => {
  let mockLeaderBoard;
  let mockLeaderBoardSection;

  beforeEach(() => {
    
    jest.clearAllMocks();

    
    mockLeaderBoard = {
      innerHTML: '',
      appendChild: jest.fn(child => {
        mockLeaderBoard.innerHTML += child.outerHTML || '';
      })
    };
    mockLeaderBoardSection = {
      style: {
        display: 'none'
      }
    };


    document.getElementById = jest.fn(id => {
      if (id === 'leaderBoard') return mockLeaderBoard;
      if (id === 'leaderBoardSection') return mockLeaderBoardSection;
      return null;
    });


    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue([
        { player: 'Player1', score: 100, date: '2023-01-01T00:00:00.000Z' },
        { player: 'Player2', score: 90, date: '2023-01-02T00:00:00.000Z' }
      ])
    });
  });

  afterEach(() => {

    jest.restoreAllMocks();
  });

  test('fetches and displays top scores correctly', async () => {
    await fetchtopScore();

    
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/high-score');


    expect(mockLeaderBoard.innerHTML).toContain('Player1');
    expect(mockLeaderBoard.innerHTML).toContain('100');
    expect(mockLeaderBoard.innerHTML).toContain('1/1/2023');
    expect(mockLeaderBoard.innerHTML).toContain('Player2');
    expect(mockLeaderBoard.innerHTML).toContain('90');
    expect(mockLeaderBoard.innerHTML).toContain('1/2/2023');


    expect(mockLeaderBoardSection.style.display).toBe('block');
  });
