class Bottle extends MoveableObject {
  width = 100;
  height = 100;

  IMAGES_GROUND = [
    'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
  ];
  IMAGE_AIR = 'img/6_salsa_bottle/salsa_bottle.png';


  offset = {top: 14, bottom: 11, left: 35, right: 35};


  constructor() {
    super();

    this.x = 300 + Math.random()*3100;

    this.placeBottle();
  }

  /**
   * place Bottle random
   */
  placeBottle() {
    let rndNr = Math.floor(Math.random() * 2);
    if (rndNr <= 0) { // bottle on Ground
      let index = Math.floor(Math.random() * 2);
      this.y = 320;
      this.loadImage(this.IMAGES_GROUND[index]);
    } else { // bottle in Air
      this.y = 310 - Math.random() * 250;
      this.loadImage(this.IMAGE_AIR);
    }
  }
}