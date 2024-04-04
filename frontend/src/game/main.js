import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import Phaser from 'phaser';
import { Preloader } from './scenes/Preloader';

// Find out more information about the Game Config at:
// https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Phaser.Scale.FIT, // Fit the game inside the window
        autoCenter: Phaser.Scale.CENTER_BOTH, // Center the game horizontally and vertically
        zoom: 3
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Game,
        GameOver
    ],

    physics: {
        default: 'arcade', // or other physics system like 'matter' or 'impact'
        arcade: {
            gravity: { y: 0 }, // Example: set the gravity
            debug: true // Set to true if you want to see physics bodies
        }
    },
};

const StartGame = (parent) => {

    return new Phaser.Game({ ...config, parent });

}

export default StartGame;
