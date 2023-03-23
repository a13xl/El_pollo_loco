class BottleBar extends DrawableObject {
    x = 24;
    y = 90;
    width = 60;
    height = 60;

    IMAGE = 'img/6_salsa_bottle/salsa_bottle.png';

    constructor() {
        super().loadImage(this.IMAGE);
    }
}