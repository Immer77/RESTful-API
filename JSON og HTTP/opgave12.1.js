// opgave12.1.js
//const fetch = require('node-fetch');
const earthquakeUrl = // https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php 
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson';


async function get(url){
    const respons = await fetch(url);
    if(respons.status !== 200){
        throw new Error("Status:" + respons.status);
    }

    return await respons.json();
}

let html = '<table>';

// Here we sort and generete the earthquake table
async function generateEarthquakeTable(titles) {
    if(titles.length > 0){
        let text = titles.toString().split(" ");
        if(text[1] > 5){
            for (let title of titles) {
                html += '<tr><td>' + title +
                    '</td></tr>\n';
            }
            
        }
    }
    document.body.innerHTML = html;
}

// Recursive function that goes through all the JSON objects and check if the property is the title
// Then pushes it on to the array that we later sort
function getFeatures(earthquake) {
    let arr = [];
    for(let property in earthquake){
        if(earthquake.hasOwnProperty(property)){
            if (typeof earthquake[property] == "object") {
                getFeatures(earthquake[property]);
            }else if(property === "title"){
                arr.push(earthquake[property]);
            }
        }
    }
    return generateEarthquakeTable(arr);
}


async function main(){
    let earthquakes;
    try {
        earthquakes = await get(earthquakeUrl);
        
    } catch (fejl) {
        console.log(fejl);
    }

    getFeatures(earthquakes);
    
}
main();