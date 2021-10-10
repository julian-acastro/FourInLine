let game;//en esta variable se instancia el tablero
let wh=[];//guardo el ancho y alto del canvas
let colspos=[];//guardo el valor x final de cada columna

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
canvas.addEventListener("click",(e)=>{
  let xClick=e.offsetX;
  if(xClick>game.posBoard && xClick<(wh[0]-game.posBoard)){
    for(let i=0;i<colspos.length;i++){
      if(xClick<colspos[i]){
        console.log("columna: " + (i+1));
        break;
      }
    }
  }
})