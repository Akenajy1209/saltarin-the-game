import Phaser from 'phaser';

class Escena extends Phaser.Scene {

    // Se usará como palabra clave para usar la escena
    constructor() {
        super({ key: 'game' });
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
    posRandom=1;
    star=null;
    score=0;

    init(){
        this.score=0;
    }
    preload() {

        this.load.image('sky', 'img/mountains.png');
        this.load.image('ground', 'img/platform.png');
        this.load.image('grass', 'img/grass.png');
        this.load.image('spikes', 'img/spikes.png');
        this.load.image('spikes2', 'img/spikes2.png');
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
        this.add.image(635, 50, 'sky').setScale(1,1.2);

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
        this.grass0 = this.physics.add.image(600, 400, 'grass').setScale(0.5).setImmovable(true);
        this.grass0.body.setAllowGravity(false);
        this.grass0.setData('glue', true);

        //SUELOS QUE SUBEN
        this.grass1 = this.physics.add.image(100, 600, 'grass').setScale(0.7).setImmovable(true);
        this.grass1.body.setAllowGravity(false);
        this.grass2 = this.physics.add.image(450, 300, 'grass').setScale(0.7).setImmovable(true);
        this.grass2.body.setAllowGravity(false);
        this.grass3 = this.physics.add.image(750, 600, 'grass').setScale(0.7).setImmovable(true);
        this.grass3.body.setAllowGravity(false);
        this.grass4 = this.physics.add.image(1100, 300, 'grass').setScale(0.7).setImmovable(true);
        this.grass4.body.setAllowGravity(false);

        //SUELOS QUE BAJAN
        this.grass5 = this.physics.add.image(280, 100, 'grass').setScale(0.7).setImmovable(true);
        this.grass5.body.setAllowGravity(false);
        this.grass6 = this.physics.add.image(930, 100, 'grass').setScale(0.7).setImmovable(true);
        this.grass6.body.setAllowGravity(false);

        //velocidades
        this.speed0 = Phaser.Math.GetSpeed(300, 10); // funcion de phaser para recorrer 300px en 10 segundos
        this.speed1 = Phaser.Math.GetSpeed(600, 5); // funcion de phaser para recorrer 600px en 5 segundos
        this.speed2 = Phaser.Math.GetSpeed(600, 4); // funcion de phaser para recorrer 600px en 4 segundos

        //colision con jugador
        this.physics.add.collider(this.player, this.grass0);
        this.physics.add.collider(this.player, this.grass1);
        this.physics.add.collider(this.player, this.grass2);
        this.physics.add.collider(this.player, this.grass3);
        this.physics.add.collider(this.player, this.grass4);
        this.physics.add.collider(this.player, this.grass5);
        this.physics.add.collider(this.player, this.grass6);

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
        //colision
        this.physics.add.collider(this.player, this.spikes, this.hitSpikes, null, this);

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
            this.player.setVelocityY(-500);
            this.jump.play();
        }
   
        //MOVIMIENTO DE PLATAFORMAS

        this.grass0.y += this.speed0 * delta; //cambia la posicion Y de la plataforma de forma constante hacia abajo
        this.grass1.y -= this.speed1 * delta; //cambia la posicion Y de la plataforma de forma constante hacia arriba
        this.grass2.y -= this.speed1 * delta; //cambia la posicion Y de la plataforma de forma constante hacia arriba
        this.grass3.y -= this.speed1 * delta; //cambia la posicion Y de la plataforma de forma constante hacia arriba
        this.grass4.y -= this.speed1 * delta; //cambia la posicion Y de la plataforma de forma constante hacia arriba
        this.grass5.y += this.speed1 * delta; //cambia la posicion Y de la plataforma de forma constante hacia abajo
        this.grass6.y += this.speed1 * delta; //cambia la posicion Y de la plataforma de forma constante hacia abajo

        if (this.grass0.y > 600) {// si la posicion de la plataforma sobrepasa el limite inferior
            this.grass0.y = 0;     // vuelve a la parte superior de la pantalla
            
        }
        if (this.grass1.y < -50) {// si la posicion de la plataforma sobrepasa el limite superior
            this.grass1.y = 650; // vuelve a la parte inferior de la pantalla
        }
        if (this.grass2.y < -50) { // si la posicion de la plataforma sobrepasa el limite superior
            this.grass2.y = 650; // vuelve a la parte inferior de la pantalla
        }
        if (this.grass3.y < -50) {
            this.grass3.y = 650;
        }
        if (this.grass4.y < -50) {
            this.grass4.y = 650;
        }
        if (this.grass5.y > 650) { // si la posicion de la plataforma sobrepasa el limite inferior
            this.grass5.y = -50;    // vuelve a la parte superior de la pantalla
        }
        if (this.grass6.y > 650) { // si la posicion de la plataforma sobrepasa el limite inferior
            this.grass6.y = -50;    // vuelve a la parte superior de la pantalla
        }

        //POSICIONAMIENTO DE ESTRELLA
        //Dependiendo del valor de posRandom, la estrella se ubicara en un sobre una plataforma en especifico
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

    //Esta funcion sirve para determinar el comportamiento del jugador al chocar con un pincho
    hitSpikes(player) {
        player.setTint(0xff0000);
        this.showGameOver(); 
        this.corte.play();
    }

    //Esta funcion determina el comportamiento de las estrellas al sobreponerse con el jugador
    collectStars(player, star) {
        this.score += 10; 
        this.scoreText.setText('Score: ' + this.score);
        this.posRandom=Phaser.Math.Between(1, 6);   //se asignara un nuevo valor de forma aleatoria entre 1 y 6
        this.coins.play();
         
        if(this.score >= 350){// si el puntaje es igual o mayor a 350
            this.showCongratulations(); // llama a la funcion 
        }
    }
    // FUNCION GAME OVER (al llamarla se reprducira la escena de juego perdido)
    showGameOver() {
        this.scene.start('gameover');
        this.gameOver.play();
    }

    // FUNCION WINNER (al llamarla se reprducira la escena de juego ganado)
    showCongratulations() {
        this.scene.start('congratulations');
    }
}

export default Escena;