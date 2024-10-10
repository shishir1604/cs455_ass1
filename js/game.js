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
  if (global.isGameOver)
    { 
    return;
}
  const radius = 60;
  let random = Math.random();
  const x = (random * (canvas.width - (2 * radius))) + radius;
  const y = canvas.height;
  const type = Math.random() > 0.9 ? 'bomb' : 'fruit';
  global.gameObjects.push(new GameObject(x, y, radius, type));
}

canvas.addEventListener('mousemove', mousemovement);
function mousemovement(event) {
  if(global.isGameOver){
    return;
  }
  
  const { clientX, clientY } = event;

  global.gameObjects.forEach((obj, index) => {
    const distance = Math.sqrt((clientX - obj.x) ** 2 + (clientY - obj.y) ** 2);
    

    if (distance < obj.radius) {
      if (obj.type === 'fruit') {
        global.score += 1;
        //console.log('Fruit sliced, new score:', global.score);
      } else if (obj.type === 'bomb') {
        global.endGame();
        //console.log('Bomb sliced, game over');
      }
      global.gameObjects.splice(index, 1);
    }
  });
}

function gameProcess() {
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
    fetch('http://localhost:3000/addScore',{
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify({player:player,score:score}),
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

  function fetchTopScores() {
  fetch('http://localhost:3000/top-scores')
    .then(response => response.json())
    .then(scores => {
      const leaderboard = document.getElementById('leaderboard');
      leaderboard.innerHTML = '<h3>Top Scores</h3>';
      scores.forEach((score, index) => {
        leaderboard.innerHTML += `<p>${index + 1}. ${score.player}: ${score.score}</p>`;
      });
    })
    .catch(error => {
      console.error('Error fetching top scores:', error);
    });
}



document.getElementById('backButton').addEventListener('click',()=>{
document.getElementById('leaderBoardSection').style.display='none';
});
document.getElementById('leaderBoardButton').addEventListener('click',()=>{
    fetchtopScore();
});
function startGame() {
  isGameOver = false;
  score = 0;
  lives = 3;
  gameObjects.length = 0;
  playerName=document.getElementById('playerName').value;
  startScreen.style.display = 'none';
  endScreen.style.display = 'none';
  canvas.style.display = 'block';
  clearInterval(gameInterval);
  gameInterval = setInterval(gameObject, spawnRate);
  requestAnimationFrame(gameProcess);
}
function showStartScreen() {
  endScreen.style.display = 'none';
  startScreen.style.display = 'block';
  canvas.style.display = 'none';

}
if (startButton) {
  startButton.addEventListener('click', startGame);
}

if (restartButton) {
  restartButton.addEventListener('click', showStartScreen);
}

startScreen.style.display = 'block';
canvas.style.display = 'none';


module.exports = { GameObject, endGame,mousemovement, gameProcess, startGame,gameObject,fetchtopScore };
//table create
// connection strign working
//show chart for a players progress
//two integration tests- client to server and server to database
