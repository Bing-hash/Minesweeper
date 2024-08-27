let boardRow = 16;
let boardCol = 16;
let mineTotal = 40;
let cellWidth = 50;
let gameState = 3;
let cellWinTotal = boardRow * boardCol - mineTotal;
let currCellCount;

function setup() {
  for (let element of document.getElementsByClassName("p5Canvas")) {
    element.addEventListener("contextmenu", (e) => e.preventDefault());
  }
  createCanvas(boardRow * cellWidth + 50, boardCol * cellWidth + 50);
}

function draw() {
  background(220);

  if (gameState == 3) {
    currCellCount = 0;
    gameboard = createGameboard();
    fillGameboard(gameboard);
    gameState = 4;
  } else if (gameState == 4) {
    currCellCount = checkOpenCellCount(gameboard);
    for (let i = 0; i < boardRow; i++) {
      for (let j = 0; j < boardCol; j++) {
        gameboard[i][j].display();
      }
    }
    if (currCellCount == cellWinTotal) {
      gameState = 6;
    }
  } else if (gameState == 5) {
    for (let i = 0; i < boardRow; i++) {
      for (let j = 0; j < boardCol; j++) {
        gameboard[i][j].display();
      }
    }
  } else if (gameState == 6) {
    for (let i = 0; i < boardRow; i++) {
      for (let j = 0; j < boardCol; j++) {
        gameboard[i][j].display();
      }
    }
    stroke("green");
    strokeWeight(10);
    text("You Win", 100, 100);
  }
}

function keyPressed() {
  if (keyCode == 32) {
    gameState = 3;
  }

  return false;
}

function mousePressed(event) {
  if (gameState == 4) {
    if (event.button == 2) {
      for (let i = 0; i < boardRow; i++) {
        for (let j = 0; j < boardCol; j++) {
          if (gameboard[i][j].mouseOver(mouseX, mouseY)) {
            gameboard[i][j].flag();
          }
        }
      }
    } else {
      for (let i = 0; i < boardRow; i++) {
        for (let j = 0; j < boardCol; j++) {
          if (gameboard[i][j].mouseOver(mouseX, mouseY)) {
            mineReveal(gameboard[i][j]);
          }
        }
      }
    }
  }
}

function mineReveal(cell) {
  if (cell.revealed || cell.flagged) {
    return;
  }
  cell.reveal();
  if (cell.mine) {
    gameState = 5;
    return;
  }

  if (cell.neighborCount == 0) {
    for (let k = -1; k < 2; k++) {
      for (let l = -1; l < 2; l++) {
        let indexX = cell.x + k;
        let indexY = cell.y + l;
        if (
          indexX > -1 &&
          indexX < gameboard.length &&
          indexY > -1 &&
          indexY < gameboard[0].length
        ) {
          if (
            gameboard[indexX][indexY].x == cell.x &&
            gameboard[indexX][indexY].y == cell.y
          ) {
            continue;
          } else {
            mineReveal(gameboard[indexX][indexY]);
          }
        }
      }
    }
  }
}

function getRandomInt() {
  return Math.floor(Math.random() * 16);
}

function createGameboard() {
  var board = new Array(boardRow);
  for (let i = 0; i < boardCol; i++) {
    board[i] = new Array(boardCol);
  }

  for (let i = 0; i < boardRow; i++) {
    for (let j = 0; j < boardCol; j++) {
      let tempCell = new Cell(i, j, cellWidth);
      board[i][j] = tempCell;
    }
  }

  return board;
}

function fillGameboard(board) {
  let k = 0;
  while (1) {
    let randRow = getRandomInt();
    let randCol = getRandomInt();
    if (board[randRow][randCol].mine == true) {
      continue;
    } else {
      board[randRow][randCol].mine = true;
      k++;
    }
    if (k == mineTotal) {
      break;
    }
  }

  for (let i = 0; i < boardRow; i++) {
    for (let j = 0; j < boardCol; j++) {
      board[i][j].neighborCount = countMines(board, board[i][j]);
    }
  }
}

function countMines(gameboard, cell) {
  let total = 0;

  if (cell.mine == true) {
    return 9;
  }

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let indexX = cell.x + i;
      let indexY = cell.y + j;
      if (
        indexX > -1 &&
        indexX < gameboard.length &&
        indexY > -1 &&
        indexY < gameboard[0].length
      ) {
        if (gameboard[indexX][indexY].mine) {
          total++;
        }
      }
    }
  }

  return total;
}

function checkOpenCellCount(board) {
  count = 0;
  for (let i = 0; i < boardRow; i++) {
    for (let j = 0; j < boardCol; j++) {
      if (board[i][j].revealed) {
        count++;
      }
    }
  }
  return count;
}
