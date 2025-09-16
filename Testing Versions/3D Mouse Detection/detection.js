let boardRow = 16;
let boardCol = 16;
let cellWidth = 20;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  detectionSpace = createGraphics(windowWidth, windowHeight, WEBGL);
  
  cam = createCamera();
  cam.camera(0,0,140);
  detectionSpace.setCamera(cam);
  
  detectionSpace.beginGeometry();
  detectionSpace.box(50,50);
  detectionBox = detectionSpace.endGeometry();
  
  beginGeometry();
  box(50,50);
  viewableBox = endGeometry();
  
  
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

function draw() {
  detectionSpace.background(255);
  
  detectionSpace.texture(detectionPlate);
  detectionSpace.strokeWeight(0);
  detectionSpace.model(detectionBox);
  
  model(viewableBox);
  let colorValue = detectionSpace.get(mouseX, mouseY)[2];
  console.log('Row: ' + (1+Math.floor(colorValue/boardRow)).toString() + ' Col: ' + (1+colorValue%boardRow).toString());
  
  
}

