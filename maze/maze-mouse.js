const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Create game board
const gameBoard = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 1, , 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// Set square size
const squareSize = canvas.width / gameBoard.length;

// Create mouse object
const mouse = {
  x: 1,
  y: 1,
};

// Create cheese object
const cheese = {
  x: 8,
  y: 8,
};

// Draw game board
function drawGameBoard() {
  for (let i = 0; i < gameBoard.length; i++) {
    for (let j = 0; j < gameBoard[i].length; j++) {
      if (gameBoard[i][j] === 1) {
        context.fillStyle = 'black';
      } else {
        context.fillStyle = 'white';
      }
      context.fillRect(j * squareSize, i * squareSize, squareSize, squareSize);
    }
  }
}

// Draw mouse
function drawMouse() {
  const mouseImg = new Image();
  mouseImg.src = '/maze/rat.png';
  mouseImg.onload = function () {
    context.drawImage(
      mouseImg,
      mouse.x * squareSize,
      mouse.y * squareSize,
      squareSize,
      squareSize
    );
  };
}

// Draw cheese
function drawCheese() {
  const cheeseImg = new Image();
  cheeseImg.src = '/maze/food.png';
  cheeseImg.onload = function () {
    context.drawImage(
      cheeseImg,
      cheese.x * squareSize,
      cheese.y * squareSize,
      squareSize,
      squareSize
    );
  };
}

// Move mouse
function moveMouse(event) {
  switch (event.keyCode) {
    case 37: // Left arrow
      if (gameBoard[mouse.y][mouse.x - 1] !== 1) {
        mouse.x--;
      }
      break;
    case 38: // Up arrow
      if (gameBoard[mouse.y - 1][mouse.x] !== 1) {
        mouse.y--;
      }
      break;
    case 39: // Right arrow
      if (gameBoard[mouse.y][mouse.x + 1] !== 1) {
        mouse.x++;
      }
      break;
    case 40: // Down arrow
      if (gameBoard[mouse.y + 1][mouse.x] !== 1) {
        mouse.y++;
      }
      break;
  }
  if (mouse.x === cheese.x && mouse.y === cheese.y) {
    alert('Tebrikler, level-2 başlıyor.');
    return (location.href = '../maze-2/index.html');
  }

  // Redraw game board and objects
  drawGameBoard();
  drawMouse();
  drawCheese();
}

function restart() {
  button = document.getElementById('restart');
  location.reload();
}
// Initialize game
function init() {
  drawGameBoard();
  drawMouse();
  drawCheese();
  document.addEventListener('keydown', moveMouse);
}

// Start game
init();
