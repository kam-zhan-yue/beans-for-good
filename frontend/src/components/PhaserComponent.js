// PhaserComponent.js
import React, { Component } from 'react';
import Phaser from 'phaser';
import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'phaser-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Phaser.Scale.AUTO,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Game,
        GameOver
    ]
};

class PhaserComponent extends Component {
    
    componentDidMount() {
        // Initialize your Phaser game here
        this.game = new Phaser.Game(config);
    }

    componentWillUnmount() {
        // Clean up Phaser resources here
        this.game.destroy(true);
    }

    render() {
        return <div id="game-container" />;
    }
}

export default PhaserComponent;