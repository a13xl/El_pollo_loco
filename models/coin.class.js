class Coin extends MoveableObject {
  width = 150;
  height = 150;

  IMAGES = [
    'img/8_coin/coin_1.png',
    'img/8_coin/coin_2.png'
  ];

  offset = {top: 100, bottom: 100, left: 100, right: 100};


  constructor() {
    super().loadImage('img/8_coin/coin_2.png');
    this.loadImages(this.IMAGES);
    this.y = 310 - Math.random() * 250;
    this.x = 300 + Math.random()*3100;

    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES);
  }, 1000);
  }
}