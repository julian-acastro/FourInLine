class Board {
  constructor(canvasW, canvasH, tipeGame) {
    this.canvasW = canvasW;
    this.canvasH = canvasH;
    this.tipeGame = tipeGame;
    this.matr = new Array(6);
    this.makePieces();
  }
  getMatr(){
      return this.matr;
  }
  makeTablero(cols,rows){
    let rowH = (this.canvasH - 30) / (rows);//calculo el diametro de las fichas
    let radius = rowH / 2;//calculo el radio de las fichas
    let posBoard= (this.canvasW-((rowH+5)*cols))/2;
    //ancho del cambas le resto el espacio q ocupa el tablero y lo divido por dos para centrarlo
    let valX = radius + posBoard;
    let valY = radius + 5;
    for (let i = 0; i < cols; i++) {
      this.matr[i] = new Array(7);
      for (let j = 0; j < rows; j++) {
        let obj = new Piece(valX, valY, radius, "none");
        valY += (radius*2) + 2;
        this.matr[i].push(obj);
      }
      valX += (radius*2) + 2; //aumento el valor de x pra comenzar la siguiente fila
      valY = radius + 5;
    }
  }
  makePieces() {
    //un switch q setea el tablero segun el tipo de juego seleccionado por el usuario
    switch (this.tipeGame) {
      case 3:
        this.makeTablero(3,3);
        this.makePlayerPieces(3,3);
        break;
      case 4:
        this.makeTablero(7,6);
        this.makePlayerPieces(7,6);
        break;
      case 5:
        this.makeTablero(8,7);
        this.makePlayerPieces(8,7);
        break;
    }
  }
  makePlayerPieces(rows,cols){
    let rowH = (this.canvasH - 30) / (rows);//calculo el diametro de las fichas
    let radius = rowH / 2;//calculo el radio de las fichas
    let posBoard= (this.canvasW-((rowH+5)*cols))/2;
    //calculando la medida del tablero se cuanto espacio tengo para trabajar a cada lado de este
    printText((posBoard/2),rowH,"J1");
    let j1Piece= new Piece((posBoard/2),(rowH*2),radius,"j1");
    printText((this.canvasW-(posBoard/2)),rowH,"J2");
    let j2Piece= new Piece((this.canvasW-(posBoard/2)),(rowH*2),radius,"j2");
  }

}