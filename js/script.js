// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
const citiesArray = []; 


function initMap() {
    let geocoder = new google.maps.Geocoder;
    let infowindow = new google.maps.InfoWindow;
    

    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 54.6996063, lng: -113.7061841 },
      zoom: 4,
      mapTypeId: "roadmap",
    });
    var noPoi = [
      {
          featureType: "poi",
          stylers: [
            { visibility: "off" }
          ]   
        }
    ]
    map.setOptions({styles: noPoi});
    

   

    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
  
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });
  
    let markers = [];
  
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
  
      if (places.length == 0) {
        return;
      }
  
      // Clear out the old markers.
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];
  
      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();
  
      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }
  
        const icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };
  
        // // Create a marker for each place.
        // markers.push(
        //   new google.maps.Marker({
        //     map,
        //     icon,
        //     title: `this is a place ${place.name}`,
        //     position: place.geometry.location,
        //   })
        // );
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
      
    });
    

    google.maps.event.addListener(map, "click", (e) => {

    
   google.maps.SymbolPath.CIRCLE
    //map.setZoom(10);
    new google.maps.Marker({
      position: e.latLng,
      map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: "red",
        fillOpacity: 0.2,
        strokeColor: "white",
        strokeWeight: 0.5,
        scale: 9,
      },
    });
    geocodeLatLng(geocoder, map, infowindow, e.latLng);
  });
 



function geocodeLatLng(geocoder, map, infowindow, latlng) {

geocoder.geocode({
  'location': latlng
}, function(results, status) {
  if (status === google.maps.GeocoderStatus.OK) {
    if (results[1]) {
      let marker = new google.maps.Marker({
        position: latlng,
        map: map
      });
      infowindow.setContent(results[1].address_components[2].short_name);
      citiesArray.push({name: results[1].address_components[2].short_name});
      localStorage.setItem('cities', JSON.stringify(citiesArray))

      infowindow.open(map, marker);
    } else {
      window.alert('No hay resultados');
    }
  } else {
    window.alert('Geocoder failed due to: ' + status);
  }
});
}

}

const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_24aypq7';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      alert('Enviado!');
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});
  

