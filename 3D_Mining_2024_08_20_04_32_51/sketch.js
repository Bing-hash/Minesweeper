

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  testMine = new StartMine(100, 16, 8, 10, 275, 7, 1, true, true, 10);
  console.log(testMine.mineModel)
}

function draw() {
  background(0);
  orbitControl();
  
  // ambientLight(135, 135, 135);
  
  testMine.display();
}


function zoom() {
  background(220);
}

