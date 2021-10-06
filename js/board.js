class Board {
  constructor(canvasW, canvasH, tipeGame) {
    this.canvasW = canvasW;
    this.canvasH = canvasH;
    this.tipeGame = tipeGame;
    this.matr = new Array(6);
    this.makePieces();
  }
  makePieces() {
    let rows = 6;
    let columns = 7;
    let rowH = (this.canvasH - 30) / (rows + 1);
    let radius = rowH / 2;
    let valX = radius + 5;
    let valY = radius + 5;
    for (let i = 0; i < columns; i++) {
      this.matr[i] = new Array(7);
      for (let j = 0; j < rows + 1; j++) {
        let obj = new Piece(valX, valY, radius, "j2");
        valY += rowH + 2;
        this.matr[i].push(obj);
      }
      valX += rowH + 5; //aumento el
      valY = radius + 5;
    }
  }
  getMatr(){
      return this.matr;
  }
}
