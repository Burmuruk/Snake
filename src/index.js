import Phaser from "phaser";
import GameScene from "./scenes/mainScene";

const SHARED_CONFIG = {
  width: 800,
  height: 400,
}

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: "arcade",
    arcade: {
      // gravity: { y: 200 },
      debug: true
    }
  },
  scene: [new GameScene(SHARED_CONFIG)]
}

new Phaser.Game(config);


