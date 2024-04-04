import { EventBus } from '../EventBus';
import { Scene, Tilemaps } from 'phaser';
import constants from '../GameConstants';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');

        //Define a player and cursors as a class property
        this.player = null;
        this.cursors = null;
    }

    preload()
    {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    createMap ()
    {
        const map = this.make.tilemap({key: 'main_tiles'});
        
        var tilesets = [];
        constants.TilemapImages.forEach((imageName) => {
            tilesets.push(map.addTilesetImage(imageName, imageName));
        });
        // Create layers for all images on the tileset

        var tileLayers = [];
        constants.TilemapLayers.forEach((layerName) => {
            var layer = map.createLayer(layerName, tilesets, 0, 0);
            layer.setCollisionByProperty({collides: true});
            tileLayers.push(layer);
        });

        const debugGraphics = this.add.graphics().setAlpha(1);
        tileLayers.forEach((tileLayer) => {
            tileLayer.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 243, 234, 48),
            faceColor: new Phaser.Display.Color(40, 39, 37, 255)
            });
        });
    }

    createCharacter ()
    {
        this.cameras.main.zoom = 3;
        var centerX = this.cameras.main.width / 2;
        var centerY = this.cameras.main.height / 2;
        this.player = this.physics.add.sprite(centerX, centerY, 'player', 'down_idle_1.png');
        this.anims.create({
            key: 'player-idle-down',
            frames: this.anims.generateFrameNames('player', {start: 1, end: 2, prefix: 'down_idle_', suffix: '.png'}),
            repeat: -1,
            frameRate: 15
        });
        this.anims.create({
            key: 'player-idle-up',
            frames: this.anims.generateFrameNames('player', {start: 1, end: 2, prefix: 'up_idle_', suffix: '.png'}),
            repeat: -1,
            frameRate: 8
        });
        this.anims.create({
            key: 'player-idle-left',
            frames: this.anims.generateFrameNames('player', {start: 1, end: 2, prefix: 'left_idle_', suffix: '.png'}),
            repeat: -1,
            frameRate: 8
        });
        this.anims.create({
            key: 'player-idle-right',
            frames: this.anims.generateFrameNames('player', {start: 1, end: 2, prefix: 'right_idle_', suffix: '.png'}),
            repeat: -1,
            frameRate: 8
        });
        this.anims.create({
            key: 'player-run-down',
            frames: this.anims.generateFrameNames('player', {start: 1, end: 2, prefix: 'down_run_', suffix: '.png'}),
            repeat: -1,
            frameRate: 8
        });
        this.anims.create({
            key: 'player-run-up',
            frames: this.anims.generateFrameNames('player', {start: 1, end: 2, prefix: 'up_run_', suffix: '.png'}),
            repeat: -1,
            frameRate: 8
        });
        this.anims.create({
            key: 'player-run-left',
            frames: this.anims.generateFrameNames('player', {start: 1, end: 2, prefix: 'left_run_', suffix: '.png'}),
            repeat: -1,
            frameRate: 8
        });
        this.anims.create({
            key: 'player-run-right',
            frames: this.anims.generateFrameNames('player', {start: 1, end: 2, prefix: 'right_run_', suffix: '.png'}),
            repeat: -1,
            frameRate: 8
        });

        this.player.anims.play('player-idle-down');
        // this.player.add.collider(this.player, )
    }

    create ()
    {

        this.cameras.main.setBackgroundColor(0x00ff00);

        // this.add.image(512, 384, 'background').setAlpha(0.5);

        // this.add.text(512, 384, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
        //     fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
        //     stroke: '#000000', strokeThickness: 8,
        //     align: 'center'
        // }).setOrigin(0.5).setDepth(100);

        this.createMap();
        this.createCharacter();
    
        EventBus.emit('current-scene-ready', this);
    }

    changeScene ()
    {
        this.scene.start('GameOver');
    }

    update ()
    {
        if(!this.cursors || !this.player)
            return;

        const speed = 100;
        if(this.cursors.left.isDown)
        {   
            this.player.anims.play('player-run-left', true);
            this.player.setVelocity(-speed, 0);
        }
        else if(this.cursors.right.isDown)
        {
            this.player.anims.play('player-run-right', true);
            this.player.setVelocity(speed, 0);
        }
        else if(this.cursors.up.isDown)
        {
            this.player.anims.play('player-run-up', true);
            this.player.setVelocity(0, -speed);
        }
        else if(this.cursors.down.isDown)
        {
            this.player.anims.play('player-run-down', true);
            this.player.setVelocity(0, speed);
        }
        else
        {
            this.player.anims.play('player-idle-down')
            this.player.setVelocity(0);
        }
    }
}
