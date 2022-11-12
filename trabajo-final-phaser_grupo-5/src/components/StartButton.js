class StartButton {

    constructor(scene) {
        this.relatedScene = scene;
    }
    preload() {
        this.relatedScene.load.image('start', '../img/startButton.png');
        this.nivelActual = sessionStorage.getItem("nivelActual");
    }

    create() {

        this.startButton = this.relatedScene.add.image(600,400, 'start').setInteractive();
        this.startButton.on('pointerdown', () => {
            if(this.nivelActual === "nivel-1"){
                this.relatedScene.scene.start('game');

            }else if(this.nivelActual === "nivel-2"){
                this.relatedScene.scene.start('game-2');
            }
        });
        
    }
    
}

export default StartButton;