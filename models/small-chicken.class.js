class SmallChicken extends MoveableObject{
    y = 375;
    height = 40;
    width = 50;
    hp = 10;

    hit_sound = new Audio('audio/chicken02.mp3');
    hitSoundPlayed = false;

    offset = {top: 0, bottom: 0, left: 5, right: 5};
    
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';


    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = x + Math.random() * 200;
        this.speedOrg = 0.15 + Math.random() * 0.5;
        this.speed = this.speedOrg;

        this.animate();
        this.deadChicken();
     }

    /**
     * move and animte chicken
     */
    animate() {
        setInterval(() => {
            if(!this.isDead()) {
                this.moveLeft();
            }
        },1000 / 60); // 60 picture per second

        setInterval(() => {
            if(!this.isDead() && this.speed > 0) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

    /**
     * animate and play sound if chicken is dead
     */
    deadChicken() {
        setInterval(() => {
            if(this.isDead()) {
                this.offset = {top: 100, bottom: 100, left: 100, right: 100};
                this.speed = 0;
                this.loadImage(this.IMAGES_DEAD);
                if(!this.hitSoundPlayed) {
                    if(!mute) {
                        this.hit_sound.play();
                    }
                    this.hitSoundPlayed = true;
                }
            }
        }, 50);
    }
}