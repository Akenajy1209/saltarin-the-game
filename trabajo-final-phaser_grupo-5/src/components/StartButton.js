class StartButton {

    constructor(scene) {
        this.relatedScene = scene;
    }

    preload() {

        this.relatedScene.load.image('start', '../img/startButton.png');
    }

    create() {

        this.startButton = this.relatedScene.add.image(600,400, 'start').setInteractive();

        this.startButton.on('pointerdown', () => {
            this.relatedScene.scene.start('game');
        });
    }
    
}

export default StartButton;