uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

uniform float millis;
uniform bool reset;
uniform float baseline;
uniform float millisBeforeReset;


attribute vec3 aPosition;
// texcoords only come from p5 to vertex shader
// so pass texcoords on to the fragment shader in a varying variable
attribute vec2 aTexCoord;
varying vec2 vTexCoord;

void main() {
  // transferring texcoords for the frag shader
  vTexCoord = aTexCoord;

  // copy position with a fourth coordinate for projection (1.0 is normal)
  vec4 positionVec4 = vec4(aPosition, 1.0);
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
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
 
}