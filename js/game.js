let game; //en esta variable se instancia el tablero
let wh = []; //guardo el ancho y alto del canvas
let colspos = []; //guardo el valor x final de cada columna
let mouse = false;
let tipeGameSelected = 0;
let turn;
let cantPieces;
let time = 60;


let playerJ1 = {
  piece: null,
  xv: 0,
  yv: 0,
  turns: 0//seteo cantidad de fichas
};
let playerJ2 = {
  piece: null,
  xv: 0,
  yv: 0,
  turns: 0
};


function endTime(xv,xy){

  document.getElementById('countdown').innerHTML = time;

  if(time == 0){
    alert("Se acabo el tiempo");
    
  }
  else{
    time = time - 1;
    setTimeout(endTime, 1E3);
  }
}

let btnGameContainer = document.getElementById("btnGameContainer");
let btnPiecesContainer = document.getElementById("btnPiecesContainer");


let btn4InLine = document.getElementById("4InLine");
btn4InLine.addEventListener("click", function (e) {
  btnGameContainer.className += " hidden";
  btnPiecesContainer.classList.remove("hidden");
  tipeGameSelected = 4;
});
let btn6InLine = document.getElementById("6InLine");
btn6InLine.addEventListener("click", function (e) {
  btnGameContainer.className += " hidden";
  btnPiecesContainer.classList.remove("hidden");
  tipeGameSelected = 6;
});

let btn5InLine = document.getElementById("5InLine");
btn5InLine.addEventListener("click", function (e) {
  btnGameContainer.className += " hidden";
  btnPiecesContainer.classList.remove("hidden");
  tipeGameSelected = 5;
});

let btnPiece1 = document.getElementById("PieceOpc1");
btnPiece1.addEventListener("click", function (e) {
  modal.className += " hidden";
  setImgs(1);
  createGame(tipeGameSelected);
  game.refresh();
});
let btnPiece2 = document.getElementById("PieceOpc2");
btnPiece2.addEventListener("click", function (e) {
  modal.className += " hidden";
  setImgs(2);
  createGame(tipeGameSelected);
  game.refresh();
});
let btnPiece3 = document.getElementById("PieceOpc3");
btnPiece3.addEventListener("click", function (e) {
  modal.className += " hidden";
  setImgs(3);
  createGame(tipeGameSelected);
  game.refresh();
});

let btnRestart=document.getElementById("restart");
btnRestart.addEventListener("click",function(e){restartGame()});
function createGame(tipeGame) {
  wh = setUpCanvas();
  game = new Board(wh[0], wh[1], tipeGame);
  //seteo en j1 y j2 su pieza Y guardo el valor donde setea la pieza para crear fururas pieza
  playerJ2.piece = game.j2Piece;
  playerJ2.xv = game.j2Piece.xv;
  playerJ2.yv = game.j2Piece.yv;
  playerJ1.piece = game.j1Piece;
  playerJ1.xv = game.j1Piece.xv;
  playerJ1.yv = game.j1Piece.yv;
  turn = playerJ1.piece;// seteo a j1 por defecto en el turno para q el inicie el juego
  printTurn();
  cantPieces=game.cols*game.rows;
  playerJ1.turns=cantPieces/2;
  playerJ2.turns=cantPieces/2;
  
  
  //una vez instanciado el tablero lo mapeamos para detectar las columnas
  colspos[0] = game.posBoard + game.colW;
  for (let i = 1; i < game.cols; i++) {
    colspos[i] = colspos[i - 1] + game.colW;
  }
  
}

//detectar que el click se de dentro de la ficha del jugador
canvas.onmousedown = function (e) {
  let rect = canvas.getBoundingClientRect();
  let xClick = e.clientX - rect.left; //posición x dentro del elemento.
  let yClick = e.clientY - rect.top; //posición y dentro del elemento.
  if (
    turn.xv < xClick &&
    turn.xv + turn.rowH > xClick &&
    turn.yv < yClick &&
    turn.yv + turn.rowH > yClick
  ) {  
    mouse = true;
  }
};

