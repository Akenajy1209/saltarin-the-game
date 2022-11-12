import Phaser from 'phaser';

class Escena extends Phaser.Scene {

    // Se usará como palabra clave para usar la escena
    constructor() {
        super({ key: 'game-2' });
    }
    player = null;
    cursors = null;
    grass0 = null;
    grass1 = null;
    grass2 = null;
    grass3 = null;
    grass4 = null;
    speed0 = null;
    speed1 = null;
    spikes = null;
    spikes1 = null;
    spikes2 = null;
    posRandom=1;
    star=null;
    score=0;

    init(){
        this.score=0;
    }
    preload() {

        this.load.image('sky2', 'img/nightmare.png');
        this.load.image('ground', 'img/platform.png');
        this.load.image('grass', 'img/grass.png');
        this.load.image('spikes', 'img/spikes.png');
        this.load.image('spikes2', 'img/spikes2.png');
        this.load.image('spikes3', 'img/spikes3.png');
        this.load.image('spikes4', 'img/spikes4.png');
        this.load.image('star', 'img/star.png');
        this.load.spritesheet('dude',
            'img/dude.png',
            { frameWidth: 32, frameHeight: 48 });

        this.load.audio('corte','sounds/corte.wav')
        this.load.audio('gameOver','sounds/gameOver.wav')
        this.load.audio('jump','sounds/jump.wav')
        this.load.audio('coins','sounds/coins.wav')
    }

    create() {

        // agregando sonidos
        this.corte = this.sound.add("corte");
        this.gameOver = this.sound.add("gameOver");
        this.jump = this.sound.add("jump");
        this.coins = this.sound.add("coins");

        // creando el fondo
        this.add.image(600, 440, 'sky2').setScale(0.5);

        ///PLAYER
        this.player = this.physics.add.sprite(600, 250, 'dude');
        this.player.setCollideWorldBounds(true);

        // se crean los movimientos (que seran utilizados en update)
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10, // frames x segundo
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        // rebote contra las plataformas
        this.physics.add.collider(this.player, this.grass);
        this.cursors = this.input.keyboard.createCursorKeys();

        // agragamos el texto
        this.scoreText = this.add.text(16, 40, 'Score: 0', { fontSize: '32px', fill: '#000' });

        //SUELO BASE
        this.grass0 = this.physics.add.image(600, 330, 'grass').setScale(0.5).setImmovable(true).setTint(0xff0000);
        this.grass0.body.setAllowGravity(false);
        this.grass0.setData('glue', true);

        //SUELOS HORIZONTALES IZQUIERDA
        this.grass1 = this.physics.add.image(100, 150, 'grass').setScale(0.7).setImmovable(true).setTint(0xff0000);
        this.grass1.body.setAllowGravity(false);

        this.grass2 = this.physics.add.image(400, 270, 'grass').setScale(0.7).setImmovable(true).setTint(0xff0000);
        this.grass2.body.setAllowGravity(false);

        this.grass3 = this.physics.add.image(850, 370, 'grass').setScale(0.7).setImmovable(true).setTint(0xff0000);
        this.grass3.body.setAllowGravity(false);

        this.grass4 = this.physics.add.image(1100, 470, 'grass').setScale(0.7).setImmovable(true).setTint(0xff0000);
        this.grass4.body.setAllowGravity(false);

        //SUELOS HORIZONTALES DERECHA
        this.grass5 = this.physics.add.image(700,210, 'grass').setScale(0.7).setImmovable(true).setTint(0xff0000);
        this.grass5.body.setAllowGravity(false);

        this.grass6 = this.physics.add.image(500, 410, 'grass').setScale(0.7).setImmovable(true).setTint(0xff0000);
        this.grass6.body.setAllowGravity(false);

        //velocidades
        this.speed0 = Phaser.Math.GetSpeed(900, 10);
        this.speed1 = Phaser.Math.GetSpeed(900, 5);
        this.speed2 = Phaser.Math.GetSpeed(600, 4);

        //coliision con jugador
        this.physics.add.collider(this.player, this.grass0, this.movePlayer, null, this);
        this.physics.add.collider(this.player, this.grass1, this.movePlayerTwo, null, this);
        this.physics.add.collider(this.player, this.grass2, this.movePlayerTwo, null, this);
        this.physics.add.collider(this.player, this.grass3, this.movePlayerTwo, null, this);
        this.physics.add.collider(this.player, this.grass4, this.movePlayerTwo, null, this);
        this.physics.add.collider(this.player, this.grass5, this.movePlayerThree, null, this);
        this.physics.add.collider(this.player, this.grass6, this.movePlayerThree, null, this);

        //PINCHOS
        this.spikes = this.physics.add.staticGroup({
            key: ['spikes2', 'spikes'],
            frameQuantity: 19,
            gridAlign: {
                width: 19, 
                height: 2, 
                cellWidth: 60, 
                cellHeight: 561,
                x: 30,       
                y: 282       
            }
        });
        this.spikes1= this.physics.add.staticGroup({
            key: ['spikes3'],
            frameQuantity: 5,
            gridAlign: {
                width: 1, 
                height: 5, 
                cellWidth: 60, 
                cellHeight: 120,
                x: 30,       
                y: 60      
        }});
        this.spikes2= this.physics.add.staticGroup({
            key: ['spikes4'],
            frameQuantity: 5,
            gridAlign: {
                width: 1, 
                height: 5, 
                cellWidth: 60, 
                cellHeight: 120,
                x: 1190,       
                y: 60      
        }});
        //colision
        this.physics.add.collider(this.player, this.spikes, this.hitSpikes, null, this);
        this.physics.add.collider(this.player, this.spikes1, this.hitSpikes, null, this);
        this.physics.add.collider(this.player, this.spikes2, this.hitSpikes, null, this);


        //ESTRELLAS
        this.star = this.physics.add.image(300, 100, 'star').setImmovable(true);
        this.star.body.setAllowGravity(false);
        //colision
        this.physics.add.overlap(this.player, this.star, this.collectStars, null, this);
    }

