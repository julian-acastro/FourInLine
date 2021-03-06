var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
let visor = document.getElementById("timerContainer");
let img = new Image();
img.src = "img/none.png";
let img1;
let img2;

//Setea las fichas con las imagenes segun corresponda
function setImgs(opc) {
  switch (opc) {
    case 1:
      img1 = new Image();
      img1.src = "img/j1.png";
      img2=new Image();
      img2.src = "img/j2.png";
      break;
    case 2:
      img1 = new Image();
      img1.src = "img/j1opc2.png";
      img2=new Image();
      img2.src = "img/j2opc2.png";
      break;
    case 3:
      img1 = new Image();
      img1.src = "img/j1opc3.png";
      img2=new Image();
      img2.src = "img/j2opc3.png";
      break;
  }
}

//Dibuja el tablero (fichas con otro valor) y las fichas con las imagenes
function printPieces(x1, y1, rowH, name) {
  let source;
  switch (name) {
    case "none":
      source = img;
      break;
    case "j1":
      source = img1;
      break;
    case "j2":
      source = img2;
      break;
  }
  
  ctx.drawImage(source, x1, y1, rowH, rowH);
}


function setUpCanvas() {
  canvas.classList.remove("hidden");
  visor.classList.remove("hidden");
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

//Dibuja texto en el lienzo
function printText(xv, yv, text,colorFill, colorStroke) {
  ctx.beginPath();
  ctx.fillStyle = colorFill; //color de relleno
  ctx.font = "bold 40px arial"; //estilo de texto
  ctx.textAlign = "center";
  ctx.fillText(text, xv, yv); //texto con método fill
  ctx.strokeStyle = colorStroke;
  ctx.strokeText(text, xv, yv);
  ctx.stroke();
}

// Limpia el lienzo (como restablecer el ancho / alto, destruir el elemento del lienzo y luego volver a crearlo, etc.)
function cleanCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
}


