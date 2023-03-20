class Chicken extends MoveableObject{
    y = 360;
    height = 60;
    width = 70;
    hp = 5;
    
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        //this.loadImage(this.IMAGES_DEAD);

        this.x = 400 + Math.random() * 500;
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

        // NOT WORKING
        setInterval(() => {
            if(this.isDead()) {
                this.speed = 0;
                this.loadImage(this.IMAGES_DEAD);
                //console.log(this);
            }
        }, 50);
    }
}