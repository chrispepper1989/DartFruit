// Define some constants for the game

let pauseGame = false;

function startGame(){

  const modal = document.getElementById("overlay") as HTMLDialogElement;



  const scoreDisplay = document.getElementById("score");
  const messageDisplay = document.getElementById("message");
  const topScoreDisplay = document.getElementById("topScoreTable");
  const topScores = [0, 0, 0, 0, 0];
  const topScoreNames = ["", "", "", "", ""];
  

  function updateHighScoreDisplay()
  {
    topScoreDisplay.innerHTML = "";
   
    for(let i = 0; i < topScores.length; ++i)
    {
      topScoreDisplay.innerHTML += `<li>${topScoreNames[i]} : ${topScores[i]}</li>`
    }
  }
  function updateHighScores(name:string, score:number)
  {
   
    for(let i = 0; i < topScores.length; ++i)
    {
      if(score > topScores[i])
      {
        topScores[i] = score;
        topScoreNames[i] = name;
        break;
        
      }
    }    
    updateHighScoreDisplay();
  }

  modal.addEventListener('close', (e) => {

    console.log(modal.returnValue); 
    updateHighScores(modal.returnValue, score);

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


  });


  function onWin() {


    let message: string; // declare a variable to store the message
  
    // assign points to some value between 5 and 40
    const points = score;
  
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
    console.log("game over");
    console.log(message); // print the message
 
    updateHighScoreDisplay();
    scoreDisplay.innerHTML = `${score}`;
    messageDisplay.innerHTML = message;

    modal.showModal();
    
   
    pauseGame = true;
    
  }
  
  closeOverlay();
  
  updateHighScoreDisplay();
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  
  // Set the canvas width and height to fill the window
  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight;
  
  const circleRadius = canvas.width / 5; // The radius of the circle (watermelon)
  const circleX = canvas.width / 2; // The x coordinate of the circle center
  const circleY = canvas.height / 2 - 50; // The y coordinate of the circle center
  const stickLength = 20; // The length of the stick (cocktail stick)
  const stickWidth = 8; // The width of the stick
  const stickSpeed = 10; // The speed of the stick when fired
  const rotationSpeed = 0.01; // The speed of the circle rotation
  const rotationChangeProbability = 0.01; // The probability of changing the rotation direction
  
  // Define some variables for the game state
  let angle = 0; // The current angle of the circle
  let direction = 1; // The current direction of the circle rotation (1 or -1)
  let score = 0; // The
   
  // The current angle of the stick
  let stickAngle = Math.PI / 2; // The stick starts at the bottom middle of the screen
  // The current position of the stick
  let stickX = circleX;
  let stickY = canvas.height - stickLength;
  // The current state of the stick
  let stickFired = false; // The stick is not fired yet
  let stickHit = false; // The stick has not hit anything yet
  
  // Define an array to store the angles of the sticks that hit the circle
  let hitSticks: number[] = [];
  
  // Define some colors for the sky gradient
  const skyColors = [
    "#87CEEB", // sky blue
    "#F0F8FF", // alice blue
    "#FFFAF0", // floral white
    "#FFD700", // gold
    "#FF4500" // orange red
  ];
  
  // Define a function that takes a canvas context and draws a sky background
  function drawSky(ctx: CanvasRenderingContext2D) {
    // Get the canvas width and height from the context
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
  
    // Create a linear gradient from top to bottom of the canvas
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
  
    // Add color stops for each sky color
    for (let i = 0; i < skyColors.length; i++) {
      // Calculate the position of the color stop between 0 and 1
      const position = i / (skyColors.length - 1);
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
    for (let i = 0; i < Math.PI * 2; i += Math.PI / 8) {
      for (
        let j = circleRadius * 0.6;
        j < circleRadius * 0.8;
        j += circleRadius / 10
      ) {
        let x = j * Math.cos(i);
        let y = j * Math.sin(i);
        ctx.beginPath();
        ctx.arc(x, y, circleRadius / 100, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    // Restore the context state
    ctx.restore();
  }
  
  // A function that draws a dart on a canvas
  function drawDart(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    angle: number
  ) {
    // Save the current context state
    ctx.save();
  
    // Translate and rotate the context to the given position and angle
    ctx.translate(x, y);
    ctx.rotate(angle + Math.PI); //* Math.PI / 180);
    ctx.translate(-6, 0);
  
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
  function drawStick(x: number, y: number, angle: number) {
    drawDart(ctx, x, y, angle);
  }
  
  function gameOver() {
   
    // Game over  
    onWin(); 
   
 
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
      let dx = stickX - circleX;
      let dy = stickY - circleY;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < circleRadius) {
        // Set the stick state to hit
        //stickHit = true;
        stickX = circleX;
        stickY = canvas.height - stickLength;
        stickFired = false;
        stickFired = false;
  
        // Calculate the relative angle of the stick to the circle
        let relativeAngle = Math.atan2(dy, dx) - angle;
        const tolerance = stickWidth;
  
        // Check if the stick has hit another stick
        for (let hitStick of hitSticks) {
          //if (Math.abs(relativeAngle - hitStick) < Math.PI / 180)
          const compAngle = Math.floor((relativeAngle + 10) * 100);
          const hitComp = Math.floor((hitStick + 10) * 100);
            
  
          if (
            compAngle > hitComp - tolerance &&
            compAngle < hitComp + tolerance
          ) {
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
    for (let hitStick of hitSticks) {
      const drawAngle = angle + hitStick;
      drawStick(
        circleX + Math.cos(drawAngle) * circleRadius,
        circleY + Math.sin(drawAngle) * circleRadius,
        drawAngle
      );
  
      // drawStick(circleX +( Math.cos(drawAngle) *50), circleY+(Math.sin(drawAngle)*50 ), drawAngle)
    }
    // Draw the current stick
    drawStick(stickX, stickY, stickAngle);
    // Draw the score
    ctx.font = "24px Arial";
    ctx.fillStyle = "white";
    const display = "" + score;
    ctx.fillText(display, circleX - 6 * display.length, circleY);
    //ctx.fillText(lastMessage, 10, 70);
  }
  
  // Define a function to handle the game loop
  function gameLoop() {
    if(!pauseGame)
    {
      // Update the game logic
      update();
      // Render the game graphics
      render();
     
    }
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
export function closeOverlay() {
 // document.getElementById("overlay").classList.add("hidden");
  const modal = document.getElementById("overlay") as HTMLDialogElement;  
  const input = document.getElementById('name') as HTMLInputElement;
  modal.close(input.value);
  pauseGame = false;

  //startGame();
}
