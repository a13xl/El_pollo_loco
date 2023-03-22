class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;

    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementByID('image')
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if(this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Endboss || this instanceof Coin || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            //ctx.rect(this.x, this.y, this.width, this.height);
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top -this.offset.bottom);
            ctx.stroke();
        }
    }

    /**
     * 
     * @param {Array} arr - ['img/img1.png', 'img/img2.png', ...]
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    loadTxt() {
        ctx.font = "40px zabars", "40px Arial", "40px sans-serif";
        ctx.fillStyle = "black";
        ctx.bord
        ctx.fillText(this.character.collectedCoin, 110, 95);
        ctx.fillText(this.character.collectedBottle, 340, 55);
    }
}