// Get canvas and context
const canvas = document.getElementById("screensaverCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size to match the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Ball properties
const balls = [];
const ballCount = 12; // Desired number of balls
const colors = [
    "#FF5733", // Red
    "#33FF57", // Green
    "#3357FF", // Blue
    "#F033FF", // Magenta
    "#FF33A1", // Pink
    "#33FFF0", // Cyan
    "#FFB833", // Orange
    "#FFC300", // Gold
    "#DAF7A6", // Light Green
    "#581845", // Dark Purple
    "#900C3F", // Dark Red
    "#C70039", // Bright Red
    "#FF5733", // Red
    "#33FF57", // Green
    "#FF33A1", // Pink
    "#FFC300", // Yellow
];

// Ball constructor
function Ball(x, y, dx, dy, radius, color, opacity) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.opacity = opacity; // New property for opacity

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

        // Set shadow properties for glowing effect
        ctx.shadowColor = this.color; // Glow color
        ctx.shadowBlur = 20; // Blur amount for glow
        ctx.shadowOffsetX = 0; // No offset
        ctx.shadowOffsetY = 0; // No offset

        ctx.fillStyle = this.color; // Ball color
        ctx.globalAlpha = this.opacity; // Set the ball's opacity
        ctx.fill();
        ctx.closePath();

        ctx.globalAlpha = 1; // Reset the global alpha for other drawings
    };

    this.update = function () {
        // Move the ball slowly
        this.x += this.dx;
        this.y += this.dy;

        // Check if the ball is off-screen
        if (
            this.x + this.radius < 0 ||
            this.x - this.radius > canvas.width ||
            this.y + this.radius < 0 ||
            this.y - this.radius > canvas.height
        ) {
            this.reset(); // Reset ball position if off-screen
        }

        // Draw the ball on the new position
        this.draw();
    };

    this.reset = function () {
        // Reset ball to a random position off-screen
        this.radius = getRandomInt(70, 100); // Increased radius size for even bigger balls
        this.color = colors[getRandomInt(0, colors.length - 1)];
        this.opacity = Math.random() * (0.5 - 0.25) + 0.25; // Random opacity between 25% and 50%

        // Generate a new position from the edges
        if (Math.random() < 0.5) {
            // 50% chance to enter from left or right
            this.x = Math.random() < 0.5 ? -this.radius : canvas.width + this.radius; // Entering from left or right
            this.y = getRandomInt(0, canvas.height); // Random vertical position
        } else {
            // 50% chance to enter from top or bottom
            this.x = getRandomInt(0, canvas.width); // Random horizontal position
            this.y = Math.random() < 0.5 ? -this.radius : canvas.height + this.radius; // Entering from top or bottom
        }
        this.dx = (Math.random() - 0.5) * 1; // Slower horizontal velocity
        this.dy = (Math.random() - 0.5) * 1; // Slower vertical velocity
    };
}

// Generate random values for ball properties
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function init() {
    for (let i = 0; i < ballCount; i++) {
        let radius = getRandomInt(70, 100); // Increased radius range for even bigger balls
        let x = getRandomInt(radius, canvas.width - radius);
        let y = getRandomInt(radius, canvas.height - radius);
        let dx = (Math.random() - 0.5) * 1; // Slower horizontal velocity
        let dy = (Math.random() - 0.5) * 1; // Slower vertical velocity
        let color = colors[getRandomInt(0, colors.length - 1)];
        let opacity = Math.random() * (0.5 - 0.25) + 0.25; // Random opacity between 25% and 50%
        balls.push(new Ball(x, y, dx, dy, radius, color, opacity));
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update each ball
    balls.forEach(ball => ball.update());
}

// Resize the canvas when the window size changes
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

init();
animate();
