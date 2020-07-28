// SET URLs BASED ON INPUTS
placeName = 'Protest';
pages = 2;
itr = 0;
url = "https://graph.facebook.com/v7.0/search?type=place&q=" + placeName + "&fields=id%2Cname%2Clocation&access_token=EAAJZAaZBMsWvABABMNnwmKZA3kLtdMIuIBAa7tUShbJOdcsaLkoYQ0vZAd9AqDQSwZAZBAMnksPwQUOdseBAp19hIYQDKmZCpvyFf5DrHRlRhCUu86rnfB0ReDJGBUD6gZCc8o1dZCHK0pZBBTKyZBygzZCIOAvnd7vZAaAUZD"
console.log(url);

//// SETUP: Function called by P5 that executes before the drawing loop. Put all of your setup code here.
async function setup() {
    noCanvas();
    await loadJSON(url, gotData);
}

// GOT DATA: Custom callback function that happens once our loadJSON() function returns a result.
function gotData(data)
{
    console.log(url);
    console.log(data);
    for (var i = 0; i < data.data.length; i++)
    {
        id = data.data[i].id;
        createElement('h1', data.data[i].name);
        createP('Latitude: ' + data.data[i].location.latitude + ' Longitude: ' + data.data[i].location.longitude);
        console.log(id);
        console.log(data.data[i].location.latitude, data.data[i].location.longitude);
    }

    if(itr < pages)
    {
        url = data.paging.next;
        loadJSON(url, gotData);
    }
    itr++

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

    return false; //need to have this for some browsers
}