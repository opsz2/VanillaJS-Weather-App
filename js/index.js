var map;
var x = document.getElementById('userLocation');
var lat = -34.397;
var lng = 150.644;
var marker;

window.onload = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = 'Geolocation is not supported by this browser.';
  }
};

function showPosition(position) {
  lat = position.coords.latitude;
  lng = position.coords.longitude;

  map.panTo(new google.maps.LatLng(lat, lng));

  marker = new google.maps.Marker({
    position: { lat: lat, lng: lng },
    map: map,
    title: 'Your Location!'
  });

  x.innerHTML =
    'Location Information... Latitude: ' +
    position.coords.latitude +
    ', Longitude: ' +
    position.coords.longitude;

  getWeather();
}

function getWeather() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(JSON.parse(this.responseText));
      var res = JSON.parse(this.responseText);
      document.getElementById('weather').innerHTML =
        'Weather Description: ' +
        res.weather[0].description +
        '<br> Temperature: ' +
        res.main.temp;
    }
  };
  xhttp.open(
    'GET',
    'https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=INSERT_API_HERE',
    true
  );
  xhttp.send();
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: lat, lng: lng },
    zoom: 8
  });
}
