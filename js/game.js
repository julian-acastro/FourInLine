let game; //en esta variable se instancia el tablero
let wh = []; //guardo el ancho y alto del canvas
let colspos = []; //guardo el valor x final de cada columna
let mouse = false;
let tipeGameSelected=0;
let turn;
let playerJ1= {
  piece: null,
  xv: 0,
  yv:0,
  turns: 0
};
let playerJ2= {
  piece: null,
  xv: 0,
  yv:0,
  turns: 0
};

let btnGameContainer=document.getElementById("btnGameContainer");
let btnPiecesContainer=document.getElementById("btnPiecesContainer");
let btn4InLine = document.getElementById("4InLine");
btn4InLine.addEventListener("click", function (e) {
  btnGameContainer.className += " hidden";
  btnPiecesContainer.classList.remove("hidden");
  tipeGameSelected=4;
});
let btn3InLine = document.getElementById("3InLine");
btn3InLine.addEventListener("click", function (e) {
  btnGameContainer.className += " hidden";
  btnPiecesContainer.classList.remove("hidden");
  tipeGameSelected=3;
});

let btn5InLine = document.getElementById("5InLine");
btn5InLine.addEventListener("click", function (e) {
  btnGameContainer.className += " hidden";
  btnPiecesContainer.classList.remove("hidden");
  tipeGameSelected=5;
});

let btnPiece1=document.getElementById("PieceOpc1");
btnPiece1.addEventListener("click",function (e) {
  modal.className+=" hidden";
  setImgs(1);
  createGame(tipeGameSelected);
  game.refresh();
});
let btnPiece2=document.getElementById("PieceOpc2");
btnPiece1.addEventListener("click",function (e) {
  modal.className+=" hidden";
  setImgs(2);
  createGame(tipeGameSelected);
  game.refresh();
});
let btnPiece3=document.getElementById("PieceOpc3");
btnPiece1.addEventListener("click",function (e) {
  modal.className+=" hidden";
  setImgs(3);
  createGame(tipeGameSelected);
  game.refresh();
});

function createGame(tipeGame) {
  wh = setUpCanvas();
  game = new Board(wh[0], wh[1], tipeGame);
  playerJ2.piece = game.j2Piece;
  playerJ2.xv= game.j2Piece.xv;
  playerJ2.yv= game.j2Piece.yv;
  playerJ1.piece = game.j1Piece;
  playerJ1.xv= game.j1Piece.xv;
  playerJ1.yv= game.j1Piece.yv;
  turn=playerJ1.piece;
  //una vez instanciado el tablero lomapeamos para detectar las columnas
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
    //valida posicion de la ficha jugador
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
        colInsert=i;
        resultInsert = game.insertPiece(colInsert, turn.player);
        break;
      }
    }
    switch (resultInsert) {
      case -1:
        alert("ahi no salamin")
        break;
      case 0:
        game.detectWinner(colInsert,resultInsert);
        changeTurn();
        break;
      default:
        game.detectWinner(colInsert,resultInsert);
        changeTurn();
        break;
    }
    mouse = false;
  }
  mouse = false;
  restorePieces();
  game.refresh();
};

function changeTurn(){
  if(turn.player=="j1"){
    turn=playerJ2.piece;
  }else if(turn.player=="j2")
    turn=playerJ1.piece;
}
function restorePieces(){
  playerJ1.piece.xv= playerJ1.xv;
  playerJ1.piece.yv= playerJ1.yv;
  playerJ2.piece.xv= playerJ2.xv;
  playerJ2.piece.yv= playerJ2.yv;
}