mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhcmxvdHRlYmtnIiwiYSI6ImNscjlvYzM1OTA1MW8ya24xbjdmNHRhaWkifQ.H2WW8WJZiHWFksxymyigTw'; //Add default public map token from your Mapbox account
const map = new mapboxgl.Map({
 container: 'map', // map container ID
 style: 'mapbox://styles/charlottebkg/cltadlaho00nt01qkgei36fnn', // style URL
center: [-71.09647636158911,
          42.386864529111335], // starting position [lng, lat]
zoom: 17, // starting zoom
});
// Add zoom and rotation controls, position controls
map.addControl(new mapboxgl.NavigationControl(), 'bottom-left');
map.addControl(new mapboxgl.FullscreenControl(), 'bottom-left');
//Adding data for pop-ups
// map.on('load', () => {
//     map.addSource('resume', {
//         'type': 'geojson',
//         'data': 'https://raw.githubusercontent.com/charlbkg/GGR472Lab3/main/Resume.geojson'
//     }
//     );
    
//     // Add a layer showing the places.
//     // I wanted to keep the symbology from my mapbox style containing a tileset of the resume geoJSON,
//     //but still add the popup functionality. So I loaded the same data for the tileset at a geoJSON and 
//     //made the points transparent. This way the symbology of the style shows, and the pop-up still works.
//     map.addLayer({
//         'id': 'resume-points',
//         'type': 'circle',
//         'source': 'places',
//         'paint': {
//             'circle-color': 'black',
//             'circle-radius': 20,
//             'circle-stroke-width': 2,
//             'circle-stroke-color': 'black'
//         }
//     });
// });


    map.on('load', () => {
      map.addSource('resume', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/charlbkg/WEBMAPCV/refs/heads/main/Resume2.geojson' // make sure this path is correct
      });

      // Simple circle layer
      map.addLayer({
        id: 'resume-points',
        type: 'circle',
        source: 'resume',
        paint: {
          'circle-radius': 6,
          'circle-color': '#ff7e5f',
          'circle-stroke-width': 1.5,
          'circle-stroke-color': '#fff'
        }
      });

      // Click handler for popups
      map.on('hover', 'resume-points', (e) => {
        const feature = e.features[0];
        const props = feature.properties;

        // Format Description into bullet points
        const bullets = props.Description
          ? props.Description.split(',')
              .map(item => item.trim())
              .filter(item => item.length > 0)
              .map(item => `<li>${item}</li>`)
              .join('')
          : '';

        // Build popup HTML
        const html = `
            <div class="resume-popup">
            <strong>${props.Name || 'Untitled'}</strong>
            <div class="exp-type">Experience type: ${props.ExperienceType || 'N/A'}</div>
            <div class="year">Year: ${props.Year || 'N/A'}</div>
            ${bullets ? `<ul>${bullets}</ul>` : ''}
          </div>
        `;

        new mapboxgl.Popup({ offset: 12 })
          .setLngLat(e.lngLat)
          .setHTML(html)
          .addTo(map);
      });

      // Change cursor when hovering
      map.on('mouseenter', 'resume-points', () => map.getCanvas().style.cursor = 'pointer');
      map.on('mouseleave', 'resume-points', () => map.getCanvas().style.cursor = '');
    });

    // Handle tree node clicks
    document.querySelectorAll('.zoom-node').forEach(node => {
      node.addEventListener('click', () => {
        const lat = parseFloat(node.getAttribute('data-lat'));
        const lng = parseFloat(node.getAttribute('data-lng'));
        const zoom = parseFloat(node.getAttribute('data-zoom'));
        map.flyTo({ center: [lng, lat], zoom: zoom, essential: true });

        // Optional: add popup or marker
        // new mapboxgl.Popup()
        //   .setLngLat([lng, lat])
        //   .setHTML(`<strong>${node.G}</strong>`)
        //   .addTo(map);
      });
    });

// Create a popup, but don't add it to the map yet.
// const popup = new mapboxgl.Popup({
//     closeButton: false,
//     closeOnClick: false
// });
// map.on('mouseenter', 'places-points', (e) => {
//     map.getCanvas().style.cursor = 'pointer';

    // Copy coordinates array.
    // const coordinates = e.features[0].geometry.coordinates.slice();
    // const description = e.features[0].properties.Description;
    // console.log(coordinates)
    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    // }
    // Populate the popup and set its coordinates
    // based on the feature found.
//     popup.setLngLat(coordinates).setHTML(description).addTo(map);
// // });

// map.on('mouseleave', 'places-points', () => {
//     map.getCanvas().style.cursor = '';
//     popup.remove();
// });

//Create event listener to fly to location when the button is clicked, and function that cycles through each point
// document.getElementById('About us').addEventListener('click', function () {
//     // Back to the first coordinate.
//     map.flyTo({
//         zoom: 17,
//         center: [-72.09647636158911,
//           45.386864529111335],
//     });
// });

// fetch('Resume.geojson')
//       .then(response => response.json())
//       .then(data => createList(data));

// const data = JSON.parse(jsonData);
//     const listContainer = document.getElementById('listContainer');
//     const ul = document.createElement('ul'); // Create an unordered list

//     data.forEach(item => {
//         const li = document.createElement('li'); // Create a list item
//         li.textContent = item.ExperienceType; // Set the text content from the JSON data
//         ul.appendChild(li); // Append the list item to the unordered list
//     });

//     listContainer.appendChild(ul); // Append the unordered list to the container