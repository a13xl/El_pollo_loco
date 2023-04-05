class Cloud extends MoveableObject{
    y = 20;
    width = 500;
    height = 250;


    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = x + Math.random() * 500;
        this.animate();

    }

    /**
     * Animate Clouds
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 25);
    }

}