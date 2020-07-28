// SET URLs BASED ON INPUTS
// FB search URL
let placeName = 'areana';
let pages = 5;
let itr = 0;
let fbUrl = "https://graph.facebook.com/v7.0/search?type=place&q=" + placeName + "&fields=id%2Cname%2Clocation%2Clink%2Ccheckins&access_token="
// Mapbox URL
let mapUrl = "https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/0,0,1,0,0/1024x512?access_token="
let zoom = 1.0;
// Check Valuess
console.log(fbUrl);
console.log(mapUrl);
// Data holders
var locationData = [];
let mapImg;


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
function drawLocation(loc , r)
{
    let lat = loc.location.latitude;
    let long = loc.location.longitude
    //calc centres  
    cx =  mercX(long) - mercX(0);
    cy =  mercY(lat) - mercY(0);
    //draw circles
    stroke(255, 0, 255, 100);
    fill(255, 0, 255, 50);
    ellipse(cx, cy, r, r);

    // draw info overlays if mouse is near
    if (abs((mouseX - width / 2.) - cx) < r / 2. && abs((mouseY - height / 2.) - cy) < r / 2.) {
        console.log("YES");
        stroke(255, 0, 255, 200);
        fill(255, 0, 255, 100);
        textSize(20);
        text(loc.name, cx, cy);

    }
}

// PRELOAD: p5 built-in function that executes before setup - load assets here to ensure they're ready at runtime.
function preload()
{
    mapImg = loadImage(mapUrl);
}

//// SETUP: Function called by P5 that executes before the drawing loop. Put all of your setup code here.
async function setup() {

    await loadJSON(fbUrl, gotData);
   // loadData();
    createCanvas(1024, 512);
    createSliders();
    translate(width/2., height/2.);
    imageMode(CENTER);
    image(mapImg,0,0);
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

    if(itr < pages)
    {
        url = data.paging.next;
        loadJSON(url, gotData);
    }
    else{
        console.log('LOCATIONS RETREIVED');
        console.log(locationData);
    }
    itr++

 }

//// DRAW: Function called continuously in a loop by P5. Draw and update all contents of your graphics here.
function draw() {
    background(0);
    translate(width / 2., height / 2.);
    imageMode(CENTER);
    image(mapImg,0,0);
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

