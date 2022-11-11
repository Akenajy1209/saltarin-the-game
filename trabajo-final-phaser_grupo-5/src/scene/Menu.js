import Phaser from 'phaser';
import StartButton from '../components/StartButton';
import OptionsButton from '../components/OptionsButton';
import PauseButton from '../components/PauseButton';

class Menu extends Phaser.Scene {

    // Se usará como palabra clave para usar la escena
    constructor() {
        super({ key: 'menu' });
        this.StartButton = new StartButton(this);
        this.OptionsButton = new OptionsButton(this);
        this.PauseButton = new PauseButton(this);
        
        
    }
    
    

    preload() {

        // Carga una imagen. Los parametros son el nombre y la direccion
        this.load.image('background2', 'img/sceneMenu.jpg');
        this.load.image('logo', 'img/Menu1.png');
        this.StartButton.preload();
        this.OptionsButton.preload();
        this.PauseButton.preload();

    }

    create() {

        // Fondo
        this.add.image(635, 300, 'background2').setScale(0.8,0.6);
        this.add.image(635, 200, 'logo').setScale(0.7);
        this.StartButton.create();
        this.OptionsButton.create();
        /*StartButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        StartButton.reset();*/

    }

}

export default Menu;