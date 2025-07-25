// Global Variables

// Variable keeping track of the current game state.
let gameState = 0; 

// The rotation speed of the 3D mine is determined by 
let timer = 0;

let mineScale = 1;

let gameboardPainting;

let boardRow = 16;
let boardCol = 16;
let cellWidth = 20;
let mineTotal = 40;
let cellWinTotal = boardRow * boardCol - mineTotal;
let currCellCount;

let boxScale = 0.0;


// The setup() function is run once at the beginning of runtime. Objects used for this 
// program are innitialized here.
function setup() {  
  // Creates a canvas on the document using p5.js' createCanvas() function. The width and
  // height of the canvas are set to the width and height of the document respectively.
  // The canvas is set to WEBGL rendering mode, allowing the drawing of 3D sketches. 
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  // Creates the object associated with the 3D mine rendered in the background.
  testMine = new StartMine(100, 16, 8, 10, 275, 7, 1, true, true, 10);
  
  // Creates the main camera used in the 3D space.
  cam = createCamera();
  
  // Camera used at the beginning of the intro animation.
  cam1 = createCamera();
  cam1.camera(0,0,6000);
  
  // Camera used at the end of the intro animation, and is the main reference point for 
  // the main camera to latch onto during gameplay.
  cam2 = createCamera();
  cam2.camera(0,0,600);
  
  // Camera used to create the zooming feature before the game starts.
  cam3 = createCamera();
  cam3.camera(0,0,500);
  
  gameCam = createCamera();
  gameCam.camera(0,0,140);
  
  // Sets the camera for the world to the main camera.
  setCamera(cam);
  
  
  //Game setup
  for (let element of document.getElementsByClassName("p5Canvas")) {
    element.addEventListener("contextmenu", (e) => e.preventDefault());
  }
  // cellWidth = windowWidth/3/boardRow;
  
  
  // 3D detection setup.
  detectionSpace = createGraphics(windowWidth, windowHeight, WEBGL);
  
  detectionCam = detectionSpace.createCamera();
  detectionCam.camera(0,0,140);
  detectionSpace.setCamera(detectionCam);

  
  detectionSpace.beginGeometry();
  detectionSpace.box(50,50);
  detectionBox = detectionSpace.endGeometry();
  
  
  detectionPlate = createGraphics(boardRow * cellWidth, boardCol * cellWidth);
  detectionPlate.strokeWeight(0);
  
  let index = 0;
  for(let i = 0; i < boardRow; i++){
    for(let j = 0; j < boardCol; j++){
      detectionPlate.fill(0, 0, 0+index)
      detectionPlate.square(
          j * cellWidth,
          i * cellWidth,
          cellWidth
        );
      index ++;
    }
  }

}

