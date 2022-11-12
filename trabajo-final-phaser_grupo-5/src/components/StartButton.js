class StartButton {

    constructor(scene) {
        this.relatedScene = scene;
    }

    preload() {

        this.relatedScene.load.image('restart', '../img/restart.png');
        this.nivelActual = sessionStorage.getItem("nivelActual"); //asignamos a una variable el valor almacenado de la memoria de sesion cuya clave sea "nivelActual"
    }

    create() {

        this.startButton = this.relatedScene.add.image(400, 500, 'started').setScale(2).setInteractive();
        this.startButton.on('pointerdown', () => {//al presionar el boton
            this.relatedScene.scene.start('menu');//volvera a reproducir la escena del menu
        });
    }
    
}

export default StartButton;