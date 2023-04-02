// Importing Scenes and Declaring variables

import MenuScene from './Scenes/MenuScene.js';
import GameScene from './Scenes/GameScene.js';
import CreditScene from './Scenes/CreditScene.js';
import OverScene from './Scenes/OverScene.js';

let menuScene = new MenuScene();
let gameScene = new GameScene();
let creditScene = new CreditScene();
let overScene = new OverScene();

// Setting Game Configuration

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 350 },
            debug: false
        }
    }
};

let game = new Phaser.Game(config);

// Loading the Scenes

game.scene.add("MenuScene", menuScene);
game.scene.add("GameScene", gameScene);
game.scene.add("CreditScene", creditScene);
game.scene.add("OverScene", overScene);

// Booting Start Scene

game.scene.start("MenuScene");