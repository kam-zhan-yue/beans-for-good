import Phaser from 'phaser';

const createTileMapAnims = (anims, map) => {
    // console.log(map);
    // console.log(map.tilesets);
    map.tilesets.forEach(tileset => {
        processTileset(anims, tileset);
    });
}

const processTileset = (anims, tileset) => {
    // Check if the tile has the "animation" attribute
    console.log(tileset);
    console.log(tileset.tileData);
    console.log(tileset.tileData.length);
    
    // tileset.tileData.forEach(tileData => {
    // });
}

export default createTileMapAnims;
