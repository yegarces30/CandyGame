
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
valorPuntuacion = 5;

/*
Funcion modificarColorTitulo permite realiar la animación del título del juego
*/
function modificarColorTitulo(){
  setTimeout(function(){
    $("#titulo").removeClass("main-titulo").addClass("main-titulo2");
  },0);
  setTimeout(function(){
    $("#titulo").removeClass("main-titulo2").addClass("main-titulo");
  },500);
}

/*
Funcion llenarTablaInicial permite limpiar el tableto e inicializar las variables para, posteriormente,
llenar el tablero para un nuevo juego.
También contiene el llamado a la función draggable de Jquery para poder que las imágenes se arrastren
*/
function llenarTablaInicial(){
  $(".panel-tablero").html("");
  minutos = 2;
  segundos = 0;
  $("#movimientos-text").text("0");
  $("#score-text").text("0");
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
         }
       },
       stop: function() {
        $("#movimientos-text").text(parseInt($("#movimientos-text").text())+1);
        $(this).css("z-index",10);
        $( this ).draggable( "enable" );
        if(continuaDraggable == 1){
            volverPosicionOriginal(this,posImagenInicial.left,posImagenInicial.top);
        }else if(continuaDraggable >=2){
          noPermitirMovimiento(this);

          nFila = parseInt(this.id[0]);
          nCol = parseInt(this.id[2]);

          validarEnLineaHorizontal(nFila);
          if(nFila <7){
            validarEnLineaHorizontal(nFila+1);
          }
          if(nFila > 0){
            validarEnLineaHorizontal(nFila-1);
          }

          validarEnLineaVertical(nCol);
          if(nFila <7){
            validarEnLineaVertical(nCol+1);
          }
          if(nFila > 0){
            validarEnLineaVertical(nCol-1);
          }

          animacionEliminar();

        }

        posImagenInicial = null;
        posImagenCambio = null;
        posInicial = null;
        posFinal = null;
        continuaDraggable = 0;
        direccionAnterior = "";
        direccionActual = "";
        $(this).draggable("option","grid",[50,50]);

      }

     });
}

/*
Funcion cambiarImagenesPosicion permite cambiar  una imagen de posición dependiendo
de la dirección en la que el usuario final arrastre el mouse
*/
function cambiarImagenesPosicion(imagen){
  posFinal = $(imagen).offset();
  dif = 0;
  if(posInicial.left != posFinal.left){
    direccionAnterior = direccionActual;
    $(imagen).draggable("option","grid",[50,0]);
    if(direccionActual == direccionAnterior){
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
        arregloPosiciones[x][y-1] = imagenActual;

        pasarImagen(imagenOtra,posImagenInicial.left,2)

        $(imagenOtra).attr("id",""+x+"-"+y);
        $(imagen).attr("id",""+x+"-"+(y-1));
      }
    }
    posInicial = posFinal;
  }else if(posInicial.top != posFinal.top){
    direccionAnterior = direccionActual;
    $(imagen).draggable("option","grid",[0,50]);
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
  //$( imagen ).draggable( "option", "grid" );
}

/*
Funcion validarContinuacion permite identificar si es posible continuar con el Juego
teniendo en cuenta el movimiento del jugador
*/
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

/*
Funcion noPermitirMovimiento vuelve la imagen a la posición inicial si no permite moverla
*/
function noPermitirMovimiento(imagen){
  switch (direccionActual) {
    case "derecha":
      var posLeft =  posImagenInicial.left
      posLeft = posLeft + 100;
      $(imagen).offset({left:posLeft});
      break;
    case "izquierda":
      $(imagen).offset({left:posImagenInicial.left - 100});
      break;
    default:

  }

}

/*
Funcion calcularTiempo permite llevar la cuenta regresiva del tiempo y, al terminar el tiempo,
muestra la animación de juego terminado.
*/
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
    $("#titulo").text("Juego terminado");
    $(".panel-tablero").animate({width: '0%'},1000);
    $( ".panel-score" ).animate({width: '100%'}, 3000 );
    $(".panel-tablero").css("border-width","0px");
  }
  cadenaSegundos = "0"+segundos;
  if(segundos>9){
    cadenaSegundos = segundos;
  }

  $("#timer").html("0"+minutos+":"+cadenaSegundos);
}

/*
Funcion random permite obtener una imagen aleatoria
*/
function random(){
  return Math.floor((Math.random() * 4) + 1)+".png";
}

/*
Funcion inicializarArregloPosiciones permite crear la matriz de imágenes para jugar
*/
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

/*
Funcion pasarImagen genera la animación de movimiento para las imágenes que cambian de posición
*/
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
      var topImg = imagen.offset().top;
      setTimeout(function(){$(imagen).offset({top:(topImg-30)})},100);
      setTimeout(function(){$(imagen).offset({top:(topImg-70)})},300);
      setTimeout(function(){$(imagen).offset({top:(posicion)})},500);
      break;
    case 4:
      var topImg = imagen.offset().top;
      setTimeout(function(){$(imagen).offset({top:(topImg+30)})},100);
      setTimeout(function(){$(imagen).offset({top:(topImg+70)})},300);
      setTimeout(function(){$(imagen).offset({top:(posicion)})},500);
      break;
    default:
  }
}

