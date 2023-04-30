let currentPiece, droppedPiece, error;
let turns = 0;
const TOTAL_PIECES = 9;
window.addEventListener('load', function () {
  const boardContainer = document.getElementById('Board');
  const piecesContainer = document.getElementById('Pieces');
  function createPuzzlePieces(container, source) {
    for (let i = 0; i < TOTAL_PIECES; i++) {
      let img = document.createElement('img');
      img.src = source.replace('[number]', i);
      img.classList.add('Puzzle__Img');
      container.append(img);
      img.addEventListener('dragstart', dragStart);
      img.addEventListener('dragover', dragOver);
      img.addEventListener('dragenter', dragEnter);
      img.addEventListener('dragleave', dragLeave);
      img.addEventListener('drop', dragDrop);
      img.addEventListener('dragend', dragEnd);
    }
  }
  createPuzzlePieces(boardContainer, '/puzzle/level-2/images/blank.jpg');
  createPuzzlePieces(piecesContainer, '/puzzle/level-2/images/[number].jpg');
  let pieces = Array.from(piecesContainer.children);
  pieces.sort(() => Math.random() - 0.5);
  pieces.forEach((piece) => piecesContainer.appendChild(piece));

  function dragStart(e) {
    currentPiece = this;
    error = false;
    if (currentPiece.src.includes('blank')) {
      error = true;
    }
    if (turns === 15) {
      alert('You Lose');
      turns = 0;
      document.getElementById('Turns').innerText = turns;
      location.reload();
    }
  }

  function dragEnter(e) {
    e.preventDefault();
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragLeave(e) {
    e.preventDefault();
  }

  function dragDrop(e) {
    e.preventDefault();
    droppedPiece = this;
    if (error != false || currentPiece == droppedPiece) {
      return (error = true);
    }

    swapImages(currentPiece, droppedPiece);

    turns += 1;
    document.getElementById('Turns').innerText = turns;

    playSuccessSound();
  }

  const swapImages = (img1, img2) => {
    let currImg = img1.src;
    let otherImg = img2.src;
    img1.src = otherImg;
    img2.src = currImg;
  };

  function dragEnd() {
    if (error) {
      playErrorSound();
    }
  }

  function playSuccessSound() {
    const soundSuccess = new Audio('/puzzle/sounds/success.wav');
    soundSuccess.play();
  }
  function playErrorSound() {
    const soundError = new Audio('/puzzle/sounds/error.wav');
    soundError.play();
  }
});
