const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let snake = [{ x: 10, y: 10 }];
let dx = 0;
let dy = 0;
let food = getRandomFood();
let score = 0;
let highScore = 0;
let gamePaused = false;
let gameEnded = false;

document.addEventListener('keydown', changeDirection);
function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  if (gameEnded) {
    return;
  }

  if (event.keyCode === LEFT_KEY && dx !== 10) {
    dx = -10;
    dy = 0;
  } else if (event.keyCode === UP_KEY && dy !== 10) {
    dx = 0;
    dy = -10;
  } else if (event.keyCode === RIGHT_KEY && dx !== -10) {
    dx = 10;
    dy = 0;
  } else if (event.keyCode === DOWN_KEY && dy !== -10) {
    dx = 0;
    dy = 10;
  }
}

function getRandomFood() {
  const foodX = Math.floor(Math.random() * (canvas.width / 10)) * 10;
  const foodY = Math.floor(Math.random() * (canvas.height / 10)) * 10;

  return { x: foodX, y: foodY };
}

function drawSnakePart(snakePart) {
  ctx.fillStyle = '#45B39D';
  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  ctx.strokeStyle = '#2C3E50';
  ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawFood() {
  ctx.fillStyle = '#E74C3C';
  ctx.fillRect(food.x, food.y, 10, 10);
  ctx.strokeStyle = '#2C3E50';
  ctx.strokeRect(food.x, food.y, 10, 10);
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 10;
    food = getRandomFood();
  } else {
    snake.pop();
  }
}

function drawScore() {
  ctx.font = '20px Arial';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('Score: ' + score, 10, 30);
}

function drawHighScore() {
  if (score > highScore) {
    highScore = score;
  }

  ctx.font = '20px Arial';
  ctx.fillStyle = '#2C3E50';
  ctx.fillText('High Score: ' + highScore, canvas);
}

function getHighScore() {
  return highScore;
}

function drawGameOver() {
  ctx.fillStyle = '#2C3E50';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = '30px Arial';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('Game Over', canvas.width / 2 - 80, canvas.height / 2 - 15);
  ctx.font = '20px Arial';
  ctx.fillText(
    'Score: ' + score,
    canvas.width / 2 - 30,
    canvas.height / 2 + 15
  );
  ctx.fillText(
    'Press space to play again',
    canvas.width / 2 - 110,
    canvas.height / 2 + 45
  );
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  dx = 0;
  dy = 0;
  food = getRandomFood();
  score = 0;
  gamePaused = false;
  gameEnded = false;
}

function gameLoop() {
  if (gamePaused) {
    return;
  }

  if (gameEnded) {
    drawGameOver();
    return;
  }
  clearCanvas();
  drawFood();
  moveSnake();
  checkCollision();
  snake.forEach(drawSnakePart);
  drawScore();
  drawHighScore();
}

function checkCollision() {
  const head = snake[0];

  if (
    head.x < 0 ||
    head.x > canvas.width - 10 ||
    head.y < 0 ||
    head.y > canvas.height - 10
  ) {
    endGame();
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      endGame();
    }
  }
}

function endGame() {
  gameEnded = true;
  if (score > highScore) {
    highScore = score;
  }
}

function clearCanvas() {
  ctx.fillStyle = '#f943f9#';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function pauseGame() {
  if (!gameEnded) {
    gamePaused = !gamePaused;
  }
}

document.addEventListener('keydown', function (event) {
  const SPACE_KEY = 32;

  if (event.keyCode === SPACE_KEY) {
    if (gameEnded) {
      resetGame();
    } else {
      pauseGame();
    }
  }
});
setInterval(gameLoop, 140);