/*
Funcion volverPosicionOriginal devuelve la imagen a la posición inicial en caso de que la jugada sea invalida
*/
function volverPosicionOriginal(imagen,posicionX,posicionY){
  $(imagen).offset({left:posicionX,top:posicionY});
}

/*
Funcion validarEnLineaHorizontal permite identificar si hay tres o mas imágenes iguales en las filas
*/
function validarEnLineaHorizontal(fila){
  var contador = 0
  var id = ""
  for (var i = 0; i < 8; i++) {
    for (var j = i; j < 8; j++) {
      if(arregloPosiciones[fila][i] == arregloPosiciones[fila][j]){
        contador++;
        id += "#"+fila+"-"+j+", ";
      }else{
        break;
      }
    }

    if(contador >= 3){
      $(id+"none").addClass("enLinea");
      puntuacion = parseInt($("#score-text").text());
      puntuacion += (valorPuntuacion * contador);
      $("#score-text").text(puntuacion);
    }
    contador = 0
    id = "";
  }
}

/*
Funcion validarEnLineaVertical permite identifica si hay tres o mas imágenes iguales en las columnas
*/
function validarEnLineaVertical(columna){
  contador = 0
  id = ""
  for (var i = 0; i < 8; i++) {
    for (var j = i; j < 8; j++) {
      if(arregloPosiciones[i][columna] == arregloPosiciones[j][columna]){
        contador++;
        id += "#"+j+"-"+columna+", ";
      }else{
        break;
      }
    }

    if(contador >= 3){
      $(id+"none").addClass("enLinea");
      puntuacion = parseInt($("#score-text").text());
      puntuacion += (valorPuntuacion * contador);
      $("#score-text").text(puntuacion);
    }
    contador = 0
    id = "";
  }
}

/*
Funcion animacionEliminar permite hacer parpadear las imágenes que se encuentran en línea
*/
function animacionEliminar(){
  tiempo = 0;
  for (var i = 0; i < 5; i++) {
    setTimeout(function(){
      $(".enLinea").css("visibility","hidden");
    },tiempo);
    tiempo += 300;
    setTimeout(function(){
      $(".enLinea").css("visibility","visible");
    },tiempo);
    tiempo += 300;
  }
  setTimeout(function(){
    $(".enLinea").css("visibility","hidden");
    $(".imgCandy").removeClass("enLinea");
  },tiempo);

  tiempo += 700;


  setTimeout(function(){
    var longitud = $(".imgCandy[style*='hidden']").length;
    while(longitud > 0){
      console.log("si hay ocultos");
      for (var i = 7; i >=0 ; i--) {
        corregirFila(i);
      }
      longitud = $(".imgCandy[style*='hidden']").length;
    }


    for (var i = 0; i < 8; i++) {
      validarEnLineaHorizontal(i);
      validarEnLineaVertical(i);
    }
    animacionEliminar();

  },tiempo);
}

/*
Funcion corregirFila permite reemplazar las imágenes que desaparecen
*/
function corregirFila(fila){
  for (var col = 7; col >= 0 ; col--) {
    if($("#"+fila+"-"+col).css("visibility") == "hidden"){
      if(fila == 0){
        src = random();
        $("#"+fila+"-"+col).attr("src","image/"+src);
        arregloPosiciones[fila][col] = src;
        $("#"+fila+"-"+col).css("visibility","visible");
      }else{
        src = $("#"+(fila-1)+"-"+col).attr("src");
        $("#"+fila+"-"+col).attr("src",""+src);
        arregloPosiciones[fila][col] = src.replace("image/", "");
        $("#"+fila+"-"+col).css("visibility",$("#"+(fila-1)+"-"+col).css("visibility"));
        $("#"+(fila-1)+"-"+col).css("visibility","hidden");
        arregloPosiciones[fila-1][col] = "";
      }
    }
  }
}

/*
Funcion iniciar establece los valores iniciales para jugar
*/
function iniciar(){
  clearInterval(relog);
  $("#timer").html("02:00")
  inicializarArregloPosiciones();
  $(".btn-reinicio").text("Reiniciar");
  $("#titulo").text("Match Game");
  $(".panel-tablero").css("border-width","10px");
  $(".panel-tablero").animate({width: '70%'},500);
  $( ".panel-score" ).animate({width: '25%'}, 500 );
  llenarTablaInicial();
  relog = setInterval(calcularTiempo,1000);
}

/*
Funcion que se ejecuta al terminar de cargar la página
*/
$(document).ready(function(){
  setInterval(modificarColorTitulo, 1000);
  $(".btn-reinicio").click(iniciar);
});
