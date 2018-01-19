function updatePage() {
  var d = new Date();
  var day = d.getDay();
  var hour = d.getHours();
  var minutes = d.getMinutes();

  if (minutes < 30) {
    hour = hour - 1;
  }

  var block = "time" + day + ":" + hour;
  var c = document.getElementById(block);
  if ((lastTime != null) && (lastTime != c)) {
    lastTime.style.background = 'white';
  }

  if (c != null) {
    c.style.background = 'red';
  }

  lastTime = c;
}

function startUpdate() {
  updatePage();
  window.setInterval(updatePage, 10 * 1000);
}

var lastTime = null;
window.onload = startUpdate;