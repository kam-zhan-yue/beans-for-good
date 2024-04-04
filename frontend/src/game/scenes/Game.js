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
        this.player = this.physics.add.sprite(centerX, centerY, 'player', 'down_idle_1.png');
        // this.player = new Player(this.physics, centerX, centerY, 'player');
        createCharacterAnims(this.anims);

        this.player.anims.play('player-idle-down');
        this.physics.add.collider(this.player, tileLayers);
        this.player.setSize(this.player.width * 0.8, this.player.height);

        this.cameras.main.startFollow(this.player, true);
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
        if(!this.cursors || !this.player)
            return;

        const speed = 100;

        var x = 0;
        var y = 0;

        //Handle speed
        if(this.cursors.left.isDown)
        {   
            x = -speed;
            this.player.setVelocity(-speed, 0);
            this.lastFacingDirection = LastFacingDirection.LEFT;
        }
        else if(this.cursors.right.isDown)
        {
            x = speed;
            this.player.setVelocity(speed, 0);
            this.lastFacingDirection = LastFacingDirection.RIGHT;
        }
        if(this.cursors.up.isDown)
        {
            y = -speed;
            this.player.setVelocity(0, -speed);
            this.lastFacingDirection = LastFacingDirection.UP;
        }
        else if(this.cursors.down.isDown)
        {
            y = speed;
            this.player.setVelocity(0, speed);
            this.lastFacingDirection = LastFacingDirection.DOWN;
        }

        //Handle animations
        if(y < 0)
            this.player.anims.play('player-run-up', true);
        else if(y > 0)
            this.player.anims.play('player-run-down', true);
        else if(x < 0)
            this.player.anims.play('player-run-left', true);
        else if(x > 0)
            this.player.anims.play('player-run-right', true);
        if(x === 0 && y === 0)
        {
            switch (this.lastFacingDirection) {
                case LastFacingDirection.UP:
                    this.player.anims.play('player-idle-up', true);
                    break;
                case LastFacingDirection.DOWN:
                    this.player.anims.play('player-idle-down', true);
                    break;
                case LastFacingDirection.LEFT:
                    this.player.anims.play('player-idle-left', true);
                    break;
                case LastFacingDirection.RIGHT:
                    this.player.anims.play('player-idle-right', true);
                    break;
            }
        }
        this.player.setVelocity(x, y);
    }

    update ()
    {
        this.checkInputs();
    }
}
