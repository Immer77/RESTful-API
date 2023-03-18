// opgave12.1.js
const fetch = require('node-fetch');
const earthquakeUrl = // https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php 
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson';


async function get(url){
    const respons = await fetch(url);
    if(respons.status !== 200){
        throw new Error("Status:" + respons.status);
    }

    return await respons.json();
}

function generateEarthquakeTable(earthquakes) {
    let html = '<table>';
    for (earthquake of earthquakes) {
        console.log(earthquake);
        html += '<tr><td>' + earthquake.mag +
            '</td><td>' + earthquake.time +
            '</td><td>' + earthquake.geometry.coordinates +
            '</td></tr>\n';
    }
    html += '</table><br><div></div>';
    return html;
}


async function main(){
    let earthquakes;
    try {
        earthquakes = await get(earthquakeUrl);
        console.log(earthquakes.features);
    } catch (fejl) {
        console.log(fejl);
    }
    document.body.innerHTML = generateEarthquakeTable(earthquakes.features);
    

}
main();