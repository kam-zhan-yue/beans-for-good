// Define a class to represent rectangles
class Interaction {
    constructor(scene, interaction, facilityID, facilityType) {
        this.scene = scene;
        this.x = interaction.x;
        this.y = interaction.y;
        this.width = interaction.width;
        this.height = interaction.height;

        this.facilityID = facilityID;
        this.facilityType = facilityType;

        // Create a graphics object to represent the rectangle visually (optional)
        this.graphics = this.scene.add.graphics();
        this.graphics.fillStyle(0x00ff00, 0.5); // Green color with 50% opacity
        this.graphics.fillRect(this.x, this.y, this.width, this.height);

        // Create a tooltip sprite
        this.tooltip = this.scene.add.image(0, 0, 'spacebar');
        this.tooltip.setPosition(this.x + this.width/2, this.y);
        this.tooltip.setOrigin(0.5);
        this.tooltip.setVisible(false); // Initially hide the tooltip
        this.active = true;
    }

    setActive (active) {
        this.active = active;
    }

    // Method to check if a point (x, y) is inside the rectangle
    containsPoint(x, y) {
        if(!this.active)
        {
            this.hideTooltip();
            return false;
        }
        const contains = x >= this.x && x <= this.x + this.width &&
                        y >= this.y && y <= this.y + this.height;
        if(contains)
        {
            this.showTooltip();
        }
        else
        {
            this.hideTooltip();
        }
        return contains;
    }

    showTooltip () {
        this.tooltip.setVisible(true);
    }

    hideTooltip () {
        this.tooltip.setVisible(false);
    }
}

export default Interaction;