let game;//en esta variable se instancia el tablero
let wh=[];//guardo el ancho y alto del canvas
let colspos=[];//guardo el valor x final de cada columna
let x=0;
let y=0;
let mouse = false;
let player = false;//j1 false



let btn4InLine = document.getElementById("4InLine");
btn4InLine.addEventListener("click", function (e) {
  createGame(4);
});
let btn3InLine = document.getElementById("3InLine");
btn3InLine.addEventListener("click", function (e) {
  createGame(3);
});

let btn5InLine = document.getElementById("5InLine");
btn5InLine.addEventListener("click", function (e) {
  createGame(5);
});
function createGame(tipeGame) {
  modal.className += " hidden";
  wh = setUpCanvas();
  game = new Board(wh[0], wh[1], tipeGame);
  //una vez instanciado el tablero lomapeamos para detectar las columnas
  colspos[0]=game.posBoard+game.colW;
  for(let i=1;i<game.cols;i++){
    colspos[i]=colspos[i-1]+game.colW;
  }
}



//Ver que el click se de dentro de la ficha del jugador 
canvas.addEventListener('mousedown', function(evento){
  let rect=canvas.getBoundingClientRect();//devuelve el tamaño del canvas y su posición relativa respecto a la ventana de visualización
  let x=evento.clientX - rect.left;//posición x dentro del elemento.
  let y=evento.clientY - rect.top;//posición y dentro del elemento.
  console.log("valor del click en x:" +x);
  console.log("valor del click en y"+y);
  mouse = true;
  
})

canvas.addEventListener('mousemove', function(evento){
  let rect=canvas.getBoundingClientRect();
      let x2=evento.clientX - rect.left;
      let y2=evento.clientY -rect.top;
      if(mouse===true){ 
      drawLine(x,y,x2,y2);
      x=x2;
      y=y2;     
      console.log(x2);
      console.log(y2);  
      }
});

canvas.addEventListener('mouseup', function(evento){
  let rect=canvas.getBoundingClientRect();
    if(mouse===true){
        let x2=evento.clientX - rect.left;
        let y2=evento.clienty -rect.top;
        drawLine(x,y,x2,y2);
        x=0;
        y=0;
        mouse=false;
    }
   
  }
);

//Funcion que crea una secuencia de circulos entre 2 puntos de la pantalla
function drawLine(x1,y1,x2,y2){
  ctx.beginPath();
 
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);

  ctx.closePath();
}


canvas.addEventListener("click",(e)=>{
  let xClick=e.offsetX;
  //console.log(xClick);
  if(xClick>game.posBoard && xClick<(wh[0]-game.posBoard)){//si se encuentra dentro del tablero el click
    for(let i=0;i<colspos.length;i++){
      if(xClick<colspos[i]){
        console.log("columna: " + (i+1));
        break;
      }
    }
  }
  
})