document.addEventListener('DOMContentLoaded', function() {
    const gameContainer = document.getElementById('game-container');
    const player = document.getElementById('player');
    let playerBottom = 0;
    let isJumping = false;
    let gameSpeed = 5;
    let obstacleInterval;
    let obstacles = [];
    let score = 0;

    function startGame() {
        obstacleInterval = setInterval(createObstacle, 2000);

        document.addEventListener('keydown', function(event) {
            if (event.key === ' ' && !isJumping) {
                jumpPlayer();
            }
        });
    }

    function jumpPlayer() {
        if (isJumping) return; // Prevent multiple jumps while in air
        isJumping = true;
    
        let jumpHeight = 500; // Adjust the jump height as needed
        let jumpDuration = 500; // Adjust the jump duration as needed
        let jumpStart = playerBottom;
        let gravity = ''; // Adjust gravity to control the descent speed
    
        function animateJump() {
            let startTime = Date.now();
            let initialVelocity = -0.3; // Initial upwards velocity
    
            function jump() {
                let currentTime = Date.now() - startTime;
                let jumpProgress = currentTime / jumpDuration;
    
                // Calculate position during jump
                if (jumpProgress < 1) {
                    // Moving up
                    let displacement = initialVelocity * currentTime + 0.5 * gravity * currentTime ** 2;
                    playerBottom = jumpStart - displacement;
                    player.style.bottom = playerBottom + 'px';
    
                    // Continue jumping animation
                    requestAnimationFrame(jump);
                } else {
                    // Ensure player lands exactly where it started
                    playerBottom = jumpStart;
                    player.style.bottom = playerBottom + 'px';
                    isJumping = false; // Reset jumping flag
                }
            }
    
            jump(); // Start the jump animation
        }
    
        animateJump();
    }
    
    
    
    
    
    
    
    
    function createObstacle() {
        const obstacle = document.createElement('div');
        obstacle.className = 'obstacle';
        obstacle.style.left = gameContainer.offsetWidth + 'px'; // Use offsetWidth instead of clientWidth
        gameContainer.appendChild(obstacle);
        obstacles.push(obstacle);

        moveObstacle(obstacle);
    }

    function moveObstacle(obstacle) {
        let obstacleMoveInterval = setInterval(() => {
            let obstacleLeft = parseFloat(obstacle.style.left);
            obstacleLeft -= gameSpeed;
            obstacle.style.left = obstacleLeft + 'px';

            // Check for collision with player
            if (checkCollision(obstacle)) {
                gameOver();
            }

            // Remove obstacle if it's off the screen
            if (obstacleLeft < -obstacle.offsetWidth) {
                obstacle.remove();
                obstacles.shift(); // Remove obstacle from array
                clearInterval(obstacleMoveInterval); // Clear the interval
                updateScore();
            }
        }, 20);
    }

    function checkCollision(obstacle) {
        const playerRect = player.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        // Simple collision detection logic
        return !(
            playerRect.right < obstacleRect.left ||
            playerRect.left > obstacleRect.right ||
            playerRect.bottom < obstacleRect.top ||
            playerRect.top > obstacleRect.bottom
        );
    }

    function updateScore() {
        score++;
        document.getElementById('score').textContent = 'Score: ' + score;
    }

    function gameOver() {
        clearInterval(obstacleInterval);
        alert('Game Over!'+ score);
        window.location.reload(); // Reload the page to restart the game
    }

    startGame(); // Start the game loop
});
