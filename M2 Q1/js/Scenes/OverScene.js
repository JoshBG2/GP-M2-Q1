//import {score} from './Scenes/GameScene.js';


export default class OverScene extends Phaser.Scene{

    constructor() {
        super("OverScene");
    }
    
    preload() {
        
        this.load.image('bg', '../assets/images/bg.png');
        this.load.image('ground', '../assets/images/platform.png');
        
    }

    create() {

        //Setting up Background
        this.add.image(400, 300, 'bg');

        this.add.image(400, 300, 'ground').setScale(1,1.7);
        this.add.image(400, 380, 'ground').setScale(1,1.7);

        //Adding Text and Text Buttons
        this.add.text(400, 150,"GAME OVER", {font: "80px"}).setOrigin(0.5);

        let playText = this.add.text(400,300,"Play Again",{font: "20px"}).setOrigin(0.5);
        playText.setInteractive({ useHandCursor: true });
        playText.on('pointerdown', () => this.playButton());

        let menuText = this.add.text(400,380,"Back to Main Menu",{font: "20px"}).setOrigin(0.5);
        menuText.setInteractive({ useHandCursor: true });
        menuText.on('pointerdown', () => this.menuButton());

    }

    playButton() {
        this.scene.start("GameScene");
    }

    menuButton() {
        this.scene.start("MenuScene")
    }

}