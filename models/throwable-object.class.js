class ThrowableObject extends MoveableObject {
    height = 70;
    width = 60;
    IMAGES_THROW =[
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/7_bottle_splash.png'
    ];

    offset = {top: 30, bottom: 30, left: 30, right: 30}

    constructor(x, y) {
        super().loadImage(this.IMAGES[2]);
        this.loadImage(this.IMAGES);

        this.x = x;
        this.y = y;
        //this.height = 70;
        //this.width = 60;
        this.throw();
    }

    throw() {
        this.speedY = 20;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
            this.playAnimation(this.IMAGES);
        }, 25);
    }
}