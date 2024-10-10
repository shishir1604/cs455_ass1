const canvas = document.querySelector('#gameCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let score = 0;
let lives = 3;
let isGameOver = false;
const gameObjects = [];
let spawnRate = 1000;
let gameInterval;
let playerName;
const startScreen = document.querySelector('#startScreen');
const endScreen = document.querySelector('#endScreen');
const startButton = document.querySelector('#startButton');
const restartButton = document.querySelector('#restartButton');

const fruitImages = [
  'images/apple1-removebg-preview.png',
  'images/banana1.png',
  'images/orange1-removebg-preview.png',
  'images/cherries1.png',
  'images/watermelon1.png'
].map(src => {
  const img = new Image();
  img.src = src;
  return img;
});

const bombImage = new Image();
bombImage.src = 'images/bomb1-removebg-preview.png';

// ... (your existing code)

class GameObject {
  constructor(x, y, radius, type) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.type = type;
    this.velocityX = Math.random() * 4 - 2;
    this.velocityY = Math.random() * 4 - 10;
    this.gravity = 0.1;
    if (type === 'fruit') {
      this.image = fruitImages[Math.floor(Math.random() * fruitImages.length)];
    } else {
      this.image = bombImage;
    }
  }
  
  update() {
    this.velocityY += this.gravity;
    this.x += this.velocityX;
    this.y += this.velocityY;
  }

  draw() {
    ctx.drawImage(this.image, this.x - this.radius, this.y - this.radius, 
        this.radius * 2.5, this.radius * 2.5);
  }
}

function gameObject() {
  console.log('gameObject function called');
  console.log('isGameOver:', isGameOver);
  console.log('canvas:', canvas);
  console.log('gameObjects before:', gameObjects);

  if (isGameOver) { 
    console.log('Game is over, returning');
    return;
  }
  const radius = 60;
  let random = Math.random();
  const x = (random * (canvas.width - (2 * radius))) + radius;
  const y = canvas.height;
  const type = Math.random() > 0.9 ? 'bomb' : 'fruit';
  console.log('Creating new GameObject:', { x, y, radius, type });
  gameObjects.push(new GameObject(x, y, radius, type));

  console.log('gameObjects after:', gameObjects);
}





function mousemovement(event, gameState) {
  const { gameObjects, isGameOver, score, endGame } = gameState;
  if(isGameOver){
    return;
  }
  
  const { clientX, clientY } = event;

  gameObjects.forEach((obj, index) => {
    const distance = Math.sqrt((clientX - obj.x) ** 2 + (clientY - obj.y) ** 2);
    
    if (distance < obj.radius) {
      if (obj.type === 'fruit') {
        gameState.score += 1;
      } else if (obj.type === 'bomb') {
        endGame();
      }
      gameObjects.splice(index, 1);
    }
  });
}
// This wrapper function will be used as the event listener
function mousemovementWrapper(event) {
  const gameState = {
    gameObjects,
    isGameOver,
    score,
    endGame
  };
  mousemovement(event, gameState);
  // Update the global score if it changed
  score = gameState.score;
}
canvas.addEventListener('mousemove', mousemovementWrapper);
function gameProcess() {
  console.log('gameProcess called');
    if (isGameOver) 
        {
        return;
    }
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    for (let i = 0; i < gameObjects.length; i++) {
      const obj = gameObjects[i];
      obj.update();
      obj.draw();
      
      if (obj.y > canvas.height) {
        if (obj.type === 'fruit') {
          lives--;
          if (lives === 0) {
            endGame();
          }
        }
        gameObjects.splice(i, 1);
        i--;
      }
    }
  
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('lives').textContent = `Lives: ${lives}`;
  
    requestAnimationFrame(gameProcess);
  }
  
  function endGame() {
    isGameOver = true;
    const finalScoreElement = document.getElementById('finalScore');
    
    if (finalScoreElement) {
      finalScoreElement.textContent = `Final Score: ${score}`;
    }
    const player =playerName;
    fetch('/addScore',{
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({ player:player,score:score })
    })
    .then(response =>response.json())
    .then(data => {
        console.log('Success:',data);
    })
    .catch((error)=>{
        console.error('Error:',error);
    });
    //fetchtopScore();
    endScreen.style.display = 'block';
    clearInterval(gameInterval);
  }

  function fetchtopScore() {
    return fetch('/high-score')
      .then(response => response.json())
      .then(score => {
        const leaderBoard = document.getElementById('leaderBoard');
        if (!leaderBoard) {
          console.error('leaderBoard element not found');
          return;
        }
        leaderBoard.innerHTML = ''; 
  
        const table = document.createElement('table');
        table.classList.add('leaderboard-table'); 
  

        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
          <th>Player</th>
          <th>Score</th>
          <th>Date</th>
        `;
        table.appendChild(headerRow);
  
        
        score.forEach(row => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${row.player}</td>
            <td>${row.score}</td>
            <td>${new Date(row.date).toLocaleDateString()}</td>
          `;
          table.appendChild(tr);
        });
  
        leaderBoard.appendChild(table);
        console.log('leaderboard.innerHTML', leaderBoard.innerHTML);
        
        const leaderBoardSection = document.getElementById('leaderBoardSection');
        if (leaderBoardSection) {
          leaderBoardSection.style.display = 'block';
        } else {
          console.error('leaderBoardSection element not found');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
document.getElementById('backButton').addEventListener('click',()=>{
document.getElementById('leaderBoardSection').style.display='none';
});
document.getElementById('leaderBoardButton').addEventListener('click',()=>{
    fetchtopScore();
});
function startGame() {
  console.log('startGame called');
  isGameOver = false;
  score = 0;
  lives = 3;
  gameObjects.length = 0;
  playerName=document.getElementById('playerName').value;
  startScreen.style.display = 'none';
  endScreen.style.display = 'none';
  canvas.style.display = 'block';
  console.log('gamecnvas displayed');
  clearInterval(gameInterval);
  gameInterval = setInterval(gameObject, spawnRate);
  requestAnimationFrame(gameProcess);
  console.log('gameProcess started');
}
function showStartScreen() {
  endScreen.style.display = 'none';
  startScreen.style.display = 'block';
  canvas.style.display = 'none';

}
if (startButton) {
  startButton.addEventListener('click', startGame);
  console.log('startButton event listener added');
}

if (restartButton) {
  restartButton.addEventListener('click', showStartScreen);
}

startScreen.style.display = 'block';
console.log('game.js loaded');
canvas.style.display = 'none';


module.exports = { GameObject, endGame,mousemovement, gameProcess, startGame,gameObject,fetchtopScore,gameObjects };
