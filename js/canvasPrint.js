var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function printLine(x1, y1, x2, y2, width, color) {
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
}

function printPieces(x1, y1,rowH,name) {
  let backgroundImg = new Image;
  backgroundImg.src = "img/"+ name + ".png";
  backgroundImg.onload = function(){//Dibuja una imagen gradiente en el lienzo
  ctx.drawImage(backgroundImg,x1,y1,rowH,rowH);//ver coordenadas x e y
}
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

function printBoard(){
    let backgroundImg = new Image;
    backgroundImg.src = "img/background.jpg"
    backgroundImg.onload = function(){//Dibuja una imagen gradiente en el lienzo
    ctx.drawImage(backgroundImg,0,0,canvas.width,canvas.height);//ver coordenadas x e y

    }
}

function printText(xv, yv,text) {
  ctx.beginPath();
  ctx.fillStyle = "red"; //color de relleno
  ctx.font = "bold 60px arial"; //estilo de texto
  ctx.textAlign="center";
  ctx.fillText(text, xv, yv); //texto con método fill
  
}

