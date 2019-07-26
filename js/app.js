
var arregloPosiciones = [];
minutos = 2;
segundos = 0;
relog = "";

function modificarColorTitulo(){
  setTimeout(function(){
    $("#titulo").removeClass("main-titulo").addClass("main-titulo2");
  },0);
  setTimeout(function(){
    $("#titulo").removeClass("main-titulo2").addClass("main-titulo");
  },500);
}

function llenarTablaInicial(){
  var imagen = "";
  numeroCol = 0;
  id = "";
  continua = true;
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      continua = true;
      while(continua){
          imagen = random();
          arregloPosiciones[i][j] = imagen;
          continua = validarContinuacion(i,j);
      }

      numeroCol = i+1;
      id = i+"-"+j;

      $(".panel-tablero").html($(".panel-tablero").html()+"<img id='"+id+"' class='imgCandy responsive-img' src='image/"+imagen+"' ></img>");
      $(".panel-tablero").css("height","100%");
    }
  }
   $( ".imgCandy" ).draggable(
     {
       containment: "parent",
       start: function() {
         var zInd = $(this).css("z-index") + 5;
         console.log("index="+zInd);
         $(this).css("z-index",zInd);
       },
       drag: function() {

       },
       stop: function() {
        $("#movimientos-text").text(parseInt($("#movimientos-text").text())+1);
        $(this).css("z-index",10);
      }
     });
}

function validarContinuacion(posX,posY){
  var valorActual = arregloPosiciones[posX][posY];

  if((posY-2)>=0){
    valorPosArriba1 = arregloPosiciones[posX][posY-1];
    valorPosArriba2 = arregloPosiciones[posX][posY-2];
    if(valorActual == valorPosArriba1 && valorActual == valorPosArriba2){
      return true;
    }
  }
  if((posX-2)>=0){
    valorPosIzq1    = arregloPosiciones[posX-1][posY];
    valorPosIzq2    = arregloPosiciones[posX-2][posY];
    if(valorActual == valorPosIzq1 && valorActual == valorPosIzq2){
      return true;
    }
  }
  return false;
}

function calcularTiempo(){
  var cadenaSegundos = "";
  if(segundos == 0){
    minutos--;
    segundos = 59;
  }else{
    segundos--;
  }

  if(minutos == 0 && segundos == 0){
    $( ".imgCandy" ).draggable( "destroy" );
    clearInterval(relog);
  }
  cadenaSegundos = "0"+segundos;
  if(segundos>9){
    cadenaSegundos = segundos;
  }

  $("#timer").html("0"+minutos+":"+cadenaSegundos);
}

function random(){
  return Math.floor((Math.random() * 4) + 1)+".png";
}

function inicializarArregloPosiciones(){
  arregloPosiciones = new Array(8);
  for (var i = 0; i < arregloPosiciones.length; i++) {
    arregloPosiciones[i] = new Array(8);
  }
  for (var i = 0; i < arregloPosiciones.length; i++) {
    for (var j = 0; j < arregloPosiciones.length; j++) {
      arregloPosiciones[i][j] = 0;
    }
  }
}

$(document).ready(function(){
  setInterval(modificarColorTitulo, 1000);
  inicializarArregloPosiciones();
  llenarTablaInicial();
  relog = setInterval(calcularTiempo,1000);
});
