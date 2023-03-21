class CollidableObject extends MoveableObject {
    /**
     * @type {boolean} - a flag to mark this instance as collidable
     */
    collidable = true;
    
    /**
     * @type {number} - how much dmg can this instance cause to other DestroyableObjects
     */
    damage = 0;

    /**
     * @type {object} - numerical offsets for this instance's coordinates and dimensions,
     * used for collision check
     */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
}