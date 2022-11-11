class RestartButton {

    constructor(scene) {
        this.relatedScene = scene;
    }

    preload() {

        this.relatedScene.load.image('restart', '../img/restart.png');
    }

    create() {

        this.startButton = this.relatedScene.add.image(1000, 440, 'restart').setScale(2).setInteractive();

        this.startButton.on('pointerdown', () => {
            this.relatedScene.scene.start('game');
        });
    }
    
}

export default RestartButton;