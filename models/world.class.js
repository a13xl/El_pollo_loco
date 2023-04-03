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
    throwCooldown = new Date().getTime();

    collect_sound = new Audio('audio/collect.mp3');
    background_sound = new Audio('audio/cumbia-mexican-banda.mp3');
    defaultBackgroundSound = true;
    endboss_sound = new Audio('audio/boss.mp3')

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.backgroundSound();
    }

    setWorld() {
        this.character.world = this;
    }

    // ==================== ACTION FUNCTIONS ====================
    backgroundSound() {
        setInterval(() => {
            if(this.defaultBackgroundSound && !mute && gameStarted && !gameOver) {
                this.background_sound.play();
                this.background_sound.volume = 0.05;
            } else {
                this.background_sound.pause();
            }
        }, 500);
    }

    run() {
        setInterval(() => {
            this.checkThrowObjects();
            this.checkCollisions();
            this.checkBossSpawn();
            this.characterIdle();
        }, 40);

        setInterval(() => {
            this.checkCollisionCharacter();
        }, 100);

        setInterval(() => {
            this.clearAllIntervals();
        }, 1000);
    }

    checkCollisions() {
        this.checkCollisionsEnemy();
        this.checkCollisionsThrowable();
        this.checkCollisionsCollectible();
    }

    checkThrowObjects() {
        let cooldown = this.checkThrowCooldown();
        if(this.keyboard.D && this.character.collectedBottle > 0 && !gameOver && !cooldown) {
            let bottle;
            if(this.character.otherDirection) {
                bottle = new ThrowableObject(this.character.x + 0, this.character.y + 120);
            } else {
                bottle = new ThrowableObject(this.character.x + 110, this.character.y + 120);
            }
            this.throwableObject.push(bottle); // push bottle to Array, for calculating
            this.character.collectedBottle--; // collected Bottle (in Character) - 1
            this.character.lastAction = new Date().getTime(); // set Character lastAction to now
            this.throwCooldown = new Date().getTime();
        }
    }

    checkCollisionsEnemy() {
        this.level.enemies.forEach((enemy, index) => {
            if(this.character.isColliding(enemy)) {
                let constructor = enemy['constructor']['name'] == 'Endboss';
                if(this.character.speedY < 0 && this.character.isAboveGround() && !constructor) { // jump on enemy
                    this.level.enemies[index].hit(10);
                    this.character.jumping();
                }
            }
        });
    }

    checkCollisionCharacter() {
        this.level.enemies.forEach((enemy, index) => {
            if(this.character.isColliding(enemy)) {
                if(!this.level.enemies[index].isDead()) {
                    this.character.hit(5);
                    this.statusBar.setPercentage(this.character.hp);
                }
            }
        });
    }

    checkCollisionsThrowable() {
        this.throwableObject.forEach((bottle, i) => {
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
                this.collect_sound.pause();
                if(item['constructor']['name'] == 'Coin') {
                    this.character.collectedCoin++;
                    this.checkHpThroughCoins();
                } else if(item['constructor']['name'] == 'Bottle') { 
                    this.character.collectedBottle++;
                }
                this.collectableSound();
                this.level.collectible.splice(index, 1);
            }
        });
    }

    checkHpThroughCoins() {
        if(this.character.collectedCoin >= 10) {
            this.character.hp += 20;
            if(!mute) {
                this.character.heal_sound.play();
            }
            this.character.collectedCoin -= 10;
            this.statusBar.setPercentage(this.character.hp);
        }
    }

    checkBossSpawn() { // Spawn Boss
        if(this.character.x >= 3400 && !this.firstContact) {
            this.firstContact = true;
            this.level.enemies.push(new Endboss(4000));
            this.defaultBackgroundSound = false;
            this.playEnbossSound();
        }
    }

    checkThrowCooldown() {
        let timeNow = new Date().getTime();
        let timeDiff = timeNow - this.throwCooldown;
        return timeDiff < 1000; // 1 second
    }

    playEnbossSound() {
        setInterval(() => {
            if(!mute && !gameOver) {
                this.endboss_sound.play();
                this.endboss_sound.volume = 0.2;
            } else {
                this.endboss_sound.pause();
            }
        }, 300);
    }

    characterIdle() {
        if(this.character.idle || gameOver) {
            this.enemyPause();
        } else {
            this.level.enemies.forEach(enemy => {
                enemy.speed = enemy.speedOrg;
            });
        }
    }

    enemyPause() {
        this.level.enemies.forEach(enemy => {
            enemy.speed = 0;
        });
    }

    collectableSound() {
        if(!mute) {
            this.collect_sound.play();
        }
    }

    /* Alternative (quick and dirty), um alle Intervalle zu beenden. */
    clearAllIntervals() {
        if(gameOver) {
            for (let i = 1; i < 9999; i++) window.clearInterval(i);
            this.endboss_sound.pause();
        }
    }

    // ==================== DRAW FUNCTIONS ====================
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.drawBackground();

        this.addObjectsToMap(this.level.collectible);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObject);

        this.ctx.translate(-this.camera_x, 0);
        // ----- Space for fixed objects -----
            this.drawFixedObjects();
        // ----- Space for fixed objects -----
        this.ctx.translate(this.camera_x, 0);

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
