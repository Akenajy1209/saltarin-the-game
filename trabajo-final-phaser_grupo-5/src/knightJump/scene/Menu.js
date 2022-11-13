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
        this.load.image('background', 'img/knightJump/inicio.png');
        this.OptionsButton.preload();

    }
    create() {

        // Fondo
        this.add.image(600, 300, 'background').setScale(0.8,0.6);
        this.OptionsButton.create();
        
    }
    
}

export default Menu;