class Board {
  constructor(canvasW, canvasH, tipeGame) {
    this.canvasW = canvasW;
    this.canvasH = canvasH;
    this.tipeGame = tipeGame;
    switch (tipeGame) {
      case 6:
        this.rows = 8;
        this.cols = 9;
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

    this.cantPieces = this.rows * this.cols;
    this.rowH = ((this.canvasH - 200) / this.rows); //calculo el diametro de las fichas
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
    let valY = 100; //valor en y
    for (let i = 0; i < this.cols; i++) {
      this.matr[i] = new Array();
      for (let j = 0; j < this.rows; j++) {
        let obj = {
          xv: valX,
          yv: valY,
          rowH: this.rowH,
          player: "none",
        };
        valY += this.rowH + 3;
        this.matr[i].push(obj);
      }
      valX += this.rowH; //aumento el valor de x pra comenzar la siguiente fila
      valY = 100; //reinicio el valor de y para comenzar la siguiente iteracion
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
    //hacer funcion que imprima el resto del canvas 
  }
  refresh() {
    cleanCanvas();
    printTurn();
    this.printBoard();
    
  }
  
  makePlayerPieces() {
   
    
    
    let posj1 = this.posBoard / 2 - this.rowH / 2;
    this.j1Piece = {
      xv: posj1,
      yv: this.rowH * 2,
      rowH: this.rowH,
      player: "j1",
    }; 
    

    let posj2 = this.canvasW - this.posBoard / 2 - this.rowH / 2;
    this.j2Piece = {
      xv: posj2,
      yv: this.rowH * 2,
      rowH: this.rowH,
      player: "j2",
    };
    
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

    } 
    else {
      return -1;
    }
  }
  detectWinner(col, row) {
    let player = this.matr[col][row].player,
      iterator = col;
    let count = 1;
    //verifico mi derecha
    count += this.check(col, row, 1, 0, player);
    //si no llego a TIPOGAME verifico mi izq
    if (count < this.tipeGame) {
      count += this.check(col, row, -1, 0, player);
    }
    console.log("horizontal= " + count);
    //si no llego tipogame verifico verticalmente
    if (count < this.tipeGame) {
      count = 1;
      count += this.check(col, row, 0, 1, player);
      if (count < this.tipeGame) {
        count += this.check(col, row, 0, -1, player);
      }
      console.log("vertical= " + count);
    }
    //si no llego tipogame verifico diagonal decendente
    if (count < this.tipeGame) {
      count = 1;
      count += this.check(col, row, -1, -1, player);
      if (count < this.tipeGame) {
        count += this.check(col, row, 1, 1, player);
      }
      console.log("diagonal decendente= " + count);
    }
    //si no llego tipogame verifico diagonal ascendente
    if (count < this.tipeGame) {
      count = 1;
      count += this.check(col, row, -1, 1, player);
      if (count < this.tipeGame) {
        count += this.check(col, row, 1, -1, player);
      }
      console.log("diagonal ascendente= " + count);
    }
   
  }
  check(col, row, comportamientoCol, comportamientoRow, player) {
    let count = 0;
    let i = col + comportamientoCol;
    let j = row + comportamientoRow;

    while (
      j < this.rows && j >= 0
      && i < this.cols && i >= 0 &&
      this.matr[i][j].player == player
    ) {
      count++;
      i += comportamientoCol;
      j += comportamientoRow;
    }
    
    return count;
    
  }
}
