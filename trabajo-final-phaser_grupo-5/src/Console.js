// import React from 'react';
import Phaser from 'phaser';
import { useState, useEffect } from 'react';
import Escena from './components/Escena';

function Console() {

  const [listo, setListo] = useState(false);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 1200,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 1000 }, // cambia la gravedad en el eje x e y
          debug: false
        }
      },
      scene: [Escena]
    };

    // Arranca el juego 
    // A la variable game se le asigna un nuevo objeto de tipo phaser
    const game = new Phaser.Game(config);

    game.events.on("LISTO", setListo);

    return () => {
      setListo(false);
      game.destroy(true);
    }
  }, [listo]);
} 

export default Console;