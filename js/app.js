
var arregloPosiciones = [];
minutos = 2;
segundos = 0;
relog = "";
posImagenInicial = null;
posImagenCambio = null;
posInicial = null;
posFinal = null;
continuaDraggable = 0;
direccionAnterior = "";
direccionActual = "";
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
       grid: [ 50, 50 ],
       start: function() {
         var zInd = $(this).css("z-index") + 50;
         $(this).css("z-index",zInd);
         posInicial = $(this).offset();
         posImagenInicial = $(this).offset();
       },
       drag: function() {
         if(continuaDraggable < 2){
           cambiarImagenesPosicion(this);
         }else{
           console.log("se metioooooooooooooo");
         }
       },
       stop: function() {
        $("#movimientos-text").text(parseInt($("#movimientos-text").text())+1);
        $(this).css("z-index",10);
        $( this ).draggable( "enable" );
        if(continuaDraggable == 1){
            volverPosicionOriginal(this,posImagenInicial.left,posImagenInicial.top);
        }

        posImagenInicial = null;
        posImagenCambio = null;
        posInicial = null;
        posFinal = null;
        continuaDraggable = 0;
        direccionAnterior = "";
        direccionActual = "";
        $(this).draggable("option","axis","");

      }

     });
}

function cambiarImagenesPosicion(imagen){
  posFinal = $(imagen).offset();
  dif = 0;
  if(posInicial.left != posFinal.left){
    direccionAnterior = direccionActual;
    $(imagen).draggable("option","axis","x");
    if(direccionActual == direccionAnterior){
      console.log("direcciones iguales");
      continuaDraggable++;
    }else{
      continuaDraggable--;
    }

    dif = posFinal.left - posInicial.left;

    if(dif > 0){
      direccionActual = "derecha";
      if(continuaDraggable == 2){
        var x = parseInt(imagen.id[0]);
        y = parseInt(imagen.id[2]);

        idOtraImagen = "#"+x+"-"+(y+1);
        imagenOtra = $(idOtraImagen);

        posImagenCambio = $(imagenOtra).offset();

        imagenActual = arregloPosiciones[x][y];
        arregloPosiciones[x][y] =  arregloPosiciones[x][y+1];
        arregloPosiciones[x][y+1] = imagenActual;

        pasarImagen(imagenOtra,posImagenInicial.left,1)

        $(imagenOtra).attr("id",""+x+"-"+y);
        $(imagen).attr("id",""+x+"-"+(y+1));
      }
    }else{
      direccionActual = "izquierda";
      if(continuaDraggable == 2){
        var x = parseInt(imagen.id[0]);
        y = parseInt(imagen.id[2]);

        idOtraImagen = "#"+x+"-"+(y-1);
        imagenOtra = $(idOtraImagen);

        posImagenCambio = $(imagenOtra).offset();

        imagenActual = arregloPosiciones[x][y];
        arregloPosiciones[x][y] =  arregloPosiciones[x][y-1];
        arregloPosiciones[x][y+1] = imagenActual;

        pasarImagen(imagenOtra,posImagenInicial.left,2)

        $(imagenOtra).attr("id",""+x+"-"+y);
        $(imagen).attr("id",""+x+"-"+(y-1));
      }
    }
    posInicial = posFinal;
  }else if(posInicial.top != posFinal.top){
    direccionAnterior = direccionActual;
    $(imagen).draggable("option","axis","y");
    if(direccionActual == direccionAnterior){
      continuaDraggable++;
    }else{
      continuaDraggable--;
    }

    dif = posFinal.top - posInicial.top;

    if(dif > 0){
      direccionActual = "abajo";
      if(continuaDraggable == 2){
        var x = parseInt(imagen.id[0]);
        y = parseInt(imagen.id[2]);

        idOtraImagen = "#"+(x+1)+"-"+y;
        imagenOtra = $(idOtraImagen);

        posImagenCambio = $(imagenOtra).offset();

        imagenActual = arregloPosiciones[x][y];
        arregloPosiciones[x][y] =  arregloPosiciones[x+1][y];
        arregloPosiciones[x+1][y] = imagenActual;

        pasarImagen(imagenOtra,posImagenInicial.top,3)

        $(imagenOtra).attr("id",""+x+"-"+y);
        $(imagen).attr("id",""+(x+1)+"-"+y);
      }
    }else{
      direccionActual = "arriba";
      if(continuaDraggable == 2){
        var x = parseInt(imagen.id[0]);
        y = parseInt(imagen.id[2]);

        idOtraImagen = "#"+(x-1)+"-"+y;
        imagenOtra = $(idOtraImagen);

        posImagenCambio = $(imagenOtra).offset();

        imagenActual = arregloPosiciones[x][y];
        arregloPosiciones[x][y] =  arregloPosiciones[x-1][y];
        arregloPosiciones[x-1][y] = imagenActual;

        pasarImagen(imagenOtra,posImagenInicial.top,4)

        $(imagenOtra).attr("id",""+x+"-"+y);
        $(imagen).attr("id",""+(x-1)+"-"+y);
      }
    }
    posInicial = posFinal;
  }
  $( imagen ).draggable( "option", "grid" );
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

function pasarImagen(imagen,posicion,opcion){

  switch (opcion) {
    case 1:
      setTimeout(function(){$(imagen).offset({left:(posicion+100)})},100);
      setTimeout(function(){$(imagen).offset({left:(posicion+50)})},300);
      setTimeout(function(){$(imagen).offset({left:(posicion)})},500);
      break;
    case 2:
      setTimeout(function(){$(imagen).offset({left:(posicion-100)})},100);
      setTimeout(function(){$(imagen).offset({left:(posicion-50)})},300);
      setTimeout(function(){$(imagen).offset({left:(posicion)})},500);
      break;
    case 3:
      console.log("imagen baja???");
      var topImg = imagen.offset().top;
      setTimeout(function(){$(imagen).offset({top:(topImg-30)})},100);
      setTimeout(function(){$(imagen).offset({top:(topImg-70)})},300);
      setTimeout(function(){$(imagen).offset({top:(posicion)})},500);
      break;
    case 4:
      console.log("imagen sube???");
      var topImg = imagen.offset().top;
      setTimeout(function(){$(imagen).offset({top:(topImg+30)})},100);
      setTimeout(function(){$(imagen).offset({top:(topImg+70)})},300);
      setTimeout(function(){$(imagen).offset({top:(posicion)})},500);
      break;
    default:
  }
}

function volverPosicionOriginal(imagen,posicionX,posicionY){
  $(imagen).offset({left:posicionX,top:posicionY});
}


$(document).ready(function(){
  setInterval(modificarColorTitulo, 1000);
  inicializarArregloPosiciones();
  llenarTablaInicial();
  relog = setInterval(calcularTiempo,1000);
});
