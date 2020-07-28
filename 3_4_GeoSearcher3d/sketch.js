// SET URLs BASED ON INPUTS
// FB search URL
let placeName = 'hospital';
let pages = 15;
let itr = 0;
let fbUrl = "https://graph.facebook.com/v7.0/search?type=place&q=" + placeName + "&fields=id%2Cname%2Clocation%2Clink%2Ccheckins&access_token="
// Mapbox URL
let mapUrl = "https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/0,0,1,0,0/1024x512@2x?access_token="
let zoom = 1.0;
// Check Valuess
console.log(fbUrl);
console.log(mapUrl);
// Data holders
var locationData = [];
let mapImg;

// GET 3D LOCATION: Converts lat and long to 3d coordinates
function get3dLocation(radius, lat, lon) {
    var phi = (90 - lat) * (Math.PI / 180),
        theta = (lon + 180) * (Math.PI / 180),
        x = -((radius) * Math.sin(phi) * Math.cos(theta)),
        z = ((radius) * Math.sin(phi) * Math.sin(theta)),
        y = ((radius) * Math.cos(phi));
    return createVector(x, y, z);
}

// DRAW LOCATION: Encapsulates several graphics based on the location
function drawLocation(loc, r) {
    let lat = loc.location.latitude;
    let long = loc.location.longitude
    //calc centres  
    vecStart = get3dLocation(100, lat, long);
    vecEnd = get3dLocation(100+20*r, lat, long);
    vecInner = get3dLocation(45, lat, long);
    vecOuter= get3dLocation(550, lat, long);
    
    //draw circles
    stroke(255, 0, 255, 100);
    noStroke();

    // draw far away stars
    push();
    fill(255, 0, 135, 4);
    rotate(-frameCount*.004);
    rotate(200);
    translate(vecOuter.x, vecOuter.y, vecOuter.z);
    sphere(8.*r, 20, 20);
    fill(255, 100, 235, 10);
    sphere(1.*r, 20, 20);
    pop();
    push()
    fill(255, 100, 235, 10);
    rotate(-400);
    rotate(-frameCount*.006);
    translate(vecOuter.x, vecOuter.y, vecOuter.z);
    sphere(.41*r, 20, 20);
    fill(155, 60, 235, 20);
    sphere(.21*r, 20, 20);
    pop();





    // draw locations
    fill(255, 0, 255, 50);
    push();
    translate(vecStart.x, vecStart.y, vecStart.z);
    sphere(2, 10, 10);
    pop();
    push();
    fill(255, 0, 135, 150);
    translate(vecEnd.x, vecEnd.y, vecEnd.z);
    sphere(r*.5, 20, 20);
    pop();

    // draw inner-planet spheres
    push();
    fill(255, 0, 135, 150);
    translate(vecInner.x, vecInner.y, vecInner.z);
    sphere(.2*r, 20, 20);
    pop();



    push();
    stroke(255, 0, 255, 50);
    line(vecStart.x, vecStart.y, vecStart.z, vecEnd.x, vecEnd.y, vecEnd.z);
    pop();

}

// PRELOAD: p5 built-in function that executes before setup - load assets here to ensure they're ready at runtime.
function preload()
{
    mapImg = loadImage('earthMask.jpg');
}

//// SETUP: Function called by P5 that executes before the drawing loop. Put all of your setup code here.
async function setup() {

    createCanvas(1080, 1080, WEBGL);
    pg = createGraphics(1080, 1080, WEBGL);
// uncomment to render the date from the url instead of the .json file
    //await loadJSON(fbUrl, gotData);
    loadData();
    createSliders();
    translate(width/2., height/2.);
    imageMode(CENTER);
    //image(mapImg,0,0);
    orbitControl();
}

// GOT DATA: Custom callback function that happens once our loadJSON() function returns a result.
function gotData(data)
{
    console.log(data);
    for (var i = 0; i < data.data.length; i++)
    {
        id = data.data[i].id;
        locationData.push(data.data[i]);
    }

    if (itr < pages) {
        url = data.paging.next;
        loadJSON(url, gotData);
    }
    else {
        console.log('LOCATIONS RETREIVED');
        console.log(locationData);
    }
    itr++

}

// DRAW SPHERE: Draws a sphere.
function drawSphere() {
    stroke(255);
    fill(255, 0, 255, 80);
    push();
    translate(0, 0, 0);
    sphere(100, 100, 100);
    pop();

 }
// DRAW BACKGROUND: draws bg.
function drawBackground() {
    background(40);
}

//// DRAW: Function called continuously in a loop by P5. Draw and update all contents of your graphics here.
function draw() {
    drawBackground();
    orbitControl();
    rotate(frameCount * 0.002);
    drawSphere();
    for (var i = 0; i < locationData.length; i++)
    {
        //console.log("Drawing: " + locationData[i].name);
        radius = map(locationData[i].checkins, checkInMin.value(), checkInMax.value(), rMin.value(), rMax.value());
        drawLocation(locationData[i], radius);
    }

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
    else if (key === 's') {
        saveData();
    }
    else if( key === 'l')
    {
        loadData();
    }

    return false; //need to ahve this for some browsers
}


//// SAVE DATA: Save the data to file.
function saveData()
{
    saveJSON(locationData, 'lastSearch');
    console.log('Saved ' + placeName +'.json');
}
//// LOAD DATA: load the data from file.
function loadData()
{
    loadJSON('lastSearch.json', loadedData);
}
//// LOADED DATA: callback that happens after the LoadJSON() has loaded the file.
function loadedData(data)
{
    console.log("Loaded...");
    console.log(data);
    locationData = data;

}

// CREATE SLIDERS: Create sliders for dynamic control of your design.
function createSliders() {
  rMin = createSlider(.1, 10, 1, 1);
  rMin.position(20, height + 40);
  createP('Radius Min').position(20, height);

  rMax = createSlider(1, 20, 6, 1);
  rMax.position(20, height + 100);
  createP('Radius Max').position(20, height+60);

  checkInMin = createSlider(10, 10000, 100, 1);
  checkInMin.position(20, height + 160);
  createP('Check In Min').position(20, height+120);

  checkInMax = createSlider(100, 500000, 100000, 1);
  checkInMax.position(180, height + 40);
  createP('Check In Max').position(180, height);

}

