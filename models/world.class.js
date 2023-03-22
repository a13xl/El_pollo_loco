class World {
    character = new Character();
    statusBar = new StatusBar();
    coinBar = new CoinBar();

    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    throwableObject = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkThrowObjects();
            this.checkCollisions();
        }, 40);
    }

    checkThrowObjects() {
        if(this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 110, this.character.y + 120)
            this.throwableObject.push(bottle);
        }
    }

    checkCollisions() {
        this.checkCollisionsEnemy();
        this.checkCollisionsThrowable();
        this.checkCollisionsCollectible();
    }

    checkCollisionsEnemy() {
        this.level.enemies.forEach((enemy, index) => {
            if(this.character.isColliding(enemy)) {             // not working 100% (only 75%)
                if(this.character.speedY < 0 && this.character.isAboveGround()) { // jump on enemy
                    this.level.enemies[index].hit(10); // remove hit chicken:  this.level.enemies.splice(index, 1);
                } else if(!this.level.enemies[index].isDead()) {
                    this.character.hit(5);
                    this.statusBar.setPercentage(this.character.hp);
                }
            }
        });
    }

    checkCollisionsThrowable() {
        this.throwableObject.forEach((bottle, i) => {
            this.level.enemies.forEach((enemy, index) => {
                if(bottle.isColliding(enemy)) { // hit enemy
                    this.level.enemies[index].hit(20);
                    this.throwableObject[i].hit(20);
                }
            });
        });
    }

    checkCollisionsCollectible() {
        this.level.collectible.forEach((item, index) => {
            if(this.character.isColliding(item)) {
                if(item['constructor']['name'] == 'Coin') {
                    this.character.collectedCoin++;
                    this.drawCollectedItemNum(this.ctx);
                    console.log('collected Coins:', this.character.collectedCoin);
                } else if(item['constructor']['name'] == 'Bottle') { 
                    this.character.collectedBottle++;
                }

                this.level.collectible.splice(index, 1);
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        // ----- Space for fixed objects -----
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.collectible);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObject);
        
        this.drawCollectedItemNum(this.ctx);

        this.ctx.translate(-this.camera_x, 0);
        this.drawAgain();
    }

    drawAgain() {
        // Draw() wird immer wieder ausgeführt
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    drawCollectedItemNum(ctx) {
        ctx.font = "40px zabars", "40px Arial", "40px sans-serif";
        ctx.fillStyle = "black";
        ctx.bord
        ctx.fillText(this.character.collectedCoin, 110, 95);
        ctx.fillText(this.character.collectedBottle, 110, 130);
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx); // draw Frame around character and chicken

        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}