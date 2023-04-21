export default class Food extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, dimentions){
        super(scene, x, y, texture);
        this.scene = scene;
        this.dimentions = dimentions;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.immovable = true;
        
        this.setRandomPosition();
    }

    SetRandomPosition(){
        this.body.position.x = Phaser.Math.RND.between(0, this.dimentions.x - 22);
        this.body.position.y = Phaser.Math.RND.between(0, this.dimentions.y - 22);
    }
}