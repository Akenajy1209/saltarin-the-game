import Phaser from 'phaser';
import RestartButton from '../components/RestartButton';

class Congratulations extends Phaser.Scene {

    // Se usará como palabra clave para usar la escena
    constructor() {
        super({ key: 'congratulations' });
        this.restartButton = new RestartButton(this);
    }

    preload() {

        // Carga una imagen. Los parametros son el nombre y la direccion
        this.load.image('winner', '../img/won.jpg');
        this.load.image('win', '../img/win.png');
        this.restartButton.preload();

    }

    create() {

        // Fondo
        this.add.image(600, 300, 'winner').setScale(0.5);
        this.restartButton.create();
        this.winImage = this.add.image(740, 440, 'win');

    }

}

export default Congratulations;