class RestartButton {

    constructor(scene) {
        this.relatedScene = scene;
    }

    preload() {

        this.relatedScene.load.image('restart', 'img/knightJump/restartButton.png');
        //asignamos a una variable el valor almacenado de la memoria de sesion cuya clave sea "nivelActual"
        this.nivelActual = sessionStorage.getItem("nivelActual");
        
    }

    create() {

        this.startButton = this.relatedScene.add.image(1000, 440, 'restart').setInteractive();

        this.startButton.on('pointerdown', () => {//al presionar el boton

            if (this.nivelActual === "nivel-1") { //si esta en el nivel 1
                this.relatedScene.scene.start('game'); //volvera a reproducir el nivel 1
            } else if (this.nivelActual === "nivel-2") {   //si esta en el nivel 2
                this.relatedScene.scene.start('game-2'); //volvera a reproducir el nivel 1
            }
        });
    }

}

export default RestartButton;