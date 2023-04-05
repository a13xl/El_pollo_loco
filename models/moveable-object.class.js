class MoveableObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    lastHit = 0;

    offset = {top: 0, bottom: 0, left: 0, right: 0};

    /**
     * activate gravity for object. Object fly high and fall down.
     */
    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * check if Object over ground like jumping or throwing
     * @returns boolean
     */
    isAboveGround() {
        if(this instanceof ThrowableObject) { // Throwable Object should always fall
            return true;
        } else {
            return this.y < 130;
        }
    }

    /**
     * check if object colliding and return true or false
     * @param {*} mo 
     * @returns boolean
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * reduce hp with dmg value
     * @param {*} dmg 
     */
    hit(dmg) {
        this.hp -= dmg;
        if(this.hp < 0) {
            this.hp = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * check if Object hurt. Cooldown 1 second.
     * @returns boolean
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 1;
    }

    /**
     * check if object is dead
     * @returns boolean
     */
    isDead() {
        return this.hp == 0;
    }

    /**
     * set Picture infinity in canvas
     * @param {*} images 
     */
    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 0 mod 6 => 0, Rest 0 BIS let i = 6 mod 6 => 1, Rest 0
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * set Picture in canvas
     * @param {*} images 
     */
    playAnimationOnce(images) {
        let path = images[this.currentImageOnceNr];
        this.img = this.imageCache[path];
        if (this.currentImageOnceNr < images.length -1) {
            this.currentImageOnceNr++;
        }
    }

    /**
     * move to right. x-coordinate + speed
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * move to left. x-coordinate - speed
     */
    moveLeft() {
            this.x -= this.speed;
    }

    /**
     * set Y speed for jumping
     */
    jump() {
        this.speedY = 25;
    }

    /**
     * check if Object idle. Time Now - Last Action Object
     * @param {*} lastAction 
     * @returns boolean
     */
    isIdle(lastAction) {
        let timeNow = new Date().getTime();
        let timeDiff = timeNow - lastAction;
        return timeDiff > 100;
    }

    /**
     * check if Object idle long. Time Now - Last Action Object
     * @param {*} lastAction 
     * @returns boolean
     */
    isIdleLong(lastAction) {
        let timeNow = new Date().getTime();
        let timeDiff = timeNow - lastAction;
        return timeDiff > 3000; // 3 seconds
    }
}