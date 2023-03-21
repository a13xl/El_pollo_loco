class SmallChicken extends MoveableObject{
    y = 380;
    height = 40;
    width = 50;
    hp = 5;

    offset = {top: 0, bottom: 0, left: 0, right: 0};
    
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
        this.speed = 0.15 + Math.random() * 0.5;

        this.animate();
     }

     animate() {
        setInterval(() => {
            this.moveLeft();
        },1000 / 60); // 60 picture per second

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);

        setInterval(() => {
            if(this.isDead()) {
                this.speed = 0;
                this.loadImage(this.IMAGES_DEAD);
            }
        }, 50);
    }
}