function init() {
    if (window.DeviceOrientationEvent) {
        document.getElementById("text").innerHTML = "Supports orientation events";
        window.addEventListener("deviceorientation", orientationCallback, true);
    } else {
        document.getElementById("text").innerHMTL = "No orientation event support";
    }
}

function orientationCallback(eventData) {
    document.getElementById("text").innerHTML = "Pitch: " + eventData.beta + " Tilt: " + eventData.gamma;

    var tilt = eventData.gamma;
    var pitch = eventData.beta;

    /* Clamps pitch and tilt values between -90 and 90 */
    if (pitch < -90) {
        pitch = -90;
    } else if (pitch > 90) {
        pitch = 90;
    }

    if (tilt < -90) {
        tilt = -90;
    } else if (tilt > 90) {
        tilt = 90;
    }

    /* Position cross to the center  */
    var d = document.getElementById("center");
    var x0 = (window.innerWidth - d.offsetWidth) / 2;
    var y0 = (window.innerHeight - d.offsetHeight) / 2;
    d.style.top = y0 + "px";
    d.style.left = x0 + "px";

    /* Position ball depending on pitch and tilt values */
    var c = document.getElementById("ball");
    var x = (window.innerWidth - d.offsetWidth) / 2;
    var y = (window.innerHeight - d.offsetHeight) / 2;
    var dx = x * tilt / 90;
    var dy = y * pitch / 90;
    c.style.top = y + dy + "px";
    c.style.left = x + dx + "px";
}

alert("javascript loaded");
window.onload = init;