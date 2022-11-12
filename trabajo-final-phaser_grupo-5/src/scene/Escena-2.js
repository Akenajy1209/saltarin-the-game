import Phaser from 'phaser';

class Escena extends Phaser.Scene {

    // Se usará como palabra clave para usar la escena
    constructor() {
        super({ key: 'game-2' });
    }
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
        this.speed0 = Phaser.Math.GetSpeed(900, 10); // funcion de phaser para recorrer 900px en 10 segundos
        this.speed1 = Phaser.Math.GetSpeed(900, 5); // funcion de phaser para recorrer 900px en 5 segundos
        this.speed2 = Phaser.Math.GetSpeed(600, 4); // funcion de phaser para recorrer 600px en 4 segundos

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
        this.grass0.x += this.speed0 * delta;   //cambia la posicion X de la plataforma de forma constante em direccion horizontal 
        this.grass1.x -= this.speed1 * delta;
        this.grass2.x -= this.speed1 * delta;
        this.grass3.x -= this.speed1 * delta;
        this.grass4.x -= this.speed1 * delta;
        this.grass5.x += this.speed1 * delta;
        this.grass6.x += this.speed1 * delta;

        if (this.grass0.x > 1200) {// si la posicion de la plataforma sobrepasa el limite lateral derecho
            this.grass0.x = 0;   // vuelve al lateral izquierdo de la pantalla
        }
        if (this.grass1.x < -50) {  // si la posicion de la plataforma sobrepasa el limite lateral izquierdo
            this.grass1.x = 1300;   // vuelve al lateral derecho de la pantalla
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
        if (this.grass5.x > 1300) { // si la posicion de la plataforma sobrepasa el limite lateral derecho
            this.grass5.x = -50;    // vuelve al lateral izquierdo de la pantalla
        }
        if (this.grass6.x > 1300) { // si la posicion de la plataforma sobrepasa el limite lateral derecho
            this.grass6.x = -50;    // vuelve al lateral izquierdo de la pantalla
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
    //FUNCIONES

    //Estas 3 funciones sirven para simular el desplazamiento del jugador junto con la plataforma en movimiento
    movePlayer(player,plataform){ 
        player.x += 1.5;
    }
    movePlayerTwo(player,plataform){
        player.x -= 3;
    }
    movePlayerThree(player,plataform){
        player.x += 3;
    }

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
        this.posRandom=Phaser.Math.Between(1, 6); //se asignara un nuevo valor de forma aleatoria entre 1 y 6
        this.coins.play();
        if(this.score >= 50){ // si el puntaje es igual o mayor a 350
            this.showCongratulations();  // llama a la funcion 
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