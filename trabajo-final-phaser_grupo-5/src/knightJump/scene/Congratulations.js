import Phaser from 'phaser';
import StartButton from '../components/StartButton';

class Congratulations extends Phaser.Scene {

    // Se usará como palabra clave para usar la escena
    constructor() {
        super({ key: 'congratulations' });
        this.startButton = new StartButton(this);
    }

    preload() {

        // Carga una imagen. Los parametros son el nombre y la direccion
        this.load.image('winner', 'img/knightJump/won.jpg');
        this.startButton.preload();
        this.nivelActual = sessionStorage.getItem("nivelActual")
    }

    create() {

        // Fondo
        this.add.image(600, 300, 'winner').setScale(0.5);
        this.startButton.create();

    }
}

export default Congratulations;