export default class MenuScene extends Phaser.Scene{

    constructor() {
        super("MenuScene");
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
        this.add.image(400, 460, 'ground').setScale(1,1.7);

        //Adding Text and Text Buttons
        this.add.text(400, 150,"STAR CATCHER", {font: "80px"}).setOrigin(0.5);

        let playText = this.add.text(400,300,"Play",{font: "20px"}).setOrigin(0.5);
        playText.setInteractive({ useHandCursor: true });
        playText.on('pointerdown', () => this.playButton());

        let credText = this.add.text(400,380,"Credits",{font: "20px"}).setOrigin(0.5);
        credText.setInteractive({ useHandCursor: true });
        credText.on('pointerdown', () => this.credButton());

        let quitText = this.add.text(400,460,"Quit",{font: "20px"}).setOrigin(0.5);
        quitText.setInteractive({ useHandCursor: true });
        quitText.on('pointerdown', () => {if (confirm("Exit the Game?")) {window.close()}});


    }

    playButton() {
        this.scene.start("GameScene");
    }

    credButton() {
        this.scene.start("CreditScene")
    }

}