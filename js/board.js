class Board {
  constructor(canvasW, canvasH, tipeGame) {
    this.canvasW = canvasW;
    this.canvasH = canvasH;
    this.tipeGame = tipeGame;
    switch (tipeGame) {
      case 3:
        this.rows = 3;
        this.cols = 3;
        break;
      case 4:
        this.rows = 6;
        this.cols = 7;
        break;
      case 5:
        this.rows = 7;
        this.cols = 8;
        break;
    }
    this.rowH = (this.canvasH - 30) / this.rows; //calculo el diametro de las fichas
    this.colW = this.rowH + 5;
    this.posBoard = (this.canvasW - this.colW * this.cols) / 2; //centra el tablero en el canvas
    //ancho del canvas le resto el espacio q ocupa el tablero y lo divido por dos para centrarlo.
    this.matr = new Array(this.cols);
    this.makeBoard();
    this.makePlayerPieces();
    this.printBoard();
    this.j1Piece;
    this.j2Piece;
  }

  makeBoard() {
    let valX = this.posBoard; //valor de x teniendo en cuenta el radio y la posicion centrada del tablero
    let valY = 5; //valor en y
    for (let i = 0; i < this.cols; i++) {
      this.matr[i] = new Array();
      for (let j = 0; j < this.rows; j++) {
        let obj = {
          xv : valX,
          yv : valY,
          rowH : this.rowH,
          player : "none" 
        };
        valY += this.rowH + 3;
        this.matr[i].push(obj);
      }
      valX += this.rowH; //aumento el valor de x pra comenzar la siguiente fila
      valY = 5; //reinicio el valor de y para comenzar la siguiente iteracion
    }
  }
  printBoard() {
    for (let i = 0; i < this.matr.length; i++) {
      let obj1 = this.matr[i];
      for (let j = 0; j < this.rows; j++) {
        let obj2 = obj1[j];
        switch (obj2.player) {
          case "none":
            printPieces(obj2.xv, obj2.yv, obj2.rowH, obj2.player); //rellenar con imagenes
            break;
          case "j1":
            printPieces(obj2.xv, obj2.yv, obj2.rowH, obj2.player);
            break;
          case "j2":
            printPieces(obj2.xv, obj2.yv, obj2.rowH, obj2.player);
            break;
          case "winner":
            printPieces(obj2.xv, obj2.yv, obj2.rowH, obj2.player);
            break;
        }
      }
    }
    printPieces(
      this.j1Piece.xv,
      this.j1Piece.yv,
      this.j1Piece.rowH,
      this.j1Piece.player
    );
    printPieces(
      this.j2Piece.xv,
      this.j2Piece.yv,
      this.j2Piece.rowH,
      this.j2Piece.player
    );
  }
  refresh() {
    cleanCanvas();
    this.printBoard();
  }
  makePlayerPieces() {
    printText(this.posBoard / 2, this.rowH, "J1");
    let posj1 = this.posBoard / 2 - this.rowH / 2;
    this.j1Piece ={
        xv : posj1,
        yv : this.rowH* 2,
        rowH : this.rowH,
        player :  "j1"
    }
    printText(this.canvasW - this.posBoard / 2, this.rowH, "J2");
    let posj2 = this.canvasW - this.posBoard / 2 - this.rowH / 2;
    this.j2Piece ={
      xv : posj2,
      yv : this.rowH* 2,
      rowH : this.rowH,
      player :  "j2"
    }
  }
  insertPiece(numCol, player) {
    let i = 0; //creo iterador

    let col = this.matr[numCol]; //guardo la columna donde inserto
    if (col[0].player === "none") {
      while (i < col.length && col[i].player === "none") {
        //recorro la columna hasta encontrar pieza q no sea none
        i++;
      }
      //inserto nuevo valor a la pieza
      col[i - 1].player = player;
      //refresco nuevamente el tablero para mostrar los cambios
      this.refresh();
      return i - 1;
    } else {
      return -1;
    }
  }
}
