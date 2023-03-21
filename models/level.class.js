class Level {
    enemies;
    clouds;
    backgroundObjects;
    collectible;
    level_end_x = 3680;

    constructor(enemies, clouds, backgroundObjects, collectible) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectible = collectible;
    }
}