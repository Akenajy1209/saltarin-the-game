import Phaser from 'phaser';
import StartButton from '../components/StartButton';
import RestartButton from '../components/RestartButton';

class Congratulations extends Phaser.Scene {

    // Se usará como palabra clave para usar la escena
    constructor() {
        super({ key: 'congratulations' });
        this.StartButton = new StartButton(this);
        this.restartButton = new RestartButton(this);
    }

    preload() {

        // Carga una imagen. Los parametros son el nombre y la direccion
        this.load.image('winner', '../img/won.jpg');
        this.load.image('win', '../img/win.png');
        this.nivelActual = sessionStorage.getItem("nivelActual")
    }

    create() {
        // Fondo
        this.add.image(600, 300, 'winner').setScale(0.5);
        this.winImage = this.add.image(740, 440, 'win');
        this.StartButton.create();
        // if(this.nivelActual === "nivel-1"){
        //     let nivel = "nivel-2";
        //     sessionStorage.setItem("nivelActual",nivel);
        //     //this.StartButton.create();
        // }
        // if(this.nivelActual === "nivel-2"){
        //     //this.restartButton.create();
        // }
    }
}

export default Congratulations;