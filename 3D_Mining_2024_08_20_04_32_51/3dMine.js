class StartMine{
  constructor(sphereRadius, sphereDetailX, sphereDetailY, cylRadius, cylHeight, cylDetailX, cylDetailY, cylBottomCap, cylTopCap, spinSpeed) {
    this.sphereRadius = sphereRadius;
    this.sphereDetailX = sphereDetailX;
    this.sphereDetailY = sphereDetailY;
    
    this.cylRadius = cylRadius;
    this.cylHeight = cylHeight;
    this.cylDetailX = cylDetailX;
    this.cylDetailY = cylDetailY;
    this.cylBottomCap = cylBottomCap;
    this.cylTopCap = cylTopCap;
    
    this.spinSpeed = spinSpeed;
    
    
    // Mine model
    beginGeometry();
    sphere(this.sphereRadius, this.sphereDetailX, this.sphereDetailY);
    this.mineModel = endGeometry();


    // Hertz horns model
    beginGeometry();
    cylinder(this.cylRadius, this.cylHeight, this.cylDetailX, this.cylDetailY, this.cylBottomCap, this.cylTopCap);
    this.hornModel = endGeometry();
      
  }
  
  display() {
    // Drawing mine
    model(this.mineModel);
    // Drawing Hertz horns
    model(this.hornModel);

    for(let i=0; i<8; i++) {
      rotateZ(PI/4);
      model(this.hornModel);
      rotateZ(-PI/4);
      rotateY(PI/4);
    }
    
  }
  
  mouseOver() {
    
  }
}