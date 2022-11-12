import Phaser from 'phaser';
import OptionsButton from '../components/OptionsButton';

class Menu extends Phaser.Scene {

    // Se usará como palabra clave para usar la escena
    constructor() {
        super({ key: 'menu' });
        this.OptionsButton = new OptionsButton(this);
    }
    nivelActual=null;
    
    preload() {
        // Carga una imagen. Los parametros son el nombre y la direccion
        this.load.image('background2', 'img/sceneMenu.jpg');
        this.load.image('logo', 'img/Menu1.png');
        this.OptionsButton.preload();
    }
    create() {

        // Fondo
        this.add.image(635, 300, 'background2').setScale(0.8,0.6);
        this.add.image(635, 200, 'logo').setScale(0.7);
        this.OptionsButton.create();
        /*StartButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        StartButton.reset();*/
    }
    
}

export default Menu;