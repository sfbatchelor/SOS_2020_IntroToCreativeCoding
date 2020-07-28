
//// SETUP: Function called by P5 that executes before the drawing loop. Put all of your setup code here.
function setup() {
    createCanvas(600, 600);
    console.log('hello');
    background(100);
}

//// DRAW: Function called continuously in a loop by P5. Draw and update all contents of your graphics here.
function draw() {


    //mouseIsPressed, mouseX and mouseY  are special built-in variables used by P5 for speed of use. They specify if the mouse was pressed and the current screen coordinates coordinates of the mouse.
    if (mouseIsPressed) {
        if(mouseButton === LEFT)
        {
            // function to draw an ellipse
            ellipse(mouseX, mouseY, 80, 80);
        }
        else if (mouseButton === CENTER)
        {
            // function to draw a background 
            background(100);
        }
    }

}


//// KEY RELEASED: Callback function whenever a key is released. You can register user input here.
function keyReleased()
{
    // keyCode is a special built-in variable of P5. It contains the key that was just pressed. 
    // in this example we are saving the screen to file and naming it with the current timestamp.
    if(keyCode === ENTER)
    {
        m = month();
        d = day();
        y = year();
        h = hour();
        mi = minute();
        se = second();
        save(y + '.' + m + '.' + d + '_' + h + '.' + mi + '.' + se + '.jpg');
    }

    return false; //need to have this for some browsers
}