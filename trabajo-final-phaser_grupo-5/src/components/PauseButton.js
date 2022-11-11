class PauseButton {

    constructor(scene) {
        this.relatedScene = scene;
    }

    preload() {

        this.relatedScene.load.image('pause', '../img/pauseButton.png');
    }

    create() {

        this.startButton = this.relatedScene.add.image(600, 360, 'pause').setInteractive();

        this.startButton.on('pointerdown', () => {
            this.relatedScene.scene.start('game');
        });
    }
    
}

export default PauseButton;