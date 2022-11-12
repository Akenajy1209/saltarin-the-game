class RestartButton {

    constructor(scene) {
        this.relatedScene = scene;
    }

    preload() {

        this.relatedScene.load.image('restart', '../img/restart.png');
        this.nivelActual = sessionStorage.getItem("nivelActual");
    }

    create() {

        this.startButton = this.relatedScene.add.image(1000, 440, 'restart').setScale(2).setInteractive();

        this.startButton.on('pointerdown', () => {
            
            if(this.nivelActual === "nivel-1"){
                this.relatedScene.scene.start('game');
            }else if(this.nivelActual === "nivel-2"){
                this.relatedScene.scene.start('game-2');
            }
        });
    }
    
}

export default RestartButton;