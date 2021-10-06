let btn4InLine = document.getElementById("4InLine");
btn4InLine.addEventListener("click", function (e) {
  createGame(7, 6, 4);
});

let modal = document.getElementById("modal");
let game;

function createGame(col, row, winCondition) {
  modal.className += " hidden";
  let wh = setUpCanvas();
  game = new Board(wh[0], wh[1], "j1");
}
