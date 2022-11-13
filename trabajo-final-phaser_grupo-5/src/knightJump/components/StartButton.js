class StartButton {

    constructor(scene) {
        this.relatedScene = scene;
    }

    preload() {

        this.relatedScene.load.image('start', 'img/knightJump/restartButtonBlue.png');
        //asignamos a una variable el valor almacenado de la memoria de sesion cuya clave sea "nivelActual"
        this.nivelActual = sessionStorage.getItem("nivelActual");

    }

    create() {

        this.start = this.relatedScene.add.image(600, 400, 'start').setInteractive();

        this.start.on('pointerdown', () => { //al presionar el boton
            this.relatedScene.scene.start('menu'); //volvera a reproducir la escena del menu
        });
    }

}

export default StartButton;