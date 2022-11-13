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
        this.load.image('gameOver', 'img/knightJump/gameOver1.png');
        this.load.image('Over', 'img/knightJump/GameOver.png');
        this.restartButton.preload();

    }

    create() {

        // Fondo
        this.add.image(635, 300, 'gameOver').setScale(0.6, 0.3);
        this.add.image(300, 140, 'Over').setScale(1.8);
        this.restartButton.create();

    }

}

export default GameOver;