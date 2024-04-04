import Phaser from 'phaser';

const debugDraw = (layers, scene) => {
    const debugGraphics = scene.add.graphics().setAlpha(1);
    layers.forEach((tileLayer) => {
        tileLayer.renderDebug(debugGraphics, {
        tileColor: null,
        collidingTileColor: new Phaser.Display.Color(243, 243, 234, 48),
        faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        });
    });
}

export default debugDraw;
