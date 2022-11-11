class OptionsButton {

    constructor(scene) {
        this.relatedScene = scene;
    }

    preload() {

        this.relatedScene.load.image('options', '../img/optionsButton.png');
    }

    create() {

        this.startButton = this.relatedScene.add.image(600, 460, 'options').setInteractive();

        this.startButton.on('pointerdown', () => {
            this.relatedScene.scene.start('menu');
        });
    }
    
}

export default OptionsButton;