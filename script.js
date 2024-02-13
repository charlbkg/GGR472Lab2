mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhcmxvdHRlYmtnIiwiYSI6ImNscjlvYzM1OTA1MW8ya24xbjdmNHRhaWkifQ.H2WW8WJZiHWFksxymyigTw'; //Add default public map token from your Mapbox account
const map = new mapboxgl.Map({
 container: 'my-map', // map container ID
 style: 'mapbox://styles/charlottebkg/clsexueex038t01o8cshrhdka', // style URL
 center: [-79.400831, 43.659723], // starting position [lng, lat]
 zoom: 15, // starting zoom
});
map.on('load', () => {
    //Add a data source containing GeoJSON data
    map.addSource('experience-trajectory', {
    type: 'geojson',
    data: {
    "type": "FeatureCollection",
    "features": [
    {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            [
              -79.41100385187077,
              43.651392223722894
            ],
            [
              -79.392242927534,
              43.67004272013182
            ],
            [
              -79.39856964482043,
              43.662406209739885
            ],
            [
              -79.39871677778092,
              43.663257715465534
            ],
            [
              -79.41302545815543,
              43.664721212714
            ],
            [
              -79.40073985598264,
              43.65963873272145
            ],
            [
              -79.39816502917994,
              43.65870734157346
            ],
            [
              -79.39875356102075,
              43.66237959999151
            ],
            [
               -79.39508797629006,
            43.66177701729015
              ]
            
          ],
          "type": "LineString"
        }
    }
    ]
    }
    });
    map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'experience-trajectory',
        'layout': {
        'line-join': 'round',
        'line-cap': 'round'
        },
        'paint': {
        'line-color': '#888',
        'line-width': 8
        }
        });
        // add a line layer with line-dasharray set to the first value in dashArraySequence
map.addLayer({
    type: 'line',
    source: 'experience-trajectory',
    id: 'line-dashed',
    paint: {
    'line-color': 'yellow',
    'line-width': 6,
    'line-dasharray': [0, 4, 3]
    }
    });
     
    // technique based on https://jsfiddle.net/2mws8y3q/
    // an array of valid line-dasharray values, specifying the lengths of the alternating dashes and gaps that form the dash pattern
    const dashArraySequence = [
    [0, 4, 3],
    [0.5, 4, 2.5],
    [1, 4, 2],
    [1.5, 4, 1.5],
    [2, 4, 1],
    [2.5, 4, 0.5],
    [3, 4, 0],
    [0, 0.5, 3, 3.5],
    [0, 1, 3, 3],
    [0, 1.5, 3, 2.5],
    [0, 2, 3, 2],
    [0, 2.5, 3, 1.5],
    [0, 3, 3, 1],
    [0, 3.5, 3, 0.5]
    ];
     
    let step = 0;
     
    function animateDashArray(timestamp) {
    // Update line-dasharray using the next value in dashArraySequence. The
    // divisor in the expression `timestamp / 50` controls the animation speed.
    const newStep = parseInt(
    (timestamp / 50) % dashArraySequence.length
    );
     
    if (newStep !== step) {
    map.setPaintProperty(
    'line-dashed',
    'line-dasharray',
    dashArraySequence[step]
    );
    step = newStep;
    }
     
    // Request the next frame of the animation.
    requestAnimationFrame(animateDashArray);
    }
     
    // start the animation
    animateDashArray(0);
    });
   