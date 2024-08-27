let boardRow = 16;
let boardCol = 16;
let mineTotal = 40;

function setup() {
  createCanvas(boardRow*50, boardCol*50);
  
  let gameboard = createGameboard();
  console.log(gameboard[0]);
}

function draw() {
  // orbitControl();
  background(220);
  noFill();
  
  square(0, 0, 50)
}

function getRandomInt() {
  return Math.floor(Math.random() * 16);
}

function createGameboard() {
  const board = new Array(boardCol).fill(new Array(boardRow).fill(null));
  
  // for(let i = 0; i < boardCol; i++) {
  //   for(let j = 0; j < baoardRow; j++) {
  //     board
  //   }
  // }
  
  // let i = 0;
  // while(1) {
  //   let randRow = getRandomInt();
  //   let randCol = getRandomInt();
  //   if(board[randRow][randCol] == 1) {
  //     continue;
  //   }else {
  //     board[randRow][randCol] = 1;
  //     i++;
  //   }
  //   if(i == mineTotal) {
  //     break;
  //   }
  // }
  
  return board;
}

function countMines(gameboard, cell){
  let total=0;
  
  if(cell.mine==true) {
    return 9;
  }
  
  for(let i = -1; i < 2; i++) {
    for(let j = -1; j < 2; j++) {
      let indexX = cell.x + i;
      let indexY = cell.y + j;
      if(indexX > -1 && indexX < gameboard.length && indexY > -1 && indexY < gameboard[0].length) {
        if(gameboard[indexX][indexY].mine) {
          total ++;
        }
      }
    }
  }
  
  return total;
}