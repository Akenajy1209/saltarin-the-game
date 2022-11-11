import Phaser from 'phaser';
import RestartButton from '../components/RestartButton';

class GameOver extends Phaser.Scene {

    // Se usará como palabra clave para usar la escena
    constructor(props) {
        super({ key: 'gameover' });
        this.restartButton = new RestartButton(this);

    }

    preload() {

        // Carga una imagen. Los parametros son el nombre y la direccion
        this.load.image('background', 'img/gameOver1.png');
        this.load.image('Over', '../img/GameOver.png');
        this.load.image('gameOver', '../img/gameOver2.png');
        this.restartButton.preload();

    }

    create() {
        
        // Fondo
        this.add.image(635, 300, 'background').setScale(0.6,0.3);
        this.add.image(300, 140, 'Over').setScale(1.8);
        // agragamos el texto
        //this.scoreText = this.add.text(16, 30, 'Score: 0', { fontSize: '32px', fill: '#000' });
        //this.scoreText.setText('Score: ' + this.score);
        this.restartButton.create();
        this.gameoverImage = this.add.image(240, 350, 'gameOver');

    }

}

export default GameOver;