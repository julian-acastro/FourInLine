var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function printLine(x1, y1, x2, y2, width, color) {
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
}

function printPieces(x1, y1, radius, color) {
  ctx.beginPath();
  ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
}

function setUpCanvas() {
  canvas.classList.remove("hidden");
  ctx.translate(0.5, 0.5);
  // Set display size (vw/vh).
  var sizeWidth = (100 * window.innerWidth) / 100,
    sizeHeight = ((100 * window.innerHeight) / 100 || 766) - 4;
  //Setting the canvas site and width to be responsive
  canvas.width = sizeWidth;
  canvas.height = sizeHeight;
  let wh = [sizeWidth, sizeHeight];
  return wh;
}

//window.onload = setUpCanvas();
