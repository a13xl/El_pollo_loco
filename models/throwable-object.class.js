class ThrowableObject extends MoveableObject {
    height = 70;
    width = 60;
    speedY = 0;
    hp = 5;
    splashSoundPlayed = false;

    splash_sound = new Audio('audio/glass.mp3');

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
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    offset = {top: 10, bottom: 10, left: 5, right: 5}

    constructor(x, y) {
        super().loadImage(this.IMAGES_THROW[0]);
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_SPLASH);

        this.x = x;
        this.y = y;
        
        this.throw();
    }

    throw() {
        //debugger;
        this.speedY = 20;
        this.applyGravity();
        setInterval(() => {
            if(this.y < 340 && !this.isDead()) {
                if(world.character.otherDirection) {
                    this.otherDirection = true;
                    this.x -= 10;
                } else {
                    this.otherDirection = false;
                    this.x += 10;
                }
                this.playAnimation(this.IMAGES_THROW);
            }
            if(this.isDead()) { // || this.y >= 340
                this.splash();
            }
        }, 25);
    }

    splash() {
        this.speedY = 0;
        this.playAnimationOnce(this.IMAGES_SPLASH);
        if(!this.splashSoundPlayed) {
            this.playSplashSound();
        }
        setTimeout(() => {
            this.height = 0;
            this.width = 0;
        }, 100);
    }

    playSplashSound() {
        this.splash_sound.play();
        this.splashSoundPlayed = true;
    }
}