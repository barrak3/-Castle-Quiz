function Field() { //Класс игрового поля
  this.arr = [];
  this.hod = 1;
  this.countX = 0;
  this.countO = 0;
}

Field.prototype.prepare = function(){ //метод создания поля для игры
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

}

Field.prototype.fillCount = function(){ //метод для заполнения количества Х и О 

  var pO = document.getElementById("countO");
  var pX = document.getElementById("countX");

  pO.textContent = "Количество O = " + this.countO;
  pX.textContent = "Количество X = " + this.countX;

}
   
Field.prototype.removeEvent = function(e){ //метод для блокрования поля
  e.stopPropagation();
}

Field.prototype.testWin = function(){

  function showWin(a,b,x,y,z){ //отрисовка победной комбинации и блокировка поля x,y,z - элементы которым надо поменять цвет

    var result = document.getElementById("result");
    result.textContent = "win " + that.arr[a][b];
          
    var tds = document.getElementsByTagName("td");

    for (var i = 0; i < tds.length; i++){ //отрисовка
      if( (tds[i].id == x) || (tds[i].id == y) ||  (tds[i].id == z) ) {
        tds[i].style.color = "blue";
      }
    }

    div.addEventListener("click", that.removeEvent , true); //блокировка поля после  
  }
      
  var that = this;

  var div = document.getElementById("game");
      
  var x,y,z;
        

  for (var i = 0; i < 3; i++ ){

    if( (this.arr[i][0] == this.arr[i][1]) && ( this.arr[i][0] == this.arr[i][2] ) && ( this.arr[i][0] !== 0 ) ) { // проверка по горизонтали
      x = i + "0"; y = i + "1"; z = i + "2"; 
      showWin(i,0,x,y,z);
      return; 
    }

    if( (this.arr[0][i] == this.arr[1][i]) && ( this.arr[0][i] == this.arr[2][i] ) && ( this.arr[0][i] !== 0 ) ) { //проверка по вертикали
      x = "0" + i; y = "1" + i ; z = "2" + i;
      showWin(0,i,x,y,z);
      return;
    }

  }

  if ( (this.arr[0][0] == this.arr[1][1]) && ( this.arr[0][0] == this.arr[2][2] ) && ( this.arr[0][0] !== 0 ) ){ //проверка по диагонали 1    
    x = "00"; y = "11"; z = "22";
    showWin(0,0,x,y,z);
    return;
  }

  if ( (this.arr[2][0] == this.arr[1][1]) && ( this.arr[2][0] == this.arr[0][2] ) && ( this.arr[2][0] !== 0 ) ){ //проверка по диагонали 2
    x = "20"; y = "02"; z = "11";
    showWin(2,0,x,y,z);
    return;
  }

  var flag = false;
      
  for (var i = 0; i < this.arr.length; i++){  //проверка на ничью

    for(var j = 0; j < this.arr[i].length; j++){    

      if ( this.arr[i][j] == 0 ) { flag = true; }   

    }
  }

  if (!flag){
    alert("Ничья");
    div.addEventListener("click", this.removeEvent, true);
  } 
}

Field.prototype.clearField = function(){ //метод для очистки поля

  var myBtn = document.getElementById("myBtn");
  var that = this;

  myBtn.onclick = function(){ //Начать игру заново
    that.hod = 1;
    var mas = [];

    for (var i = 0; i < 3; i++){
      mas[i] = 0;
    }

    for (var i = 0; i < 3; i++){
      that.arr[i] = mas.slice();
    }  
  
    that.countX = 0;
    that.countO = 0;
    
    var pO = document.getElementById("countO");
    var pX = document.getElementById("countX");

    pO.textContent = "Количество O = 0";
    pX.textContent = "Количество X = 0"; 
  
    var h1 = document.getElementById("result");
    h1.textContent = "";

    var div = document.getElementById("game");
    div.removeEventListener("click",that.removeEvent,true) //разблокировка поля
 
    var tds = document.getElementsByTagName("td");
    for (var i = 0; i < tds.length; i++){
      tds[i].innerHTML = "";
      tds[i].style.color = "black";
    }
  }

}

function Players(field) {
  this.field = field;
}


Players.prototype.prepare = function(){ //метод для хода игрока 
  var that = this;

  function draw(){ //отрисовка крестика или нолика
    var x = event.target.id[0]; //парсим td.id  
    var y = event.target.id[1];
    
    
    if ( that.field.arr[x][y] !== 0 ) {return;}

    if ( (that.field.hod%2 == 0)) { //в зависимости от хода ставим Х или O
      event.target.innerHTML = "O";
      that.field.arr[x][y] = "O";
      that.field.countO++;
      that.field.hod++;  

    } else {
      event.target.innerHTML = "X";
      that.field.arr[x][y] = "X";
      that.field.countX++;
      that.field.hod++;
    }

    that.field.fillCount();
    that.field.testWin();

  }

  var tds = document.getElementsByTagName("td");
    
  for (var i = 0; i < tds.length; i++){
  tds[i].onclick = draw; //обработчик события при ходе игрока
  }
         
}



var area = new Field();
area.prepare();
area.clearField();

var players = new Players(area);
players.prepare();

