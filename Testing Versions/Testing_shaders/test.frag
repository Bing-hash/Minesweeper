precision highp float;
uniform float millis;
uniform bool reset;
uniform float baseline;
uniform float millisBeforeReset;


void main(){

  float temp = 1.;
  if(reset){
    float temp2 = (millisBeforeReset - baseline)/10000.;
    if(temp2 > 1.) {
      temp = 0.;
    }else{
      temp = temp - (millisBeforeReset - baseline)/10000.;
    } 
    if(temp < 1.){
      temp = temp + (millis-millisBeforeReset)/1000.;
    }
  }else{
    if(temp > 0.){
      temp = temp - (millis-baseline)/10000.;
    }
  }
  
  
  
  gl_FragColor = vec4(1.,temp,temp,1.);
}