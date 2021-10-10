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
    this.radius = this.rowH / 2; //calculo el radio de las fichas
    this.colW = this.rowH+5;
    this.posBoard = (this.canvasW - (this.colW) * this.cols) / 2;//centra el tablero en el canvas
    //ancho del canvas le resto el espacio q ocupa el tablero y lo divido por dos para centrarlo.
    this.matr = new Array();
    this.makeTablero();
    this.makePlayerPieces();
  }

  makeTablero() {
    let valX = this.radius + this.posBoard;//valor de x teniendo en cuenta el radio y la posicion centrada del tablero
    let valY = this.radius + 5;//valor en y 
    
    for (let i = 0; i < this.cols; i++) {
      this.matr[i] = new Array(7);
      for (let j = 0; j < this.rows; j++) {
        let obj = new Piece(valX, valY, this.radius, "none");
        valY += this.rowH + 2;
        this.matr[i].push(obj);
      }
      valX += this.colW; //aumento el valor de x pra comenzar la siguiente fila
      valY = this.radius + 5;//reinicio el valor de y para comenzar la siguiente iteracion
    }

    let backgroundImg = new Image;
    backgroundImg.src = "./img/background.jpg"
    backgroundImg.onload = function(){//Dibuja una imagen gradiente en el lienzo
    ctx.drawImage(backgroundImg,0,valYcopie);//ver coordenadas x e y

    }

  }

  makePlayerPieces() {
    printText(this.posBoard / 2, this.rowH, "J1");
    let j1Piece = new Piece(this.posBoard / 2,this.rowH * 2,this.radius,"j1");
    printText(this.canvasW - this.posBoard / 2, this.rowH, "J2");
    let j2Piece = new Piece(this.canvasW - this.posBoard / 2,this.rowH * 2,this.radius,"j2");
  }
  
}
