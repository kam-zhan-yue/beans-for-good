import { EventBus } from '../EventBus';
import { Scene, Tilemaps } from 'phaser';
import constants from '../GameConstants';
import debugDraw from '../utilities/DebugDraw';
import createCharacterAnims from '../utilities/CharacterAnims.js';
import Interaction from '../classes/Interaction.js'
import Player from '../classes/Player.js'
import eventsCenter from '../events/EventsCenter.js';

const State = {
    IDLE: 'IDLE',
    INTERACTING: 'INTERACTING',
};

export class Game extends Scene
{
    constructor ()
    {
        super('Game');

        //Define a player and cursors as a class property
        this.player = null;
        this.cursors = null;
        this.state = State.IDLE;
        this.interactions = [];
        this.currentInteraction = null;
        this.startedUI = false;
        this.inputStarted = false;
    }

    preload()
    {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    setupGame ()
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
        interactionLayer.objects.forEach(interaction => {
            if(interaction.properties.length >= 2)
            {
                const facilityID = interaction.properties[0].value;
                const facilityType = interaction.properties[1].value;
                const interactionObject = new Interaction(this, interaction, facilityID, facilityType);
                this.interactions.push(interactionObject);
            }
        });

        if(constants.Debug)
            debugDraw(tileLayers, this);

        // Init the player
        this.cameras.main.zoom = 3;
        var centerX = this.cameras.main.width / 2;
        var centerY = this.cameras.main.height / 2;

        const spawnPoint = map.getObjectLayer('Spawn Points');
        spawnPoint.objects.forEach(spawnPoint => {
            const id = spawnPoint.properties[0].value;
            if(id === constants.SpawnPoint)
            {
                centerX = spawnPoint.x;
                centerY = spawnPoint.y;
            }
        });
        // this.player.body = this.physics.add.sprite(centerX, centerY, 'player', 'down_idle_1.png');
        this.player = new Player(this.physics, centerX, centerY, 'player');
        createCharacterAnims(this.anims);
        this.physics.add.collider(this.player.body, tileLayers);
        this.cameras.main.startFollow(this.player.body, true);
    }
    
    changeScene ()
    {
        this.scene.start('GameOver');
    }

    interactionStarted ()
    {
        eventsCenter.emit('interacting');
        this.state = State.INTERACTING;
        this.interactions.forEach(interaction => {
            interaction.setActive(false);
        });
    }

    interactionOver ()
    {
        eventsCenter.emit('idle');
        this.state = State.IDLE;
        this.interactions.forEach(interaction => {
            interaction.setActive(true);
        });
    }

    create ()
    {
        this.scene.run('GameUI');
        this.startedUI = true;

        this.cameras.main.setBackgroundColor(0x00ff00);

        this.setupGame();
    
        EventBus.emit('current-scene-ready', this);
    }

    changeScene ()
    {
        this.scene.start('GameOver');
    }

    checkInputs ()
    {
        switch(this.state)
        {
            case State.IDLE:
                this.player.checkInputs(this.cursors);
                if(this.currentInteraction != null && this.cursors.space.isDown)
                {
                    EventBus.emit('interaction-started', this.currentInteraction);
                    this.interactionStarted ();
                }
                break;
            case State.INTERACTING:
                this.player.idle();
                break;
        }

        //To avoid error on hot reload for some reason
        if(!this.inputStarted)
        {
            if(this.cursors.up.isDown || this.cursors.down.isDown || this.cursors.left.isDown || this.cursors.right.isDown)
            {
                this.inputStarted = true;
            }
        }

        if(this.startedUI && this.inputStarted)
            eventsCenter.emit('cursors', this.cursors);
    }

    checkColliders ()
    {
        this.interactions.forEach(interaction => {
            if(interaction.containsPoint(this.player.body.x, this.player.body.y))
            {
                this.currentInteraction = interaction;
            }
        });
    }

    update ()
    {
        this.checkColliders();
        this.checkInputs();
    }
}
