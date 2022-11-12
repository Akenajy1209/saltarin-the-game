class PauseButton {

    constructor(scene) {
        this.relatedScene = scene;
    }

    preload() {

        this.relatedScene.load.image('pause', '../img/1.png');
    }

    create() {

        this.startButton = this.relatedScene.add.image(600, 360, 'pause').setInteractive();

        this.startButton.on('pointerdown', () => {
            let nivel="nivel-1";
            sessionStorage.setItem("nivelActual",nivel);
            this.relatedScene.scene.start('game');
        });
    }
    
}

export default PauseButton;