import Score from "../features/score";
import Food from "../features/food";

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
        this.layers = {
            background: null,
            game: null,
            ui: null,
        }
    }

    preload () {
        //Initilize layers
        this.layers.background = this.add.layer();
        this.layers.game = this.add.layer();
        this.layers.ui = this.add.layer();
        
        //Instance gameobjects
        this.load.image('sky', 'assets/cartoonTiledGrass2.jpg');
        this.load.image('snake', 'assets/bird.png');
        this.load.image('food', 'assets/star.png');

        this.input.keyboard.on("keydown-W", () => this.move(0, 1), this);
        this.input.keyboard.on("keydown-A", () => this.move(1, 0), this);
        this.input.keyboard.on("keydown-D", () => this.move(-1, 0), this);
        this.input.keyboard.on("keydown-S", () => this.move(0, -1), this);
    }

    create () {
        var sky = this.add.image(this.config.width / 2 , this.config.height /2, 'sky');
        this.layers.background.add(sky);

        this.score = new Score(this, 16, 16, this.layers.ui);

        this.snake = this.add.sprite(100, this.config.height / 2, "snake"); 
        this.layers.game.add(this.snake);
        this.physics.add.existing(this.snake);

        var dimentions = {
            x: this.config.width,
            y: this.config.height
        };

        this.food = new Food(this, 0, 0, "food", dimentions);
        var collider = this.physics.add.collider(this.food, this.snake, this.eat, null, this);
        collider.overlapOnly = true;
        
        this.move(-1,0);
    }

    update(){
        this.checkOffBounds();
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

    checkOffBounds() {
        if (this.snake.getBounds().top >= 0 && this.snake.getBounds().bottom <= this.config.height &&
            (this.snake.getBounds().left >= 0 && this.snake.getBounds().right <= this.config.width)) {
            return;
        }

        this.GameOver();
    }

    GameOver(){
        alert("You loser.");
        this.score.checkHighScore();
        this.scene.restart();
    }

    eat(){
        this.food.setRandomPosition();
        this.score.addScore(1);
        this.speed += 2;
    }
}