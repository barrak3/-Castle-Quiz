function Game(argument) {
  "use strict"

  var that = this; //сохраняем this для дальнейшего вызова this.arr и this.hod

  this.arr = [];//двумерный массов со значениями поля 
  this.hod = 1; // счетчик хода
  this.countX = 0; //Количество Х
  this.countO = 0; //Количество O
  
  this.removeEvent = function(e){
    e.stopPropagation();
  }

  this.prepare = function(){ //метод создания поля для игры
    var mas = [];

    for (var i = 0; i < 3; i++){
      mas[i] = 0;
    }

    for (var i = 0; i < 3; i++){
      this.arr[i] = mas.slice();
    }  
        
    var  table = document.createElement("table");

    for (var i = 0; i < 3; i++ ){

      var tr = document.createElement("tr"); 

      for (var j = 0; j < 3; j++ ){
        var td = document.createElement("td");
        td.id = ""+i+j; //присвоение в id позицию элемента td для двумерного массива
        tr.appendChild(td);
      }

      table.appendChild(tr);
 
    }

    var context = document.getElementById("game");
    context.appendChild(table);

    var tds = document.getElementsByTagName("td");
    
    for (var i = 0; i < tds.length; i++){
      tds[i].onclick = this.draw; //обработчик события при ходе игрока
    }

  }
    
  this.draw = function(event){
    
    function testWin(){ //проверка поля нет ли победной комбинации
      function winCombination(x,y,z){ //изменнеие цвета у победнйо комбинации

        var tds = document.getElementsByTagName("td");
        for (var i = 0; i < tds.length; i++){
          if( (tds[i].id == x) || (tds[i].id == y) ||  (tds[i].id == z) ) {
          	tds[i].style.color = "blue";
          }
        }

      }

      var div = document.getElementById("game");
      
      var x,y,z;
      
      var result = document.getElementById("result");

      for (var i = 0; i < 3; i++ ){

        if( (that.arr[i][0] == that.arr[i][1]) && ( that.arr[i][0] == that.arr[i][2] ) && ( that.arr[i][0] !== 0 ) ) { //горизонталь
          result.textContent = "win " + that.arr[i][0];
          
          x = i + "0"; y = i + "1"; z = i + "2";
          winCombination(x,y,z);

          div.addEventListener("click", that.removeEvent , true); //блокировка поля после нахождения победнйо комбинации 

          return; 
        }

        if( (that.arr[0][i] == that.arr[1][i]) && ( that.arr[0][i] == that.arr[2][i] ) && ( that.arr[0][i] !== 0 ) ) { //вертикаль

          result.textContent = "win " + that.arr[0][i]; 
 
          x = "0" + i; y = "1" + i ; z = "2" + i ;
          winCombination(x,y,z);

          div.addEventListener("click", that.removeEvent, true);

          return;
        }

      }

      if ( (that.arr[0][0] == that.arr[1][1]) && ( that.arr[0][0] == that.arr[2][2] ) && ( that.arr[0][0] !== 0 ) ){ //диагональ 1

        result.textContent = "win " + that.arr[0][0];

        x = "00"; y = "11"; z = "22";
        winCombination(x,y,z);

        div.addEventListener("click", that.removeEvent, true); 

        return;
      }

      if ( (that.arr[2][0] == that.arr[1][1]) && ( that.arr[2][0] == that.arr[0][2] ) && ( that.arr[2][0] !== 0 ) ){ //диагональ 2

       result.textContent = "win " + that.arr[2][0];

        x = "20"; y = "02"; z = "11";
        winCombination(x,y,z);

        div.addEventListener("click", that.removeEvent, true);

        return;
      }

      var flag = false;
      
      for (var i = 0; i < that.arr.length; i++){  //проверка на ничью

        for(var j = 0; j < that.arr[i].length; j++){
      
        if ( that.arr[i][j] == 0 ) { flag = true;}    

        }

      }


      if (!flag){
      	alert("Ничья");
      	div.addEventListener("click", that.removeEvent, true);
      }


    }


    var x = event.target.id[0]; //парсим td.id 	
    var y = event.target.id[1];

    
    if ( that.arr[x][y] !== 0 ) {return;}

    if ( (that.hod%2 == 0)) { //в зависимости от хода ставим Х или O
      event.target.innerHTML = "O";
      that.arr[x][y] = "O";
      that.countO++;
      that.hod++;  

    } else {
      event.target.innerHTML = "X";
      that.arr[x][y] = "X";
      that.countX++;
      that.hod++;
    }

    var pO = document.getElementById("countO");
    var pX = document.getElementById("countX");

    pO.textContent = "Количество O = " + that.countO;
    pX.textContent = "Количество X = " + that.countX;

    testWin();


  }

    
  this.prepare();
}

var Game1 = new Game();

var myBtn = document.getElementById("myBtn");

myBtn.onclick = function(){ //Начать игру заново
  Game1.hod = 1;
  var mas = [];

  for (var i = 0; i < 3; i++){
    mas[i] = 0;
  }

  for (var i = 0; i < 3; i++){
    Game1.arr[i] = mas.slice();
  }  
  
  Game1.countX = 0;
  Game1.countO = 0;
    
  var pO = document.getElementById("countO");
  var pX = document.getElementById("countX");

  pO.textContent = "Количество O = 0";
  pX.textContent = "Количество X = 0"; 
  
  var h1 = document.getElementById("result");
  h1.textContent = "";

  var div = document.getElementById("game");
  div.removeEventListener("click",Game1.removeEvent,true) //разблокировка поля
 
  var tds = document.getElementsByTagName("td");
  for (var i = 0; i < tds.length; i++){
    tds[i].innerHTML = "";
    tds[i].style.color = "black";
  }


}

