class Character extends MoveableObject {
    y = 130;
    height = 300;
    width = 150;
    speed = 10;
    hp = 100;
    collectedCoin = 0;
    collectedBottle = 0;
    lastAction = new Date().getTime() - 3000;
    idle = false;

    offset = {top: 113, bottom: 15, left: 20, right: 20};

    walking_sound = new Audio('audio/running.mp3');
    heal_sound = new Audio('audio/heal.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');
    jump_sound = new Audio('audio/jump.mp3');
    snoring_sound = new Audio('audio/snoring.mp3');

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_IDLE_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);

        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moving();
            if(this.y > 130) {
                this.y = 130;
            }
        }, 1000 / 60);

        setInterval(() => {
            this.animateImg();
        }, 50);

        setInterval(() => {
            this.animateImgSlow();
        }, 200);
    }

    moving() {
        this.walking_sound.pause();

        if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x){
            this.moveToRight();
        }

        if(this.world.keyboard.LEFT && this.x > 0){
            this.moveToLeft();
        }

        if(this.world.keyboard.SPACE && !this.isAboveGround() || this.world.keyboard.UP && !this.isAboveGround()) {
            this.jumping();
        }
        this.world.camera_x = -this.x + 100;
    }

    moveToLeft() {
        this.moveLeft();
        this.otherDirection = true;
        if(!mute) {
            this.walking_sound.play();
        }
        this.lastAction = new Date().getTime();
    }

    moveToRight() {
        this.moveRight();
        this.otherDirection = false;
        if(!mute) {
            this.walking_sound.play();
        }
        this.lastAction = new Date().getTime();
    }

    jumping() {
        this.jump();
        if(!mute) {
            this.jump_sound.play(); 
        }
        this.lastAction = new Date().getTime();
    }

    animateImg() {
        if(this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            this.lastAction = new Date().getTime();
        } else if(this.isAboveGround()) {
            // Jumping animation
            this.playAnimation(this.IMAGES_JUMPING);
        } else if(this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.lastAction = new Date().getTime();
            if(!mute) {
                this.hurt_sound.play();
            }
        } else if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT){
            // Walking animation
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    animateImgSlow() {
        if(this.isIdleLong(this.lastAction)) {
            this.playAnimation(this.IMAGES_IDLE_LONG);
            this.idle = true;
        } else if(this.isIdle(this.lastAction)) {
            this.playAnimation(this.IMAGES_IDLE);
            this.idle = true;
            this.snoringSound();
        } else {
            this.idle = false;
            this.snoring_sound.pause();
        }
    }

    snoringSound() {
        setInterval(() => {
            if(this.idle && !mute) {
                this.snoring_sound.play();
            } else {
                this.snoring_sound.pause();
            }
        }, 500);
    }
}