import Phaser, { Scene } from 'phaser'
import constants from "../GameConstants";
import eventsCenter from '../events/EventsCenter';

export class GameUI extends Scene {
    constructor()
    {
        super('GameUI');
        
        this.ready = false;
        this.upArrow = null
        this.downArrow = null;
        this.leftArrow = null;
        this.rightArrow = null;
    }

    create()
    {
        // Add arrow images as sprites
        this.upArrow = this.add.image(0, 0, `${constants.ArrowKeys[0]}-inactive`);
        this.downArrow = this.add.image(0, 0, `${constants.ArrowKeys[1]}-inactive`);
        this.leftArrow = this.add.image(0, 0, `${constants.ArrowKeys[2]}-inactive`);
        this.rightArrow = this.add.image(0, 0, `${constants.ArrowKeys[3]}-inactive`);

        // Set scale for arrow keys
        const scale = 4; // Adjust scale factor as needed
        this.upArrow.setScale(scale);
        this.downArrow.setScale(scale);
        this.leftArrow.setScale(scale);
        this.rightArrow.setScale(scale);
        // Update arrow positions initially
        this.updateArrowPositions();

        // Listen for window resize event
        this.scale.on('resize', this.updateArrowPositions, this);

        // Initialise listeners
        eventsCenter.on('interacting', this.hideArrows, this);
        eventsCenter.on('idle', this.showArrows, this);
        eventsCenter.on('cursors', this.updateArrows, this);
        this.ready = true;
    }

    showArrows ()
    {
        this.upArrow.setVisible(true);
        this.downArrow.setVisible(true);
        this.leftArrow.setVisible(true);
        this.rightArrow.setVisible(true);
    }

    hideArrows ()
    {
        this.upArrow.setVisible(false);
        this.downArrow.setVisible(false);
        this.leftArrow.setVisible(false);
        this.rightArrow.setVisible(false);
    }

    updateArrows(cursors) {
        if(!this.ready)
            return;
        // Update the active/inactive state of arrow images
        const up = cursors.up.isDown;
        const down = cursors.down.isDown;
        const left = cursors.left.isDown;
        const right = cursors.right.isDown;
    
        if(this.upArrow)
        {
            this.upArrow.setTexture(`${constants.ArrowKeys[0]}-${up ? 'active' : 'inactive'}`);
        }
        if(this.downArrow)
        {
            this.downArrow.setTexture(`${constants.ArrowKeys[1]}-${down ? 'active' : 'inactive'}`);
        }
        if(this.leftArrow)
        {
            this.leftArrow.setTexture(`${constants.ArrowKeys[2]}-${left ? 'active' : 'inactive'}`);
        }
        if(this.rightArrow)
        {
            this.rightArrow.setTexture(`${constants.ArrowKeys[3]}-${right ? 'active' : 'inactive'}`);
        }
    }

    updateArrowPositions() {
        // Get the current scene width and height after scale
        const sceneWidth = this.scale.gameSize.width * this.scale.displayScale.x;
        const sceneHeight = this.scale.gameSize.height * this.scale.displayScale.y;
    
        // Set arrow positions
        const margin = 15;
        const arrowSize = 60;
    
        this.downArrow.setPosition(sceneWidth - margin * 2 - arrowSize * 1.5, sceneHeight - margin - arrowSize / 2);
        this.leftArrow.setPosition(sceneWidth - margin * 3 - arrowSize * 2.5, sceneHeight - margin - arrowSize / 2);
        this.upArrow.setPosition(sceneWidth - margin * 2 - arrowSize * 1.5, sceneHeight - margin * 2 - arrowSize * 1.5);
        this.rightArrow.setPosition(sceneWidth - margin - arrowSize / 2, sceneHeight - margin - arrowSize / 2);
    }
}