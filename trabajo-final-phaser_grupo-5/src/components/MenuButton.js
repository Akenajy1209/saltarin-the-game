class MenuButton {

    constructor(scene) {
        this.relatedScene = scene;
    }

    preload() {

        this.relatedScene.load.image('menuInicial', '../img/menuButton.png');
    }

    create() {

        this.startButton = this.relatedScene.add.image(600, 420, 'menuInicial').setInteractive();

        this.startButton.on('pointerdown', () => {
            this.relatedScene.scene.start('menu');
        });
    }
    
}

export default MenuButton;