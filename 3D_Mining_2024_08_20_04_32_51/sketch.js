// Global Variables

// Variable keeping track of the current game state.
let gameState = 0; 

// The rotation speed of the 3D mine is determined by 
let timer = 0;

let mineScale = 1;


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

}

// The draw() function is run at the beginning of every frame. It is used to draw objects
// to the canvas, update variabes, run game logic, and more.
function draw() {
  incTimer();
  background(0);


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
  
  if(gameState == 2) {
      cam.slerp(cam, gameCam, 0.1);
      mineScale = 2;
    
  }
  
  if(gameState == 3) {
    
  }
  
  orbitControl();
  
  push();
  rotateY(timer);
  testMine.display(mineScale);
  pop();
  
  if (gameState == 2) {
    if(cam.eyeZ <= 137) {
      rect(30, 20, 55, 55);
    }
  }
  // translate(0, 0, cam.eyeZ-90);
  // rotate(PI);
  // beginGeometry();
  // plane(10,10);
  // let planeOne = endGeometry();
  // model(planeOne);
  
  
  
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
  
function mouseClicked() {
  if(gameState == 1 && mouseOverStartingMine()) {
    gameState ++;
  }
}