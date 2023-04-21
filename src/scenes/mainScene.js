export default class GameScene extends Phaser.Scene{
    constructor(config){
        super();
        this.config = config;
        this.snake = null;
        this.direction = {
            x: -1,
            y: 0
        };
        this.speed = 100;
    }



    preload () {
        
        this.load.image('sky', 'assets/cartoonTiledGrass2.jpg');
        this.load.image('snake', 'assets/bird.png');

        this.input.keyboard.on("keydown-W", () => this.move(0, 1), this);
        this.input.keyboard.on("keydown-A", () => this.move(1, 0), this);
        this.input.keyboard.on("keydown-D", () => this.move(-1, 0), this);
        this.input.keyboard.on("keydown-S", () => this.move(0, -1), this);
    }

    create () {
        this.add.image(this.config.width / 2 , this.config.height /2, 'sky');

        this.snake = this.add.sprite(100, this.config.height / 2, "snake"); 
        this.physics.add.existing(this.snake);
        this.move(-1,0);
    }

    update(){
        
    }

    gameOver(){
        alert("You lose");
    }

    move(x, y){
        this.direction.x = x;
        this.direction.y = y;
        this.snake.body.velocity.x = -x * this.speed;
        this.snake.body.velocity.y = -y * this.speed;
        console.log("hi");
    }
}