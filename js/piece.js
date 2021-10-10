class Piece {
  constructor(xv, yv, rowH, player) {
    this.xv = xv;
    this.yv = yv;
    this.rowH = rowH;
    this.player = player;
    this.printMe();
  }
  
  setPlayer(p) {
    this.player = p;
    this.printMe();
    //this.printMe();
  }
  printMe() {
    switch (this.player) {
      case "none":
        printPieces(this.xv, this.yv, this.rowH, this.player);//rellenar con imagenes
        break;
      case "j1":
        printPieces(this.xv, this.yv, this.rowH, this.player);
        break;
      case "j2":
        printPieces(this.xv, this.yv, this.rowH, this.player);
        break;
      case "winner":
        printPieces(this.xv, this.yv, this.rowH,this.player);
        break;
    }
  }
}
