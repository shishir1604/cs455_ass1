
const mockGetContext = jest.fn(() => ({
  drawImage: jest.fn(),
  clearRect: jest.fn(),
}));


const mockAddEventListener = jest.fn();

document.querySelector = jest.fn((selector) => {
  if (selector === '#gameCanvas') {
    return {
      getContext: mockGetContext,
      addEventListener: jest.fn(), 
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


test('startButton and restartButton should add event listeners', () => {
 
  const startButton = document.querySelector('#startButton');
  const restartButton = document.querySelector('#restartButton');

 
  expect(document.querySelector).toHaveBeenCalledWith('#startButton');
  expect(document.querySelector).toHaveBeenCalledWith('#restartButton');

 
  expect(mockAddEventListener).toHaveBeenCalledTimes(2); 


  expect(mockAddEventListener).toHaveBeenCalledWith('click', expect.any(Function));
});
