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
    }

    // Method to check if a point (x, y) is inside the rectangle
    containsPoint(x, y) {
        return x >= this.x && x <= this.x + this.width &&
               y >= this.y && y <= this.y + this.height;
    }
}

export default Interaction;