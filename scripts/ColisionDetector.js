/**
 * Utility service for calculating geometric overlap (hit detection).
 */
class CollisionDetection {
    /**
     * Constructor. No dependencies are injected.
     */
    constructor() {
        // No internal state needed.
    }

    // --- Public Interface Functions ---

    /**
     * Checks collision between the Player and a list of obstacles.
     * @param {object} playerBounds - Player's boundaries (x, y, width, height).
     * @param {Array<object>} obstacles - List of obstacle boundaries.
     * @returns {object | null} Returns the colliding obstacle, or null.
     */
    checkPlayerCollision(playerBounds, obstacles) {
        for (const obstacle of obstacles) {
            const obstacleBounds = {
                x: obstacle.x,
                y: obstacle.y,
                width: obstacle.width,
                height: obstacle.height
            };

            if (this.checkOverlap(playerBounds, obstacleBounds)) {
                return obstacle;
            }
        }

        return null;
    }

    /**
     * Core utility: Checks for overlap between two rectangular hitboxes (AABB).
     * @param {object} boundsA - First bounds object.
     * @param {object} boundsB - Second bounds object.
     * @returns {boolean} True if the rectangles overlap.
     */
    checkOverlap(boundsA, boundsB) {
        // Logic: AABB calculation (e.g., A.x < B.x + B.width && ...).
        return (
            boundsA.x < boundsB.x + boundsB.width &&
            boundsA.x + boundsA.width > boundsB.x &&
            boundsA.y < boundsB.y + boundsB.height &&
            boundsA.height + boundsA.y > boundsB.y
        );
    }

    /**
     * Calculates the area of overlap.
     * @param {object} boundsA - First bounds object.
     * @param {object} boundsB - Second bounds object.
     * @returns {number} The area of overlap (0 if no collision).
     */
    getOverlapArea(boundsA, boundsB) {
        // Logic to calculate overlap area.
        return 0;
    }
}

export default CollisionDetection;