canvas.onmousemove = function (e) {
  let rect = canvas.getBoundingClientRect();
  let x2 = e.clientX - rect.left;
  let y2 = e.clientY - rect.top;
  if (mouse === true) {
    turn.xv = x2 - turn.rowH / 2; //agarrar la ficha desde el centro
    turn.yv = y2 - turn.rowH / 2;
    game.refresh(); //limpia el tablero y lo vuelve a dibujar para no dibujar un "camino" fichas
  }
};

canvas.onmouseup = function (e) {
  let xClick = e.offsetX;
  let resultInsert, colInsert;

  if (
    mouse === true &&
    xClick > game.posBoard &&
    xClick < wh[0] - game.posBoard
  ) {

    //valido posicion dentro del tablero
    for (let i = 0; i < colspos.length; i++) {
      //recorre por columnas
      if (xClick < colspos[i]) {
        colInsert = i;
        resultInsert = game.insertPiece(colInsert, turn.player);
        break;
      }
    }
    switch (resultInsert) {
      case -1:
        alert("No hay lugar en esa columna, elija otra")
        break;
      default:
        if(game.detectWinner(colInsert, resultInsert)){
          winner();
        }else{
          changeTurn();
        }
        break;
    }
    mouse = false;
  }
  mouse = false;
  restorePieces();
  game.refresh();
};


function changeTurn() {
  
  if (turn.player == "j1") {
    turn = playerJ2.piece;
    playerJ1.turns--;
    
  }
  else if (turn.player == "j2") {
    turn = playerJ1.piece;
    playerJ2.turns--;
    
  }
  
}

function printTurn() {
  let xv;
  let yv;
  let piecesJ1;
  let piecesJ2;

  if(turn.player==="j1"){
    xv=playerJ1.xv;
    yv=playerJ1.yv / 3;
    piecesJ1=playerJ1.turns;
    piecesJ2=playerJ2.turns;
  }
  else{
    xv=playerJ2.xv;
    yv=playerJ2.yv / 3;
    piecesJ2=playerJ2.turns;
    piecesJ1=playerJ1.turns;
  }

  printText(playerJ1.xv, (playerJ1.yv -10), "J1","white", "black");
  printText(playerJ2.xv, (playerJ1.yv -10), "J2","white", "black" );
  printText(xv,yv,"Turno","green", "white");
  printText(playerJ1.xv,playerJ1.yv+200,"Fichas: ","black", "white");
  printText(playerJ2.xv,playerJ2.yv+200,"Fichas: ","black", "white");
  printText((playerJ1.xv+100),(playerJ1.yv+200),piecesJ1,"red", "red");
  printText((playerJ2.xv+100),(playerJ2.yv+200),piecesJ2,"red", "red");
 
}

function restorePieces() {
  playerJ1.piece.xv = playerJ1.xv;
  playerJ1.piece.yv = playerJ1.yv;
  playerJ2.piece.xv = playerJ2.xv;
  playerJ2.piece.yv = playerJ2.yv;
}




function winner(){
  canvas.className += " hidden";
  btnPiecesContainer.className += " hidden";
  modal.classList.remove("hidden");
  let winnerContainer=document.getElementById("winnerContainer");
  winnerContainer.classList.remove("hidden");
  

  if(turn.player == "j1"){
    document.getElementById('winnerText').innerHTML = "Ganador J1";

  }
  else{
    document.getElementById('winnerText').innerHTML = "Ganador J2";
  }
}

function restartGame(){
  canvas.className += " hidden";
  btnPiecesContainer.className += " hidden";
  if(modal.classList.contains("hidden")){
    modal.classList.remove("hidden");
  }

  let winnerContainer=document.getElementById("winnerContainer");
  winnerContainer.className += " hidden";
  btnGameContainer.classList.remove("hidden");
 

}