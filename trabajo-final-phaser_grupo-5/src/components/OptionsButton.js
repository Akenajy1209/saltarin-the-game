class OptionsButton {

    constructor(scene) {
        this.relatedScene = scene;
    }

    preload() {

        this.relatedScene.load.image('options', '../img/1.png');
        this.relatedScene.load.image('options2', '../img/2.png');
    }

    create() {

        this.optionButton = this.relatedScene.add.image(450, 460, 'options').setInteractive();
        this.optionButtonTwo = this.relatedScene.add.image(650, 460, 'options2').setInteractive();

        this.optionButton.on('pointerdown', () => {//al presionar el boton
            let nivel="nivel-1";
            sessionStorage.setItem("nivelActual",nivel); //almacena en la memoria de sesion la variable nivel con la clave "nivelActual"
            this.relatedScene.scene.start('game');
        });

        this.optionButtonTwo.on('pointerdown', () => { //al presionar el boton
            let nivel="nivel-2";
            sessionStorage.setItem("nivelActual",nivel); //almacena en la memoria de sesion la variable nivel con la clave "nivelActual"
            this.relatedScene.scene.start('game-2');
        });
    }
    
}

export default OptionsButton;