    update(time, delta) {

        // movimientos segund el cursor del teclado
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200);
            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }
        // saltar
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-400);
            this.jump.play();
            console.log(delta);
        }

   
        //MOVIMIENTO DE PLATAFORMAS
        this.grass0.x += this.speed0 * delta;
        this.grass1.x -= this.speed1 * delta;
        this.grass2.x -= this.speed1 * delta;
        this.grass3.x -= this.speed1 * delta;
        this.grass4.x -= this.speed1 * delta;
        this.grass5.x += this.speed1 * delta;
        this.grass6.x += this.speed1 * delta;

        if (this.grass0.x > 1200) {
            this.grass0.x = 0;
        }
        if (this.grass1.x < -50) {
            this.grass1.x = 1300;
        }
        if (this.grass2.x < -50) {
            this.grass2.x = 1300;
        }
        if (this.grass3.x < -50) {
            this.grass3.x = 1300;
        }
        if (this.grass4.x < -50) {
            this.grass4.x = 1300;
        }
        if (this.grass5.x > 1300) {
            this.grass5.x = -50;
        }
        if (this.grass6.x > 1300) {
            this.grass6.x = -50;
        }

        //POSICIONAMIENTO DE ESTRELLA
        if(this.posRandom===1){
            this.star.x=this.grass1.x;
            this.star.y=this.grass1.y-50;
        }
        if(this.posRandom===2){
            this.star.x=this.grass2.x;
            this.star.y=this.grass2.y-50;
        }
        if(this.posRandom===3){
            this.star.x=this.grass3.x;
            this.star.y=this.grass3.y-50;
        }
        if(this.posRandom===4){
            this.star.x=this.grass4.x;
            this.star.y=this.grass4.y-50;
        }
        if(this.posRandom===5){
            this.star.x=this.grass5.x;
            this.star.y=this.grass5.y-50;
        }
        if(this.posRando===6){
            this.star.x=this.grass6.x;
            this.star.y=this.grass6.y-50;
        }

    };
    movePlayer(player,plataform){
        player.x += 1.5;
    }
    movePlayerTwo(player,plataform){
        player.x -= 3;
    }
    movePlayerThree(player,plataform){
        player.x += 3;
    }
    hitSpikes(player) {
        //this.physics.pause();
        player.setTint(0xff0000);
        //this.gameOver = true;
        this.showGameOver();
        this.corte.play();
    }
    collectStars(player, star) {
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
        this.posRandom=Phaser.Math.Between(1, 6);
        this.coins.play();
        if(this.score >= 350){
            this.showCongratulations();
        }
    }
    // Escena de Game Over
    showGameOver() {
        this.scene.start('gameover');
        this.gameOver.play();
    }

    // Escena de Game Over
    showCongratulations() {
        this.scene.start('congratulations');
    }
}

export default Escena;