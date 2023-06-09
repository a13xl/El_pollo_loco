class Endboss extends MoveableObject {
    y = 45;
    height = 400;
    width = 300;
    hp = 100;

    offset = {top: 70, bottom: 15, left: 60, right: 50};

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor(x) {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.x = x;
        this.speedOrg = 40;
        this.speed = this.speedOrg;

        this.animate();
    }

    /**
     * animate image
     */
    animate() {
        let i = 0;
        setInterval(() => {
            if(this.isDead()) {
                this.playAnimationOnce(this.IMAGES_DEAD);
                gameOver = true;
                finishGame(true); // won = true
            }
        }, 180);

        setInterval(() => {
            if(this.isHurt() && !this.isDead()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if(!this.isDead() && this.speed > 0 && !this.isHurt()) {
                i = this.attack(i);
            } 
        }, 200);
    }

    /**
     * animate Alert -> Attack -> Moving in sequence
     * @param {*} i 
     * @returns number for animation
     */
    attack(i) {
        switch (true) {
            case i < 7:
                this.playAnimation(this.IMAGES_ALERT);
                i++;
                break;
            case i < 14:
                this.playAnimation(this.IMAGES_ATTACK);
                i++;
                break;
            case i > 30:
                i = 0;
                break;
            default:
                this.moving();
                break;
        }
        return i;
    }

    /**
     * move right or left, depending on the direction case
     */
    moving() {
        this.playAnimation(this.IMAGES_WALKING);
        if(this.x > world.character.x) {
            this.otherDirection = false;
            this.moveLeft();
        } else  {
            this.otherDirection = true;
            this.moveRight();
        }
        i++;
    }
}