var gameElement = document.getElementById('cnt');
var grid = [];
var game = [];
var infoElement, nMinesToFind;
function PlaceMines(rn, cn, nMine) {
  var nRows = grid.length;
  var nCols = grid[0].length;
  game = [];
  for (var i = 0; i < nRows; i++) {
    game.push([]);
    for (var j = 0; j < nCols; j++) {
      game[i].push(0);
    }
  }
  for (var i = 0; i < nMine; i++) {
    var r = Math.floor(Math.random() * nRows);
    var c = Math.floor(Math.random() * nCols);
    if (Math.abs(r - rn) <= 1 && Math.abs(c - cn) <= 1) {
      i--;
    } else {
      if (game[r][c] == 1) i--;
      else game[r][c] = 1;
    }
  }
}

function InitGame(nRows, nCols, nMine) {
  gameElement.innerHTML = '';
  gameElement.style.fontSize = 70 / nRows + 'vh';
  grid = [];
  var nMax = Math.round(nRows * nCols * 0.5);
  if (nMine > nMax) nMine = nMax;
  game = nMine;
  for (var i = 0; i < nRows; i++) {
    grid.push([]);
    //game.push([]);
    for (var j = 0; j < nCols; j++) {
      var c = document.createElement('div');
      c.className = 'cell';
      c.onclick = CheckCell;
      c.oncontextmenu = toggleFlag;
      c.setAttribute('row', i);
      c.setAttribute('col', j);
      gameElement.appendChild(c);
      grid[i].push(c);
      //game[i].push(0);
    }
    var nl = document.createElement('br');
    gameElement.appendChild(nl);
  }
  infoElement = document.createElement('span');
  nMinesToFind = nMine;
  infoElement.textContent = 'Hala ' + nMinesToFind + ' mayın mevcut';
  gameElement.appendChild(infoElement);
}
Array.prototype.getRand = function () {
  return this[Math.floor(Math.random() * this.length)];
};
function CheckEmpty() {
  var toOpen = [];
  var nRows = game.length;
  var nCols = game[0].length;
  var win = true;
  for (var r = 0; r < nRows; r++) {
    for (var c = 0; c < nCols; c++) {
      if (game[r][c] == 0 && grid[r][c].className != 'empty') {
        win = false;
      }
      if (
        grid[r][c].className == 'empty' &&
        grid[r][c].textContent.length == 0
      ) {
        for (var i = -1; i <= 1; i++)
          for (var j = -1; j <= 1; j++) {
            if (
              r + i >= 0 &&
              r + i < nRows &&
              c + j >= 0 &&
              c + j < nCols &&
              (i != 0 || j != 0)
            ) {
              if (grid[r + i][c + j].className == 'cell') {
                toOpen.push(grid[r + i][c + j]);
              }
            }
          }
      }
    }
  }
  if (toOpen.length > 0) {
    CheckCell(toOpen.getRand());
    setTimeout(CheckEmpty, 20);
  }
  if (win) {
    document.getElementById('dlg-bgk').style.display = '';
    document.getElementById('msg').textContent = 'Kazandınız!!  Yeni Oyun?';
  }
}

function CheckEmptyWithNumber(target) {
  var nRows = game.length;
  var nCols = game[0].length;
  var r = parseInt(target.getAttribute('row'));
  var c = parseInt(target.getAttribute('col'));
  var n = parseInt(target.textContent);
  if (n <= 0) return;
  var f = 0;
  for (var i = -1; i <= 1; i++)
    for (var j = -1; j <= 1; j++) {
      if (r + i >= 0 && r + i < nRows && c + j >= 0 && c + j < nCols) {
        if (
          grid[r + i][c + j].className == 'cell' &&
          grid[r + i][c + j].hasAttribute('flag')
        ) {
          f++;
        }
      }
    }
  if (f == n) {
    for (var i = -1; i <= 1; i++)
      for (var j = -1; j <= 1; j++) {
        if (r + i >= 0 && r + i < nRows && c + j >= 0 && c + j < nCols) {
          if (
            grid[r + i][c + j].className == 'cell' &&
            !grid[r + i][c + j].hasAttribute('flag')
          ) {
            CheckCell(grid[r + i][c + j]);
          }
        }
      }
  }
  CheckEmpty();
}

function CheckCell(e) {
  var doCheck = 'target' in e;
  var target = e.target || e;
  var r = parseInt(target.getAttribute('row'));
  var c = parseInt(target.getAttribute('col'));
  if (!Array.isArray(game)) {
    PlaceMines(r, c, game);
  }
  if (target.className != 'cell') {
    if (target.className == 'empty' && target.textContent.length != 0) {
      CheckEmptyWithNumber(target);
    }
    return;
  }

  if (target.hasAttribute('flag')) return;
  var nRows = game.length;
  var nCols = game[0].length;
  if (game[r][c] == 1) {
    document.getElementById('dlg-bgk').style.display = '';
    document.getElementById('msg').textContent = 'you die, new game?';
    for (var r = 0; r < nRows; r++)
      for (var c = 0; c < nCols; c++)
        if (game[r][c] == 1 && !grid[r][c].hasAttribute('flag'))
          grid[r][c].className = 'mine';
    return;
  } else {
    target.className = 'empty';
    var n = 0;
    for (var i = -1; i <= 1; i++)
      for (var j = -1; j <= 1; j++) {
        if (
          r + i >= 0 &&
          r + i < nRows &&
          c + j >= 0 &&
          c + j < nCols &&
          (i != 0 || j != 0)
        ) {
          if (game[r + i][c + j] == 1) n++;
        }
      }
    if (n != 0) target.textContent = n;
  }
  if (doCheck) {
    CheckEmpty();
    e.preventDefault();
  }
}

function toggleFlag(e) {
  if (e.target.hasAttribute('flag')) {
    e.target.removeAttribute('flag');
    nMinesToFind += 1;
  } else {
    e.target.setAttribute('flag', '');
    nMinesToFind -= 1;
  }
  infoElement.textContent = 'Hala ' + nMinesToFind + ' mayın mevcut';
  e.preventDefault();
}
document.getElementById('btnOK').onclick = function (e) {
  document.getElementById('dlg-bgk').style.display = 'none';
  InitGame(
    document.getElementById('txtHeight').value,
    document.getElementById('txtWidth').value,
    document.getElementById('txtMines').value
  );
};
