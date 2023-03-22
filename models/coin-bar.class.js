class CoinBar extends DrawableObject {
    x = -5;
    y = 20;
    width = 120;
    height = 120;

    IMAGE = 'img/8_coin/coin_1.png';

    constructor() {
        super().loadImage(this.IMAGE);
    }
}