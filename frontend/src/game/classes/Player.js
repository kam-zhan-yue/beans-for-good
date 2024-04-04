import Phaser from 'phaser';

const LastFacingDirection = {
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
};


export default class Player {
    constructor(physics, x, y, textureKey) {
        // Reference to the Phaser scene
        this.physics = physics;
        this.lastFacingDirection = LastFacingDirection.DOWN;

        // Create the player sprite
        this.body = this.physics.add.sprite(x, y, textureKey, 'down_idle_1.png');

        this.body.anims.play('player-idle-down');
        this.body.setSize(this.body.width * 0.8, this.body.height);
        // Set up player animations, physics, etc.
        // Add more initialization code as needed
    }

    checkInputs (cursors) 
    {
        const speed = 100;

        var x = 0;
        var y = 0;

        //Handle speed
        if(cursors.left.isDown)
        {   
            x = -speed;
            this.body.setVelocity(-speed, 0);
            this.lastFacingDirection = LastFacingDirection.LEFT;
        }
        else if(cursors.right.isDown)
        {
            x = speed;
            this.body.setVelocity(speed, 0);
            this.lastFacingDirection = LastFacingDirection.RIGHT;
        }
        if(cursors.up.isDown)
        {
            y = -speed;
            this.body.setVelocity(0, -speed);
            this.lastFacingDirection = LastFacingDirection.UP;
        }
        else if(cursors.down.isDown)
        {
            y = speed;
            this.body.setVelocity(0, speed);
            this.lastFacingDirection = LastFacingDirection.DOWN;
        }

        //Handle animations
        if(y < 0)
            this.body.anims.play('player-run-up', true);
        else if(y > 0)
            this.body.anims.play('player-run-down', true);
        else if(x < 0)
            this.body.anims.play('player-run-left', true);
        else if(x > 0)
            this.body.anims.play('player-run-right', true);
        if(x === 0 && y === 0)
        {
            this.idle();
        }
        this.body.setVelocity(x, y);
    }

    idle () 
    {
        this.body.setVelocity(0, 0);
        switch (this.lastFacingDirection) {
            case LastFacingDirection.UP:
                this.body.anims.play('player-idle-up', true);
                break;
            case LastFacingDirection.DOWN:
                this.body.anims.play('player-idle-down', true);
                break;
            case LastFacingDirection.LEFT:
                this.body.anims.play('player-idle-left', true);
                break;
            case LastFacingDirection.RIGHT:
                this.body.anims.play('player-idle-right', true);
                break;
        }
    }
}