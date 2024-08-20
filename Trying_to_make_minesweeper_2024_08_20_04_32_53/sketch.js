function setup() {
  createCanvas(400, 400);
  let gameboard = [[0,0,0,1],
                   [1,0,1,0],
                   [0,0,0,0],
                   [1,0,0,0]];
  let testcell = new Cell(gameboard, 2, 1);
  console.log(testcell.checkMines())
}

function draw() {
  background(220);
  noFill();
  square(150, 150, 100)
}