class Piece {
  constructor(xv, yv, radius, player) {
    this.xv = xv;
    this.yv = yv;
    this.radius = radius;
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
        printPieces(this.xv, this.yv, this.radius, "#fff");//rellenar con imagenes
        break;
      case "j1":
        printPieces(this.xv, this.yv, this.radius, "#FF2442");
        break;
      case "j2":
        printPieces(this.xv, this.yv, this.radius, "#3DB2FF");
        break;
      case "winner":
        printPieces(this.xv, this.yv, this.radius, "#aaa");
        break;
    }
  }
}
