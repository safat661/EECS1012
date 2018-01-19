var id = null;
var firstTime = -1;

/* Array of JSON objects representing geocache locations */
var geocaches = [{
    "latitude": 43.773003,
    "longitude": -79.503557,
    "description": "Vari Hall"
}, {
    "latitude": 43.772204,
    "longitude": -79.504516,
    "description": "Ross Building South"
}, {
    "latitude": 43.773665,
    "longitude": -79.504811,
    "description": "Lassonde Building"
}];
var currentCache;
currentCache = 0;

/* Array of GPS coordinates and their cooresponding pixel coordinates on the image of the map */
var gps_coords = [{
    "latitude": 43.772569,
    "longitude": -79.506285,
    "description": "Bergeron Center"
}, {
    "latitude": 43.774287,
    "longitude": -79.502528,
    "description": "York Lanes"
}];
var px_coords = [{
    "x": 231,
    "y": 260
}, {
    "x": 786,
    "y": 104
}];

function togglegps() {
    var button = document.getElementById("togglegps");
    if (navigator.geolocation) {
        if (id === null) {
            id = navigator.geolocation.watchPosition(showPosition, handleError, {
                enableHighAccuracy: true,
                timeout: 1000
            });
            button.innerHTML = "STOP GPS";
            firstTime = -1;
            console.log("GPS started..");
        } else {
            navigator.geolocation.clearWatch(id);
            id = null;
            button.innerHTML = "START GPS";
            console.log("GPS stopped..");
        }
    } else {
        alert("NO GPS AVAILABLE");
    }
    console.log("togglegps() function completed");
}

function handleError(error) {
    var errorstr = "Really unknown error";
    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorstr = "Permission deined";
            break;
        case error.POSITION_UNAVAILABLE:
            errorstr = "Permission unavailable";
            break;
        case error.TIMEOUT:
            errorstr = "Timeout";
            break;
        case error.UNKNOWN_ERROR:
            error = "Unknown error";
            break;
    }
    alert("GPS error " + error);
}

function showPosition(position) {
    console.log("showPosition function called");
    var latitude = document.getElementById("latitude");
    var longitude = document.getElementById("longitude");
    var now = document.getElementById("now");
    var debug = document.getElementById("debug");

    var gps = {
        "latitude": position.coords.latitude,
        "longitude": position.coords.longitude,
        "description": "Me"
    };
    var u;
    u = interpolate(gps_coords[0], gps_coords[1], px_coords[0], px_coords[1], gps);
    latitude.innerHTML = position.coords.latitude;
    longitude.innerHTML = position.coords.longitude;

    /* Position 'me' marker depending on x and y pixel values */
    var my_location = document.getElementById("me");
    my_location.style.top = (u.y - (my_location.offsetHeight / 2)) + "px";
    my_location.style.left = (u.x - (my_location.offsetWidth / 2)) + "px";

    if (firstTime < 0) {
        firstTime = position.timestamp;
    }
    now.innerHTML = position.timestamp - firstTime;
}

function interpolate(gps1, gps2, u1, u2, gps) {
    var u = {
        "x": 0,
        "y": 0
    }; // Pixel coordinates on image
    u.x = u1.x + (u2.x - u1.x) * (gps.longitude - gps1.longitude) / (gps2.longitude - gps1.longitude);
    u.y = u1.y + (u2.y - u1.y) * (gps.latitude - gps1.latitude) / (gps2.latitude - gps1.latitude);
    return u;
}

function updateCache() {
    currentCache = (currentCache + 1) % geocaches.length;
    showCache();
}

function showCache() {
    var z;
    z = interpolate(gps_coords[0], gps_coords[1], px_coords[0], px_coords[1], geocaches[currentCache]);

    /* Position 'target' marker depending on x and y pixel values */
    var cache_location = document.getElementById("target");
    cache_location.style.top = (z.y - (cache_location.offsetHeight / 2)) + "px";
    cache_location.style.left = (z.x - (cache_location.offsetWidth / 2)) + "px";
}