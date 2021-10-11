let game;//en esta variable se instancia el tablero
let wh=[];//guardo el ancho y alto del canvas
let colspos=[];//guardo el valor x final de cada columna
let mouse = false;
let turn;
let fichaJ1;
let fichaJ2;




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
  fichaJ2=game.j2Piece;
  fichaJ1=game.j1Piece;
  //
  //
  ///
  ///
  turn=fichaJ1;
  ///
  //
  ///
  //
  //

  //una vez instanciado el tablero lomapeamos para detectar las columnas
  colspos[0]=game.posBoard+game.colW;
  for(let i=1;i<game.cols;i++){
    colspos[i]=colspos[i-1]+game.colW;
  }
}



//detectar que el click se de dentro de la ficha del jugador 
canvas.onmousedown= function(e){
  let rect=canvas.getBoundingClientRect();
  let xClick=e.clientX - rect.left;//posición x dentro del elemento.
  let yClick=e.clientY - rect.top;//posición y dentro del elemento.
  if((turn.xv<xClick)&&((turn.xv+turn.rowH)>xClick)&&(turn.yv<yClick)&&((turn.yv+turn.rowH)>yClick)){//valida posicion de la ficha jugador
    mouse=true; 
  }
}

canvas.onmousemove = function(e){
  let rect=canvas.getBoundingClientRect();
      let x2=e.clientX - rect.left;
      let y2=e.clientY -rect.top;
      if(mouse===true){ 
        turn.xv=x2-(turn.rowH/2);//agarrar la ficha desde el centro
        turn.yv=y2-(turn.rowH/2);
        game.refresh();//limpia el tablero y lo vuelve a dibujar para no dibujar un "camino" fichas 
      }
};

canvas.onmouseup=function(e){
  
  let xClick=e.offsetX;
  
    if(mouse===true && xClick>game.posBoard && xClick<(wh[0]-game.posBoard)){//valido posicion dentro del tablero
      for(let i=0;i<colspos.length;i++){//recorre por columnas
        if(xClick<colspos[i]){        
          console.log("columna: " + (i+1));
          insertPiece(i,turn.player);
          break;
          
        }
      }
      mouse=false;
    }
    mouse=false;
  };



function insertPiece(numCol,player){

  
  let cantRows=game.matr[numCol].length;//cantidad de filas

  for(let i=0;i<cantRows;i++){//recorre por filas
    
    if (game.matr[numCol][i].player == 'none') {//si esta vacio
      i++; 
      
    }
   else{
    (game.matr[numCol][i-1]).player = fichaJ1.player;//fichaJ1.printPieces();//no se que parametros
   }
  }

}