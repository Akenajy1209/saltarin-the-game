import Phaser from 'phaser';
import RestartButton from '../components/RestartButton';

class GameOver extends Phaser.Scene {

    // Se usará como palabra clave para usar la escena
    constructor() {
        super({ key: 'gameover' });
        this.restartButton = new RestartButton(this);
    }

    preload() {

        // Carga una imagen. Los parametros son el nombre y la direccion
        this.load.image('background', 'img/gameOver1.png');
        this.load.image('gameOver', '../img/gameOver2.png');

        this.restartButton.preload();

    }

    create() {

        // Fondo
        this.add.image(635, 300, 'background').setScale(0.6,0.3);
        this.restartButton.create();
        this.gameoverImage = this.add.image(60, 440, 'gameOver');

    }

}

export default GameOver;