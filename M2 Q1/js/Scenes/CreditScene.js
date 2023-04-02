export default class CreditScene extends Phaser.Scene{

    constructor() {
        super("CreditScene");
    }

    preload() {
        
        this.load.image('bg', '../assets/images/bg.png');
        this.load.image('ground', '../assets/images/platform.png');
        
    }

    create() {

        //Setting up Background
        this.add.image(400, 300, 'bg');

        this.add.image(400, 220, 'ground').setScale(1,1.7);
        this.add.image(400, 300, 'ground').setScale(1,1.7);
        this.add.image(400, 380, 'ground').setScale(1,1.7);

        this.add.image(110, 550, 'ground').setScale(0.4,1.7);

        //Adding Text and Text Buttons
        this.add.text(400, 100,"CREDITS", {font: "60px"}).setOrigin(0.5);
        this.add.text(400, 220,"Joshua Emmanuel O. Cifra", {font: "20px"}).setOrigin(0.5);
        this.add.text(400, 300,"A223", {font: "20px"}).setOrigin(0.5);
        this.add.text(400, 380,"BSEMC", {font: "20px"}).setOrigin(0.5);

        let backText = this.add.text(110,550,"Back",{font: "20px"}).setOrigin(0.5);
        backText.setInteractive({ useHandCursor: true });
        backText.on('pointerdown', () => this.backButton());
    }

    backButton() {

        this.scene.start("MenuScene")

    }
}    