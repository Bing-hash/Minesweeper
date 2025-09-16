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
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
 
}