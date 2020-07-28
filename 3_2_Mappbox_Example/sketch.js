// SET URLs BASED ON INPUTS
//let url = "https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/static/-0.12,51.5,13,0,0/1024x512?access_token=pk.eyJ1Ijoic2ZiYXRjaGVsb3IiLCJhIjoiY2tjZDdmZmNvMGJ1YjJxcDIyc2NtMnJheCJ9.IF6EZOAWqwqcbmVj_Hx-NQ"
let url = "https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1Ijoic2ZiYXRjaGVsb3IiLCJhIjoiY2tjZDdmZmNvMGJ1YjJxcDIyc2NtMnJheCJ9.IF6EZOAWqwqcbmVj_Hx-NQ"
let zoom = 1.0;
//london
let londonLat = 51.5074;
let londonLon = -0.1278;
//NY
let NYLat = 40.7128;
let NYLon = -74.0060; 
//Rio
let rioLat = -22.9068;
let rioLon = -43.1729; 
//New Deli  
let NDLat = 28.6139;
let NDLon = 77.2090; 



let mapImg;
let r = 5.;

// MERC X: Helper function to convert longitude to x screen coordinate. (Using Mercator projection)
function mercX(lon) {
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}

// MERC Y: Helper function to convert longitude to y screen coordinate. (Using Mercator projection)
function mercY(lat) {
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}

// DRAW LOCATION: Encapsulates the drawing of a location
function drawLocation(lat, long)
{
    cx =  mercX(long) - mercX(0);
    cy =  mercY(lat) - mercY(0);
    stroke(255, 0, 255);
    fill(255, 0, 255, 200);
    ellipse(cx, cy, r, r);
}

// PRELOAD: p5 built-in function that executes before setup - load assets here to ensure they're ready at runtime.
function preload()
{
    mapImg = loadImage(url);

}

//// SETUP: Function called by P5 that executes before the drawing loop. Put all of your setup code here.
function setup() {
    createCanvas(1024, 512);
    translate(width/2., height/2.);
    imageMode(CENTER);
    image(mapImg,0,0);

    //london 
    drawLocation(londonLat, londonLon);
    //NY
    drawLocation(NYLat, NYLon);
    //Rio
    drawLocation(rioLat, rioLon);
    //ND`
    drawLocation(NDLat, NDLon);
}

//// DRAW: Function called continuously in a loop by P5. Draw and update all contents of your graphics here.
function draw() {
  
}


//// KEY RELEASED: Callback function whenever a key is released. You can register user input here.
function keyReleased()
{
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
    else if (key === ' ') {
        background(90);
    }

    return false; //need to ahve this for some browsers
}