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
  let wh = setUpCanvas();
  game = new Board(wh[0], wh[1], tipeGame);
}