// The draw() function is run at the beginning of every frame. It is used to draw objects
// to the canvas, update variabes, run game logic, and more.
function draw() {
  incTimer();
  background(0);
  
  beginGeometry();
  box(1,1);
  test = endGeometry();


  // console.log(cam.eyeX, cam.eyeY, cam.eyeZ);
  
  
  // The start animation will run at the beginning of runtime. The main camera's position is
  // updated every frame to a point between cam1 and cam2. This is achieved through the 
  // p5.Camera.slerp() function. Once the main camera gets close enough to cam2, the 
  // startAnimation switch is turned off, and the camera becomes stationary.
  // More information about the p5.Camera.slerp() can be found in the p5.js documentation.
  if(gameState == 0) {
    let amt = 0.5 * sin(frameCount * 0.01) + 0.5;
    if (amt >= 0.999999) {
      gameState ++;
    }
    cam.slerp(cam1, cam2, amt);
  }
  
  // Once the start animation is finished, the player can hover the mouse over the 3D mine,
  // and a short zoom animation will play. When the player is hovering over the mine, the
  // main camera approaches cam3. When the player is not over the mine, and the main camera 
  // is not near cam2, the main camera approaches cam2.
  if(gameState == 1) {
    
    if(mouseOverStartingMine()){
      cam.slerp(cam, cam3, 0.3);
      
    }else{
      if(cam.eyeX < 599){
        artificialTimer = 0;
        cam.slerp(cam, cam2, 0.3);
      }
    }
  }
  
  else if(gameState == 2) {
      cam.slerp(cam, gameCam, 0.1);
      mineScale = 2;
      
    if(cam.eyeZ <= 141){
      cam.slerp(cam, gameCam, 1.0);
      gameState = 3;
    }
  }
  
  //Game state IFs
  else if (gameState == 3) {
    gameboardPainting = createGraphics(boardRow * cellWidth, boardCol * cellWidth);

    
    currCellCount = 0;
    gameboard = createGameboard();
    fillGameboard(gameboard);
    
  
    gameState = 4;
  } else if (gameState == 4) {
      
    drawGameboard();
    
    let colorValue = detectionSpace.get(mouseX, mouseY);
    // console.log(colorValue);
//   console.log('Row: ' + (1+Math.floor(colorValue/boardRow)).toString() + ' Col: ' + (1+colorValue%boardRow).toString());
    
    drawDetectionSpace();
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
    drawGameboard();
  } else if (gameState == 6) {
    drawGameboard();
    
    for (let i = 0; i < boardRow; i++) {
      for (let j = 0; j < boardCol; j++) {
        gameboard[i][j].display();
      }
    }
    gameboardPainting.stroke("green");
    gameboardPainting.strokeWeight(10);
    gameboardPainting.text("You Win", 100, 100);
    drawGameboard();
  }
  
  
  // orbitControl();
  
  drawMine();
  
  
  // console.log(gameState + ' ' + cellWidth + ' ' + cam.eyeX + ' ' + cam.eyeY + ' ' + cam.eyeZ);
  
}

function drawGameboard(){
  
  
  translate(0,0,30);
  push();
  if(boxScale <50){
    boxScale ++;
  }
  scale(boxScale);
  
  texture(gameboardPainting);
  model(test);
  pop();
  translate(0,0,-30);
}

function drawDetectionSpace(){
  // Draw detection space in buffer
  
  detectionSpace.background(255);
  
  detectionSpace.texture(detectionPlate);
  detectionSpace.strokeWeight(0);
  detectionSpace.push();
  detectionSpace.translate(0,0,30);
  detectionSpace.model(detectionBox);
  detectionSpace.pop();
}

function drawMine(){
  push();
  rotateY(timer);
  testMine.display(mineScale);
  pop();  
}

function sleep(ms) {
  console.log("starting sleep");
  return new Promise(resolve => setTimeout(resolve, ms));
}

function incTimer(){
  if(frameCount <156){
    timer = 6*sin(frameCount*0.01)-5.8433
  }else {
    // console.log(timer);
    timer = frameCount * 0.001
    // console.log(timer);
  }
}

function mouseOverStartingMine() {
  return mouseX > windowWidth/3 && mouseX < windowWidth - (windowWidth/3) && mouseY > windowHeight/3 && mouseY < windowHeight - (windowHeight/3)
}
  
  


// Minesweeper game functions:
function keyPressed() {
  if (keyCode == 32) {
    gameState = 3;
  }

  return false;
}

function mousePressed(event) {
  if(gameState == 1 && mouseOverStartingMine()) {
    gameState ++;
  }else if (gameState == 4) {
    let colorValue = detectionSpace.get(mouseX, mouseY);
    let mouseBoxY = Math.floor(colorValue[2]/boardRow);
    let mouseBoxX = colorValue[2]%boardCol;
    if(colorValue[0] == 0){
      console.log("Ding");
      if (event.button == 2) {
        console.log("Here!")
        for (let i = 0; i < boardRow; i++) {
          for (let j = 0; j < boardCol; j++) {
            if (gameboard[i][j].mouseOver(mouseBoxX, mouseBoxY)) {
              gameboard[i][j].flag();
            }
          }
        }
      }else {
        for (let i = 0; i < boardRow; i++) {
          for (let j = 0; j < boardCol; j++) {
            console.log(mouseBoxX+' '+mouseBoxY);
            if (gameboard[i][j].mouseOver(mouseBoxX, mouseBoxY)) {
              mineReveal(gameboard[i][j]);
            }
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
      let tempCell = new Cell(i, j, cellWidth, gameboardPainting);
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
