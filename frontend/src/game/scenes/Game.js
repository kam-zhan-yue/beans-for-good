import { EventBus } from '../EventBus';
import { Scene, Tilemaps } from 'phaser';
import constants from '../GameConstants';
import debugDraw from '../utilities/DebugDraw';
import createCharacterAnims from '../utilities/CharacterAnims.js';
import createTileMapAnims from '../utilities/TileMapAnims.js';
import { Align } from '../utilities/align.js';
import Interaction from '../classes/Interaction.js'
import Player from '../classes/Player.js'


const LastFacingDirection = {
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
};

export class Game extends Scene
{
    constructor ()
    {
        super('Game');

        //Define a player and cursors as a class property
        this.player = null;
        this.cursors = null;
        this.interactions = [];
        this.lastFacingDirection = LastFacingDirection.DOWN;
    }

    preload()
    {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    init ()
    {
        //Init the map
        const map = this.make.tilemap({key: 'main_tiles'});
        const tilesets = [];
        constants.TilemapImages.forEach((imageName) => {
            tilesets.push(map.addTilesetImage(imageName, imageName));
        });

        // Create layers for all images on the tileset
        const tileLayers = [];
        constants.TilemapLayers.forEach((layerName) => {
            var layer = map.createLayer(layerName, tilesets, 0, 0);
            layer.setCollisionByProperty({collides: true});
            tileLayers.push(layer);
        });

        const interactionLayer = map.getObjectLayer('Interactions');
        console.log(interactionLayer);
        interactionLayer.objects.forEach(interaction => {
            if(interaction.properties.length >= 2)
            {
                const facilityID = interaction.properties[0].value;
                const facilityType = interaction.properties[1].value;
                const interactionObject = new Interaction(this, interaction, facilityID, facilityType);
                this.interactions.push(interactionObject);
            }
        });

        debugDraw(tileLayers, this);

        // Init the player
        this.cameras.main.zoom = 4;
        var centerX = this.cameras.main.width / 2;
        var centerY = this.cameras.main.height / 2;
        // this.player.body = this.physics.add.sprite(centerX, centerY, 'player', 'down_idle_1.png');
        this.player = new Player(this.physics, centerX, centerY, 'player');
        createCharacterAnims(this.anims);
        this.physics.add.collider(this.player.body, tileLayers);
        this.cameras.main.startFollow(this.player.body, true);
    }
    
    create ()
    {
        this.cameras.main.setBackgroundColor(0x00ff00);

        this.init();
    
        EventBus.emit('current-scene-ready', this);
    }

    changeScene ()
    {
        this.scene.start('GameOver');
    }

    checkInputs ()
    {
        if(!this.cursors || !this.player.body)
            return;

        this.player.checkInputs(this.cursors);
    }

    update ()
    {
        this.checkInputs();
    }
}
