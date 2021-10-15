class Board {
  //constructor de la clase Board
  constructor(canvasW, canvasH, tipeGame) {
    this.canvasW = canvasW;
    this.canvasH = canvasH;
    this.tipeGame = tipeGame;
    //inicializa los valores de las filas y columnas para los distintos tipos de juego
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

    this.cantPieces = this.rows * this.cols;//valor de las fichas totales 
    this.rowH = ((this.canvasH - 200) / this.rows); //calculo el diametro de las fichas
    this.colW = this.rowH + 5;
    this.posBoard = (this.canvasW - this.colW * this.cols) / 2; //centra el tablero en el canvas
    //ancho del canvas le resto el espacio q ocupa el tablero y lo divido por dos para centrarlo.
    this.matr = new Array(this.cols);//se declara la matriz como un array de la cantidad de columnas
    this.makeBoard();//se invoca la funcion que crea el tablero
    this.makePlayerPieces();//invoca la funcion que crea las ficha de cada jugador 
    this.printBoard(); 
    this.j1Piece;
    this.j2Piece;
  }

//Crea el tablero 
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

  //Determina los valores del tablero y las fichas de ambos jugadores
  printBoard() {
    for (let i = 0; i < this.matr.length; i++) {
      let obj1 = this.matr[i];
      for (let j = 0; j < this.rows; j++) {
        let obj2 = obj1[j];
        switch (obj2.player) {
          case "none":
            printPieces(obj2.xv, obj2.yv, obj2.rowH, obj2.player); 
            break;
          case "j1":
            printPieces(obj2.xv, obj2.yv, obj2.rowH, obj2.player);
            break;
          case "j2":
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

  //funcion que limpia el canvas e imprime el turno y el tablero
  refresh() {
    cleanCanvas();
    printTurn();
    this.printBoard();
    
  }
  
  //crea la ficha de cada jugador con su posicion su tamaño y su nombre
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

  //funcion para insertar la ficha dependiendo el valor de cada uno de los lugares del tablero
  insertPiece(numCol, player) {
    let i = 0; 
    
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

  //Verifica si se cumple el 4, 5 o 6 en linea vertical, horizontal o diagonales.
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
   
    //si no llego tipogame verifico verticalmente
    if (count < this.tipeGame) {
      count = 1;
      count += this.check(col, row, 0, 1, player);
      if (count < this.tipeGame) {
        count += this.check(col, row, 0, -1, player);
      }
   
    }
    //si no llego tipogame verifico diagonal decendente
    if (count < this.tipeGame) {
      count = 1;
      count += this.check(col, row, -1, -1, player);
      if (count < this.tipeGame) {
        count += this.check(col, row, 1, 1, player);
      }
     
    }
    //si no llego tipogame verifico diagonal ascendente
    if (count < this.tipeGame) {
      count = 1;
      count += this.check(col, row, -1, 1, player);
      if (count < this.tipeGame) {
        count += this.check(col, row, 1, -1, player);
      }
   
    }
    if(count>=this.tipeGame){
      return true;
    }else
      return false
  }

  //Funcion que chequea la cantidad de fichas contiguas
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
