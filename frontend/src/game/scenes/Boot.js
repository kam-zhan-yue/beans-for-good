import { Scene } from 'phaser';
import constants from "../GameConstants";

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        this.load.tilemapTiledJSON('main_tiles', 'assets/tiles/main_tiles.json');
        constants.TilemapImages.forEach((imageName) => {
            this.load.image(imageName, `assets/tilemaps/${imageName}.png`);
        });

        this.load.atlas('player', 'assets/atlas/character.png', 'assets/atlas/character.json');
        
        this.load.image('background', 'assets/bg.png');
        this.load.image('spacebar', 'assets/ui/spacebar.png');

        constants.ArrowKeys.forEach((arrowKey) => {
            const activeKey = `${arrowKey}-active`;
            const inactiveKey = `${arrowKey}-inactive`;
            this.load.image(activeKey, `assets/ui/${activeKey}.png`);
            this.load.image(inactiveKey, `assets/ui/${inactiveKey}.png`);
        });
    }

    create ()
    {
        this.scene.start('Game');
    }
}
