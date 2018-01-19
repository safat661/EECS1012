var TARGET_SIZE = 16;
var startTime, intervalID;
var rescue, target, direction, radarRange, context;

function start() {
    var canvas = document.getElementById("searchArea");
    canvas.height = window.prompt("Search area height:", canvas.height);

    rescue = {
        x: canvas.width / 2,
        y: canvas.width / 2
    };
    target = {
        x: canvas.width * Math.random(),
        y: canvas.height * Math.random()
    };

    direction = {
        dx: 1,
        dy: 1
    };
    radarRange = parseInt(document.getElementById("radar").value);

    context = canvas.getContext('2d');
    startTime = (new Date()).getTime();
    intervalID = setInterval(simulate, 1);
}

function simulate() {
    clear();
    drawTarget();
    drawRescue();
    updateProgress();
    if (found()) {
        clearInterval(intervalID);
    } else {
        if (xBoundary()) direction.dx = -direction.dx;
        if (yBoundary()) direction.dy = -direction.dy;
        rescue.x += direction.dx;
        rescue.y += direction.dy;
    }
}

function clear() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

function drawTarget() {
    context.beginPath();
    context.lineWidth = "4";
    context.strokeStyle = "red";
    context.rect(target.x, target.y, TARGET_SIZE, TARGET_SIZE);
    context.stroke();
}

function drawRescue() {
    context.beginPath();
    context.fillStyle = "#0000ff";
    // context.arc(x-center,y-center,radius,startAngle,endAngle,counterclockwise);
    context.arc(rescue.x, rescue.y, radarRange, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
}

/**
 * Returns true if the x coordinate is outside the canvas boundaries
 */
function xBoundary() {
    console.log("rescue.x + radarRange = " + (rescue.x + radarRange));
    return ((rescue.x - radarRange) <= 0 || (rescue.x + radarRange) >= context.canvas.width);
}

/**
 * Returns true if the y coordinate is outside the canvas boundaries
 */
function yBoundary() {
    console.log("rescue.y + radarRange = " + (rescue.y + radarRange));
    return ((rescue.y - radarRange) <= 0 || (rescue.y + radarRange) >= context.canvas.height);
}

function updateProgress() {
    var elapsed = document.getElementById("elapsed");
    elapsed.innerHTML = Math.floor(((new Date()).getTime() - startTime) / 1000);

    var distance = document.getElementById("distance");
    distance.innerHTML = Math.floor(toTarget());
}

function toTarget() {
    return Math.sqrt(Math.pow(Math.abs(target.x - rescue.x), 2) + Math.pow(Math.abs(target.y - rescue.y), 2));
}

function found() {
    if ((toTarget() - radarRange - TARGET_SIZE) <= 0) {
        return true;
    } else {
      return false;
    }
}