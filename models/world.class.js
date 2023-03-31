class World {
    character = new Character();
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();

    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    throwableObject = [];
    firstContact = false;

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

    // ==================== ACTION FUNCTIONS ====================
    run() {
        setInterval(() => {
            this.checkThrowObjects();
            this.checkCollisions();
            this.checkBossSpawn();
            this.characterIdle();
        }, 40);
    }

    checkCollisions() {
        this.checkCollisionsEnemy();
        this.checkCollisionsThrowable();
        this.checkCollisionsCollectible();
    }

    checkThrowObjects() {
        if(this.keyboard.D && this.character.collectedBottle > 0) {
            let bottle;
            if(this.character.otherDirection) {
                bottle = new ThrowableObject(this.character.x + 0, this.character.y + 120);
            } else {
                bottle = new ThrowableObject(this.character.x + 110, this.character.y + 120);
            }
            this.throwableObject.push(bottle); // push bottle to Array, for calculating
            this.character.collectedBottle--; // collected Bottle (in Character) - 1
        }
        this.character.lastAction = new Date().getTime(); // set Character lastAction to now
    }

    checkCollisionsEnemy() {
        this.level.enemies.forEach((enemy, index) => {
            if(this.character.isColliding(enemy)) {
                let constructor = enemy['constructor']['name'] == 'Endboss';
                if(this.character.speedY < 0 && this.character.isAboveGround() && !constructor) { // jump on enemy
                    this.level.enemies[index].hit(10);
                } else if(!this.level.enemies[index].isDead()) {
                    this.character.hit(5);
                    this.statusBar.setPercentage(this.character.hp);
                }
            }
        });
    }

    checkCollisionsThrowable() {
        this.throwableObject.forEach((bottle) => {
            if(!bottle.isDead()) {
                if(bottle.y >= 340) { // hit ground
                    bottle.hit(100);
                } else {
                    this.level.enemies.forEach((enemy, index) => {
                        if(bottle.isColliding(enemy)) { // hit enemy
                            enemy.hit(20);
                            bottle.hit(100); 
                        }
                    });
                }
            }
        });
    }

    checkCollisionsCollectible() {
        this.level.collectible.forEach((item, index) => {
            if(this.character.isColliding(item)) {
                if(item['constructor']['name'] == 'Coin') {
                    this.character.collectedCoin++;
                    this.checkHpThroughCoins();
                } else if(item['constructor']['name'] == 'Bottle') { 
                    this.character.collectedBottle++;
                }
                this.level.collectible.splice(index, 1);
            }
        });
    }

    checkHpThroughCoins() {
        if(this.character.collectedCoin >= 10) {
            this.character.hp += 20;
            this.character.collectedCoin -= 10;
            this.statusBar.setPercentage(this.character.hp);
        }
    }

    checkBossSpawn() { // Spawn Boss
        if(this.character.x >= 3400 && !this.firstContact) {
            this.firstContact = true;
            this.level.enemies.push(new Endboss(4000));
        }
    }

    characterIdle() {
        if(this.character.idle) {
            this.level.enemies.forEach(enemy => {
                enemy.speed = 0;
            });
        } else {
            this.level.enemies.forEach(enemy => {
                enemy.speed = enemy.speedOrg;
            });
        }
    }

    // ==================== DRAW FUNCTIONS ====================
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.drawBackground();

        this.ctx.translate(-this.camera_x, 0);
        // ----- Space for fixed objects -----
            this.drawFixedObjects();
        // ----- Space for fixed objects -----
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.collectible);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObject);

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

    drawFixedObjects() {
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.drawCollectedItemNum(this.ctx);
    }

    drawBackground() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }

    drawCollectedItemNum(ctx) {
        this.character.drawText(ctx, this.character.collectedCoin, 80, 95);
        this.character.drawText(ctx, this.character.collectedBottle, 80, 137);
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
        // mo.drawFrame(this.ctx); // draw Frame around character and chicken
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