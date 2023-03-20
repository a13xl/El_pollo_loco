class Coin extends MoveableObject {
    width = 100;
    height = 100;
    offset = {top: 35, bottom: 35, left: 35, right: 35};
    IMAGES = [
      'img/8_coin/coin_1.png',
      'img/8_coin/coin_2.png'
    ];
    x = 400;
    y = 400;
  
  
    constructor() {
      super().loadImage('img/8_coin/coin_1.png');
      // this.y = 340 - Math.random()*300;
      // this.x = 400 + Math.random()*3100;

      this.playAnimation(this.IMAGES);
    }
  }