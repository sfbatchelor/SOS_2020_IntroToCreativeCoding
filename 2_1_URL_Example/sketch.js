// SET GLOBAL VARIABLES
var yearsBack = 50;
var itr = 0;
var key = 'dsmqvW3GMsp2GJ4mho31MPjGJxxGNdD2';
var searchTerm = 'design';

// SET AN ARRAY OF URLs BASED ON HOW MANY YEARS BACK WE WANT DATA.
var url =[];
for(var i = 0; i < yearsBack; i++)
{
    url.unshift( 
    'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=' + searchTerm + ' AND pub_year:("' + (2019 - i) + '")&api-key=' + key);

}

//// SETUP: Function called by P5 that executes before the drawing loop. Put all of your setup code here.
async function setup() {
    noCanvas();
    // START LOADING DATA AND SET TIME INTERVAL TO NOT GET LOCKED OUT
    await loadJSON(url[itr], gotData);
    pullData = setInterval(function(){ loadURLs(); }, 7000);
}

// LOAD URLS: Custom callback function that every 7 secs ( as specified by setInterval() ).
async function loadURLs()
{
   await loadJSON(url[itr], gotData);

}
// GOT DATA: Custom callback function that happens once our loadJSON() function returns a result.
function gotData(data)
{
    // uncomment these to see them in your console output
    //console.log(url);
    //console.log(data);
    var frequency = data.response.meta.hits;
    console.log("'" + searchTerm + "' in year " + (2020 - yearsBack + itr) + ": " + frequency);
    var articles = data.response.docs;
    for(var i = 0; i < articles.length; i++)
    {
        createElement('h1', articles[i].headline.main);
        createP(articles[i].snippet);
    }
    itr++;
 }

//// DRAW: Function called continuously in a loop by P5. Draw and update all contents of your graphics here.
function draw() {
   if(itr+1 > url.length)
        clearInterval(pullData); //stops the setInterval() function from executing every 7 secs.
  
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