precision highp float;
uniform float millis;
uniform bool reset;
uniform float baseline;
uniform float millisBeforeReset;

uniform vec2 screenSize;
uniform float random;

varying vec2 vTexCoord;

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
    float rateOfChange = (millis-baseline)/100000.;
    if(temp > 0.){
      temp = temp - rateOfChange;
    }
  }
  
  
  vec2 position = gl_FragCoord.xy / screenSize;
  
  gl_FragColor = vec4(sin(position.x*millis/1000.)+1.7, 0., 1.,1.);
}