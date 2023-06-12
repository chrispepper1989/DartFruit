
function startGame() {
    var gameoverlay = document.getElementById("overlay");
    var scoreDisplay = document.getElementById("score");
    var messageDisplay = document.getElementById("message");
    var topScoreDisplay = document.getElementById("topScores");
    var topScores = [0, 0, 0, 0, 0];
    var topScoreNames = ["", "", "", "", ""];
    var pauseGame = false;
    function onWin(score, message) {
        gameoverlay.classList.remove("hidden");
        scoreDisplay.innerHTML = "".concat(score);
        messageDisplay.innerHTML = message;
        pauseGame = true;
    }
    
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    // Set the canvas width and height to fill the window
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight;
    var circleRadius = canvas.width / 5; // The radius of the circle (watermelon)
    var circleX = canvas.width / 2; // The x coordinate of the circle center
    var circleY = canvas.height / 2 - 50; // The y coordinate of the circle center
    var stickLength = 20; // The length of the stick (cocktail stick)
    var stickWidth = 8; // The width of the stick
    var stickSpeed = 10; // The speed of the stick when fired
    var rotationSpeed = 0.01; // The speed of the circle rotation
    var rotationChangeProbability = 0.01; // The probability of changing the rotation direction
    // Define some variables for the game state
    var angle = 0; // The current angle of the circle
    var direction = 1; // The current direction of the circle rotation (1 or -1)
    var score = 0; // The
    var lastMessage = "hi";
    // The current angle of the stick
    var stickAngle = Math.PI / 2; // The stick starts at the bottom middle of the screen
    // The current position of the stick
    var stickX = circleX;
    var stickY = canvas.height - stickLength;
    // The current state of the stick
    var stickFired = false; // The stick is not fired yet
    var stickHit = false; // The stick has not hit anything yet
    // Define an array to store the angles of the sticks that hit the circle
    var hitSticks = [];
    // Define some colors for the sky gradient
    var skyColors = [
        "#87CEEB",
        "#F0F8FF",
        "#FFFAF0",
        "#FFD700",
        "#FF4500" // orange red
    ];
    // Define a function that takes a canvas context and draws a sky background
    function drawSky(ctx) {
        // Get the canvas width and height from the context
        var width = ctx.canvas.width;
        var height = ctx.canvas.height;
        // Create a linear gradient from top to bottom of the canvas
        var gradient = ctx.createLinearGradient(0, 0, 0, height);
        // Add color stops for each sky color
        for (var i = 0; i < skyColors.length; i++) {
            // Calculate the position of the color stop between 0 and 1
            var position = i / (skyColors.length - 1);
            // Add the color stop to the gradient
            gradient.addColorStop(position, skyColors[i]);
        }
        // Fill the canvas with the gradient
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
    }
    // Define a function to draw the circle (watermelon)
    function drawCircle() {
        // Save the current context state
        ctx.save();
        // Translate the origin to the center of the circle
        ctx.translate(circleX, circleY);
        // Rotate the context by the current angle
        ctx.rotate(angle);
        // Draw a green circle with a black stroke
        ctx.beginPath();
        ctx.arc(0, 0, circleRadius, 0, Math.PI * 2);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();
        // Draw a red circle inside the green circle to represent the watermelon flesh
        ctx.beginPath();
        ctx.arc(0, 0, circleRadius * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
        // Draw some black dots inside the red circle to represent the watermelon seeds
        ctx.fillStyle = "black";
        for (var i = 0; i < Math.PI * 2; i += Math.PI / 8) {
            for (var j = circleRadius * 0.6; j < circleRadius * 0.8; j += circleRadius / 10) {
                var x = j * Math.cos(i);
                var y = j * Math.sin(i);
                ctx.beginPath();
                ctx.arc(x, y, circleRadius / 100, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        // Restore the context state
        ctx.restore();
    }
    // A function that draws a dart on a canvas
    function drawDart(ctx, x, y, angle) {
        // Save the current context state
        ctx.save();
        // Translate and rotate the context to the given position and angle
        ctx.translate(x, y);
        ctx.rotate(angle + Math.PI); //* Math.PI / 180);
        ctx.translate(-6, 0);
        //ctx.rotate(90);
        // Draw the dart body as a rectangle
        ctx.fillStyle = "black";
        ctx.fillRect(-10, -2, 20, 4);
        // Draw the dart tip as a triangle
        ctx.fillStyle = "silver";
        ctx.beginPath();
        ctx.moveTo(10, -2);
        ctx.lineTo(10, 2);
        ctx.lineTo(15, 0);
        ctx.closePath();
        ctx.fill();
        // Draw the dart tail as a polygon
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.moveTo(-10, -2);
        ctx.lineTo(-15, -10);
        ctx.lineTo(-5, -2);
        ctx.lineTo(-15, 10);
        ctx.lineTo(-10, 2);
        ctx.closePath();
        ctx.fill();
        // Restore the context state
        ctx.restore();
    }
    // Define a function to draw a stick (cocktail stick)
    function drawStick(x, y, angle) {
        drawDart(ctx, x, y, angle);

    }
    function gameOver() {
        var message; // declare a variable to store the message
        // assign points to some value between 5 and 40
        var points = score;
        // assign points to some value between 0 and 40
        switch (true) {
            case points < 5:
                message = "High five";
                break;
            case points < 10:
                message = "Compliment";
                break;
            case points < 15:
                message = "Joke";
                break;
            case points < 20:
                message = "Dance move";
                break;
            case points < 25:
                message = "Secret handshake";
                break;
            case points < 30:
                message = "Funny face";
                break;
            case points < 35:
                message = "Magic trick";
                break;
            case points <= 40:
                message = "Shout out";
                break;
            default:
                message = "Invalid points";
        }
        console.log(message); // print the message
        // onWin(points, message)
        // Game over
        alert("Game over! Your score is " + score + " you win a " + message);
        console.log("game over");
        // Reset the game state and variables
        score = 0;
        angle = 0;
        direction = 1;
        stickAngle = Math.PI / 2;
        stickX = circleX;
        stickX = circleX;
        stickY = canvas.height - stickLength;
        stickFired = false;
        stickHit = false;
        hitSticks = [];
    }
    // Define a function to update the game logic
    function update() {
        // Update the angle of the circle based on the direction and speed
        angle += direction * rotationSpeed;
        // Randomly change the direction of the circle rotation with some probability
        if (Math.random() < rotationChangeProbability) {
            direction = -direction;
        }
        // If the stick is fired and has not hit anything yet
        if (stickFired && !stickHit) {
            // Update the position of the stick based on the speed and angle
            //stickX += stickSpeed * Math.cos(stickAngle);
            stickY -= stickSpeed; //* Math.sin(stickAngle);
            // Check if the stick has reached the top of the screen
            if (stickY < 0) {
                // Reset the stick state and position
                stickFired = false;
                stickHit = false;
                stickX = circleX;
                stickY = canvas.height;
            }
            // Check if the stick has hit the circle
            var dx = stickX - circleX;
            var dy = stickY - circleY;
            var distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < circleRadius) {
                // Set the stick state to hit
                //stickHit = true;
                stickX = circleX;
                stickY = canvas.height - stickLength;
                stickFired = false;
                stickFired = false;
                // Calculate the relative angle of the stick to the circle
                var relativeAngle = Math.atan2(dy, dx) - angle;
                var tolerance = stickWidth;
                // Check if the stick has hit another stick
                for (var _i = 0, hitSticks_1 = hitSticks; _i < hitSticks_1.length; _i++) {
                    var hitStick = hitSticks_1[_i];
                    //if (Math.abs(relativeAngle - hitStick) < Math.PI / 180)
                    var compAngle = Math.floor((relativeAngle + 10) * 100);
                    var hitComp = Math.floor((hitStick + 10) * 100);
                    lastMessage = "angle" + compAngle + " hit" + hitComp;
                    if (compAngle > hitComp - tolerance &&
                        compAngle < hitComp + tolerance) {
                        gameOver();
                        return; // Exit the update function
                    }
                }
                // Add the relative angle of the stick to the hitSticks array
                hitSticks.push(relativeAngle);
                // Increment the score
                score++;
            }
        }
    }
    // Define a function to render the game graphics
    function render() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawSky(ctx);
        // Draw the circle
        drawCircle();
        // Draw the sticks that hit the circle
        for (var _i = 0, hitSticks_2 = hitSticks; _i < hitSticks_2.length; _i++) {
            var hitStick = hitSticks_2[_i];
            var drawAngle = angle + hitStick;
            drawStick(circleX + Math.cos(drawAngle) * circleRadius, circleY + Math.sin(drawAngle) * circleRadius, drawAngle);
            // drawStick(circleX +( Math.cos(drawAngle) *50), circleY+(Math.sin(drawAngle)*50 ), drawAngle)
        }
        // Draw the current stick
        drawStick(stickX, stickY, stickAngle);
        // Draw the score
        ctx.font = "24px Arial";
        ctx.fillStyle = "white";
        var display = "" + score;
        ctx.fillText(display, circleX - 6 * display.length, circleY);
        //ctx.fillText(lastMessage, 10, 70);
    }
    // Define a function to handle the game loop
    function gameLoop() {
        // Update the game logic
        update();
        // Render the game graphics
        render();
        // Request the next animation frame
        requestAnimationFrame(gameLoop);
    }
    // Define a function to handle the mouse click or touch event
    function handleClick() {
        // If the stick is not fired yet
        if (!stickFired) {
            // Set the stick state to fired
            stickFired = true;
        }
    }
    // Add an event listener for the mouse click or touch event
    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("touchstart", handleClick);
    // Start the game loop
    gameLoop();
}
//gameoverlay.classList.add("hidden");
function closeOverlay() {
    document.getElementById("overlay").classList.add("hidden");
    startGame();
}

