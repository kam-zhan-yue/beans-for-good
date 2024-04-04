import Phaser from 'phaser';

const createCharacterAnims = (anims) => {
    anims.create({
        key: 'player-idle-down',
        frames: anims.generateFrameNames('player', {start: 1, end: 2, prefix: 'down_idle_', suffix: '.png'}),
        repeat: -1,
        frameRate: 8
    });
    anims.create({
        key: 'player-idle-up',
        frames: anims.generateFrameNames('player', {start: 1, end: 2, prefix: 'up_idle_', suffix: '.png'}),
        repeat: -1,
        frameRate: 8
    });
    anims.create({
        key: 'player-idle-left',
        frames: anims.generateFrameNames('player', {start: 1, end: 2, prefix: 'left_idle_', suffix: '.png'}),
        repeat: -1,
        frameRate: 8
    });
    anims.create({
        key: 'player-idle-right',
        frames: anims.generateFrameNames('player', {start: 1, end: 2, prefix: 'right_idle_', suffix: '.png'}),
        repeat: -1,
        frameRate: 8
    });
    anims.create({
        key: 'player-run-down',
        frames: anims.generateFrameNames('player', {start: 1, end: 2, prefix: 'down_run_', suffix: '.png'}),
        repeat: -1,
        frameRate: 8
    });
    anims.create({
        key: 'player-run-up',
        frames: anims.generateFrameNames('player', {start: 1, end: 2, prefix: 'up_run_', suffix: '.png'}),
        repeat: -1,
        frameRate: 8
    });
    anims.create({
        key: 'player-run-left',
        frames: anims.generateFrameNames('player', {start: 1, end: 2, prefix: 'left_run_', suffix: '.png'}),
        repeat: -1,
        frameRate: 8
    });
    anims.create({
        key: 'player-run-right',
        frames: anims.generateFrameNames('player', {start: 1, end: 2, prefix: 'right_run_', suffix: '.png'}),
        repeat: -1,
        frameRate: 8
    });
}

export default createCharacterAnims;
