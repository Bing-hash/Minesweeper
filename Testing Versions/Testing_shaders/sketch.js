let shapeShader;
let strokeShader;

function preload(){
  
  
  shapeShader = loadShader('angry.vert', 'angry.frag');
  

}

function setup() {
  let button = createButton('Reset');
  button.mousePressed(reset);
  
  createCanvas(600, 600, WEBGL);
  shader(shapeShader);
  strokeShader = baseStrokeShader().modify({
    uniforms: {
      'float millis': () => millis(),
      'bool reset': () => null,
      'float baseline': () => null,
      'float millisBeforeReset': () => null
      
    },
    declarations: 'vec3 myPosition;',
    'vec3 getLocalPosition': `(vec3 positionVec4) {
      // Vertex shader specifically for vector elements. Used in this project for the latice that surrounds
      // the 3D shapes. Mimics angry.vert.

      myPosition = positionVec4;

      // Resets the coordinate back to it's original position using a reciprocal function.
      if(reset){
        float fixedTimeSinceReset;
        float timeSinceReset = (millisBeforeReset - baseline)/10000.;
        if(timeSinceReset > 0.5) {
          fixedTimeSinceReset = 0.5;
        }else{
          fixedTimeSinceReset = (millisBeforeReset - baseline)/10000.;
        } 

        float currXOffset = fixedTimeSinceReset * sin(millis/1000. + positionVec4.y * 8.)/15.;
        float currYOffset = fixedTimeSinceReset * sin(millis/1000. + positionVec4.z * 8.)/15.;
        float currZOffset = fixedTimeSinceReset * sin(millis/1000. + positionVec4.x * 8.)/15.;

        if(currXOffset>0.) positionVec4.x += 1./pow((millis-millisBeforeReset)/100.+sqrt(1./currXOffset),2.);
        else positionVec4.x += -1./pow((millis-millisBeforeReset)/100.+sqrt(1./(currXOffset*-1.)),2.);

        if(currYOffset>0.) positionVec4.y += 1./pow((millis-millisBeforeReset)/100.+sqrt(1./currYOffset),2.);
        else positionVec4.y += -1./pow((millis-millisBeforeReset)/100.+sqrt(1./(currYOffset*-1.)),2.);

        if(currZOffset>0.) positionVec4.z += 1./pow((millis-millisBeforeReset)/100.+sqrt(1./currZOffset),2.);
        else positionVec4.z += -1./pow((millis-millisBeforeReset)/100.+sqrt(1./(currZOffset*-1.)),2.);


    }else{
      float rateOfChange = (millis-baseline)/100000.;

      if (rateOfChange <= 0.5) {
        positionVec4.x += rateOfChange * sin(millis/1000. + positionVec4.y * 8.)/15.;
        positionVec4.y += rateOfChange * sin(millis/1000. + positionVec4.z * 8.)/15.;     
        positionVec4.z += rateOfChange * sin(millis/1000. + positionVec4.x * 8.)/15.;

      }else {
        positionVec4.x += 0.5 * sin(millis/1000. + positionVec4.y * 8.)/15.; 
        positionVec4.y += 0.5 * sin(millis/1000. + positionVec4.z * 8.)/15.;
        positionVec4.z += 0.5 * sin(millis/1000. + positionVec4.x * 8.)/15.;
      }
    }

      return positionVec4;
    }`
  });
  
 
  shapeShader.setUniform("screenSize", [width, height]);
  
}

function draw() {
  
  background('black');
  shaderAnimation();
  
  

  orbitControl();
  // let colorValue = get(mouseX, mouseY);
  // console.log(colorValue);

}

function shaderAnimation(){
  push();
  shader(strokeShader);
  // Set uniforms to the millis timer. Used for animations in shader
  
  shapeShader.setUniform('millis', millis());
  strokeShader.setUniform('millis', millis());
  sphere(50, 10, 10);
  pop();
}

const reset = async () => {
  // Giving the shader program a timestamp of when the reset it called.
  shapeShader.setUniform('millisBeforeReset', millis());
  strokeShader.setUniform('millisBeforeReset', millis());
  // Indicating to the shader program that the reset animation needs to be played. 
  shapeShader.setUniform('reset', true);
  strokeShader.setUniform('reset', true);
  await sleep(2000);
  // Giving the shader program a new basline time to start the animation from.
  shapeShader.setUniform('baseline', millis());
  strokeShader.setUniform('baseline', millis());
  // Indicating to the shader program that the reset animation is now over.
  shapeShader.setUniform('reset', false);
  strokeShader.setUniform('reset', false);
}

function sleep(ms) {
  console.log("starting sleep");
  return new Promise(resolve => setTimeout(resolve, ms));
}