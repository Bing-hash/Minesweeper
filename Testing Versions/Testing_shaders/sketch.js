let testShader;
let strokeShader;

function preload(){
  
  
  testShader = loadShader('test.vert', 'test.frag');
  

}

function setup() {
  let button = createButton('Reset');
  button.mousePressed(reset);
  
  createCanvas(600, 600, WEBGL);
  strokeShader = baseStrokeShader().modify({
    uniforms: {
      'float millis': () => millis(),
      'bool reset': () => null,
      'float baseline': () => null,
      'float millisBeforeReset': () => null
      
    },
    declarations: 'vec3 myPosition;',
    'vec3 getLocalPosition': `(vec3 positionVec4) {
      myPosition = positionVec4;

      if(reset){
      float temp = 0.;
      float temp2;
      float temp3 = (millisBeforeReset - baseline)/10000.;
      if(temp3 > 0.5) {
        temp2 = 0.5;
      }else{
        temp2 = (millisBeforeReset - baseline)/10000.;
      } 

      float currXOffset = temp2 * sin(millis/1000. + positionVec4.y * 8.)/15.;
      float currYOffset = temp2 * sin(millis/1000. + positionVec4.z * 8.)/15.;
      float currZOffset = temp2 * sin(millis/1000. + positionVec4.x * 8.)/15.;

      if(currXOffset>0.) positionVec4.x += 1./pow((millis-millisBeforeReset)/100.+sqrt(1./currXOffset),2.);
      else positionVec4.x += -1./pow((millis-millisBeforeReset)/100.+sqrt(1./(currXOffset*-1.)),2.);

      if(currYOffset>0.) positionVec4.y += 1./pow((millis-millisBeforeReset)/100.+sqrt(1./currYOffset),2.);
      else positionVec4.y += -1./pow((millis-millisBeforeReset)/100.+sqrt(1./(currYOffset*-1.)),2.);

      if(currZOffset>0.) positionVec4.z += 1./pow((millis-millisBeforeReset)/100.+sqrt(1./currZOffset),2.);
      else positionVec4.z += -1./pow((millis-millisBeforeReset)/100.+sqrt(1./(currZOffset*-1.)),2.);


    }else{
      if ((millis-baseline)/10000. <= 0.5) {
        positionVec4.x += (millis-baseline)/10000. * sin(millis/1000. + positionVec4.y * 8.)/15.;
        positionVec4.y += (millis-baseline)/10000. * sin(millis/1000. + positionVec4.z * 8.)/15.;     
        positionVec4.z += (millis-baseline)/10000. * sin(millis/1000. + positionVec4.x * 8.)/15.;

      }else {
        positionVec4.x += 0.5 * sin(millis/1000. + positionVec4.y * 8.)/15.; 
        positionVec4.y += 0.5 * sin(millis/1000. + positionVec4.z * 8.)/15.;
        positionVec4.z += 0.5 * sin(millis/1000. + positionVec4.x * 8.)/15.;
      }
    }

      return positionVec4;
    }`
  });
  
  
  
}

function draw() {
  
  background('black');

  
  push();
  shader(strokeShader);
  // shader(testShader);
  
  
  
  testShader.setUniform('millis', millis());
  strokeShader.setUniform('time', millis());
  
  sphere(50, 10, 10);
  pop();
  // plane(20,20);
  // line(10,10,20,20,10,20);
  orbitControl();
  // background(220);
  
  // box(100,100);
  // orbitControl();
}

const reset = async () => {
  testShader.setUniform('millisBeforeReset', millis());
  strokeShader.setUniform('millisBeforeReset', millis());
  testShader.setUniform('reset', true);
  strokeShader.setUniform('reset', true);
  await sleep(1000);
  testShader.setUniform('baseline', millis());
  strokeShader.setUniform('baseline', millis());
  testShader.setUniform('reset', false);
  strokeShader.setUniform('reset', false);
}

function sleep(ms) {
  console.log("starting sleep");
  return new Promise(resolve => setTimeout(resolve, ms));
}