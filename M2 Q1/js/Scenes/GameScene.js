export default class GameScene extends Phaser.Scene{

    constructor() {
        super("GameScene");
    }

    init () {

        this.player;
        this.cursors;
        this.stars;
        this.platforms;
        this.scoreText;
        this.score=0;
        this.i;
        this.color = ['0xff0000','0xffa500','0xffff00','0x008000','0x0000ff','0x4b0082','0x800080'];
    }

    preload () {

        this.load.image('bg', '../assets/images/bg.png');
        this.load.image('ground', '../assets/images/platform.png');
        this.load.image('star', '../assets/images/star.png');
        this.load.image('bomb', '../assets/images/bomb.png');
        this.load.spritesheet('dude', 
            '../assets/images/cube.png',
            { frameWidth: 33, frameHeight: 31 }
        );

    }

    create() {

        //Background and Platforms

        this.add.image(400, 300, 'bg');

        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        this.platforms.create(50, 160, 'ground');
        this.platforms.create(750, 160, 'ground');
        this.platforms.create(400, 290, 'ground');
        this.platforms.create(50, 420, 'ground');
        this.platforms.create(750, 420, 'ground');

        //Player
    
        this.player = this.physics.add.sprite(100, 450, 'dude');

        this.player.setBounce(0);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platforms);
    
        this.anims.create({
        key: 'left',
        frames: [ { key: 'dude', frame: 0 } ],
        frameRate: 1,
        });
    
        this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 1 } ],
        frameRate: 20
        });
    
        this.anims.create({
        key: 'right',
        frames: [ { key: 'dude', frame: 2 } ],
        frameRate: 1,
        });

        //Stars
    
        this.stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
        });
        this.physics.add.collider(this.stars, this.platforms);
    
        this.physics.add.overlap(this.player, this.stars, collectStar, null, this);


        //Game Mechanics

        function collectStar (player, star) {
        star.disableBody(true, true);
        this.score += 1;
        this.scoreText.setText('Stars Collected: ' + this.score);

        //Spawn new Star
        if (this.stars.countActive(true) < 12) {
            this.stars.create(Phaser.Math.RND.between(0, 800), Phaser.Math.RND.between(0, 500), 'star');
        }

        //Change Color
        this.player.setTint(this.color[0]);
        this.color.shift();
        if(this.color.length===0) {
            this.color.push('0xff0000','0xffa500','0xffff00','0x008000','0x0000ff','0x4b0082','0x800080');
        }
        
        //Character Scale and Bomb Physics
        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        if(this.score % 5 == 0){
            this.player.scale += 0.1;

            this.bomb = this.bombs.create(x, 16, 'bomb');
            this.bomb.setBounce(1);
            this.bomb.setCollideWorldBounds(true);
            this.bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }
        }    

        //Bombs

        this.bombs = this.physics.add.group();

        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.player, this.bombs, hitBomb, null, this);

        function hitBomb (player, bomb) {
            this.physics.pause();
            this.player.setTint('0x000000');
            this.player.anims.play('turn');
            this.gameOver = true;
            if(this.gameOver = true) {
                this.scene.start("OverScene");
            }
        }

        //Scoreboard Setting

        this.scoreText = this.add.text(16, 16, 'Stars Collected: 0', { fontSize: '24px', fill: '#ffffff' });  

        //Keybinds

        this.cursors = this.input.keyboard.createCursorKeys();

    }

    update() {

        //Setting up Keybinds

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-230);
            this.player.anims.play('left', true);
        }
    
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(230);
            this.player.anims.play('right', true);
        }
    
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }
        
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    

    }
}  

