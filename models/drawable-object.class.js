class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    currentImageOnceNr = 0;
    
    x = 120;
    y = 280;
    height = 150;
    width = 100;

    /**
     * load one Image
     * @param {*} path 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draw on Canvas
     * @param {*} ctx 
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * draw frames over objects, to make collision right or control things
     * @param {*} ctx 
     */
    drawFrame(ctx) {
        if(this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Endboss || this instanceof Coin || this instanceof ThrowableObject || this instanceof Bottle) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            //ctx.rect(this.x, this.y, this.width, this.height);
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top -this.offset.bottom);
            ctx.stroke();
        }
    }

    /**
     * load Images in Array
     * @param {Array} arr - ['img/img1.png', 'img/img2.png', ...]
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * draw Text on Canvas
     * @param {*} ctx 
     * @param {string} string 
     * @param {coordinate} x 
     * @param {coordinate} y 
     */
    drawText(ctx, string, x, y) {
        ctx.font = "40px zabars", "40px Arial", "40px sans-serif";
        ctx.fillStyle = "black";
        ctx.fillText(string, x, y);
    }
}