// volumen de musica
function setHalfVolume() {
    var myAudio = document.getElementById("audio1");  
    myAudio.volume = 0.5; //Changed this to 0.5 or 50% volume 
}
// Esto es para traerme los elementos de html que voy a hacer referencia en los metodos
window.onload = function () {
  pantalla = document.getElementById("score");
  btnComenzar = document.getElementById("start-button");
  dificultyDiv = document.getElementById("dificulty");
  fila_content = document.getElementById("fila_content");
  containerLost = document.getElementById("containerLost");
  clientLostImage = document.getElementById("cliente-perdido");
  timeToWaitLabel = document.getElementById("time-to-wait");
  dificulty = dificultyDiv.className;
}

const filaSpaces = 7; // numero de lugares disponibles en la fila
const animacionDePerderDuracion = 3; // tiempo en que tarda la animacion de que un cliente se vaya
const tardanzaCaja1 = 10; // Tiempo que tarda en atender a alguien
const tardanzaCaja2 = 8; // Tiempo que tarda en atender a alguien
const tardanzaCaja3 = 7; // Tiempo que tarda en atender a alguien
const tiempoCorte = 15; // Tiempo en que tarda el cajero en hacer corte(penalizacion)
const corteCant = 1000; // Tiempo en que tarda el cajero en hacer corte(penalizacion)
var isMarch = false; // Para saber si esta en marcha el reloj
var acumularTime = 0; // tiempo acumulado
var milisecondsRest = 0; // esta variable es para que cuando llegue a 100(um segundo)se actualice
var timeDeCajas = 0; // pendiente
var newClientRest = 0; // esta variable es el tiempo que va, cuando sea igual que nexClient, se crea un nuevo cliente
var nextClient = 0;//Esto es el tiempo que resta para que el siguiente cliente apareza
var clientes = [];// array de clientes o los que estan en la fila
var cajeros = []; // array de cajeros de la clase CajeroClass
var statusElem = [];// array de barra de status de las cajas
var totalElem = [];// array de elementos donde se muestra el total en caja
var cajasElem = [];// array de los contenenedores donde se pone el cliente en las cajas
var btnCajasElem = []; // botones para deshabilitarlos (pendiente)
var clientLost = null; // En esta variable se pondra el cliente que se pierde
var clientLostRest = 0; // segundos restantes de la animacion
var life = 3; // Numero de vidas


// Metodo que se ejecuta con el boton comenzar
function start() {
  btnComenzar.disabled = true; // SE bloquea boton de comenzar
  
  crearCajeros();
  startTime();
}

// Este metodo detiene el cronometro y terminara el juego
function stop() {
  if (isMarch == true) {
    clearInterval(control);
    isMarch = false;
  }
  showScoreTotal();
  btnComenzar.disabled = false; //activa el botón de comenzar
  location.href ="preguntas.php";
}

// Este metodo inicia el cronometro (no mover)
function startTime() {
  if (isMarch == false) {
    timeInicial = new Date();
    control = setInterval(cronometro, 10);
    isMarch = true;
  }
}

// Este metodo tiene la logica del cronometro
function cronometro() {
  timeActual = new Date();
  acumularTime = timeActual - timeInicial;
  milisecondsRest += 1;
  if (milisecondsRest >= 100) {
    actualizarJuego();
    milisecondsRest = 0;
  }
  acumularTime2 = new Date();
  acumularTime2.setTime(acumularTime);
  cc = Math.round(acumularTime2.getMilliseconds() / 10);
  ss = acumularTime2.getSeconds();
  mm = acumularTime2.getMinutes();
  if (cc < 10) { cc = "0" + cc; }
  if (ss < 10) { ss = "0" + ss; }
  if (mm < 10) { mm = "0" + mm; }
  pantalla.innerHTML = "Tiempo - Score " + mm + " : " + ss;
  //pantalla.innerHTML = "Tiempo - Score "+mm+" : "+ss+" : "+cc; //Si quieren poner segundos comenten la enterior y pongan esta
}

// Este metodo actualiza la vista en general y se manda a llamar cada segundo
function actualizarJuego() {
  newClientRest += 1;
  // se establecen los numeros para el siguiente
  if (nextClient == 0 || nextClient == newClientRest) {
    if (dificulty == "facil") {
      nextClient = generarNumRectangular(10, 20);
    } else if (dificulty == "normal") {
      nextClient = generarNumRectangular(5, 10);
    } else if (dificulty == "dificil") {
      nextClient = generarNumRectangular(2, 6);
    }
    crearNuevoCliente();
    newClientRest = 0;
  }
  actualizarFila();
  animationLoseClient();
  pasoSegundoParaCajas();
  actualizarCajas();
  updateTimeToWait();
}

// Este metodo es para ver cuanto puede tardar en ser atendido el ultimo cliente
function updateTimeToWait(){
  var timeWait = clientes.length * 11;
  console.log(timeWait);
  console.log(timeWait);
  timeToWaitLabel.innerHTML = "Tiempo de espera aprox:" + timeWait + "seg.";
}

// Este metodo es para actualizar y mostrar los clientes que haya en fila
function actualizarFila() {
  var n = clientes.length;
  // Se recorren todos los espacios del html
  for (var i = 0; i < filaSpaces; i++) {
    var imagen = document.getElementById("waiting-" + i);
    var cost = document.getElementById("waiting-cost-" + i);
    if (i < n) {
      var client = clientes[i];
      imagen.src = client.image;
      imagen.hidden = false;
      cost.innerHTML = "$" + client.pago + ".00";
      cost.hidden = false;
    } else {
      imagen.hidden = true;
      cost.hidden = true;
    }
  }
}

// Este metodo es para animar cuando pierde un cliente
function animationLoseClient() {
  if (clientLost != null && clientLostRest > 0) {
    containerLost.hidden = false;
    clientLostImage.src = clientLost.image;
    clientLostRest = clientLostRest - 1;
  } else if (clientLost != null && clientLostRest == 0) {
    containerLost.hidden = true;
    life = life - 1;
    clientLost = null;
    actualizarVidas();
  }
}

// Este metodo es para crear un nuevo cliente y agregarlo al array de cola
function crearNuevoCliente() {
  var pago = aleatorio(10, 500);
  var imagen = "images/cliente" + aleatorio(0, 7) + ".png";
  var obj = new ClienteClass(pago, imagen);
  if (clientes.length >= filaSpaces) {
    clientLost = obj;
    clientLostRest = animacionDePerderDuracion;
  } else {
    clientes.push(obj);
  }
}

// Este metodo es para actualizar la vista de las vidas y validar que el juego se detenga
function actualizarVidas() {
  for (var i = 1; i <= 3; i++) {
    var heart = document.getElementById("life" + i);
    if (i <= life) {
      heart.src = "images/corazon.png";
    } else {
      heart.src = "images/corazon-gray.png";
    }
  }
  if (life == 0) {
    stop();
  }
}

function enviarParaCaja(x) {
  if (acumularTime > 0) {
    if (clientes.length > 0) {
      if (cajeros[x].haciendoCorte || cajeros[x].cliente != null) {
        alert("La caja esta ocupada, espera a que este libre");
      } else {
        var auxCliente = clientes[0];
        clientes.shift();
        cajeros[x].atender(auxCliente);
        actualizarFila();
        actualizarCajas();
      }
    } else {
      alert("Aún no hay clientes en la fila");
    }
  } else {
    alert("Primero debes inicial el juego");
  }
}

function crearCajeros() {
  for (var i = 0; i < 3; i++) {
    if (i == 0) {
      var obj = new CajeroClass(tardanzaCaja1, i);
    } else if (i == 1) {
      var obj = new CajeroClass(tardanzaCaja2, i);
    } else {
      var obj = new CajeroClass(tardanzaCaja3, i);
    }
    cajeros.push(obj);
    var status = document.getElementById("status-" + i);
    statusElem.push(status);
    var tot = document.getElementById("money-" + i);
    totalElem.push(tot);
    var container = document.getElementById("caja-" + i);
    cajasElem.push(container);
    var btnCaja = document.getElementById("cabutton-caja-" + i);
    btnCajasElem.push(btnCaja);
  }
}

function actualizarCajas() {
  for (var i = 0; i < 3; i++) {
    if (cajeros[i].tiempoRest == 0 && cajeros[i].cliente != null) {
      cajasElem[i].hidden = true;
      cajeros[i].cliente = null;
      cajeros[i].status = "libre";
      if (cajeros[i].total > corteCant) {
        cajeros[i].haciendoCorte = true;
        cajeros[i].tiempoRest = tiempoCorte;
        cajeros[i].status = "ocupado - Haciendo Corte";
      }
    } else if (cajeros[i].tiempoRest == 0 && cajeros[i].haciendoCorte) {
      cajeros[i].total = 0;
      cajeros[i].haciendoCorte = false;
      cajeros[i].status = "libre";
    } else {
      if (cajeros[i].cliente != null) {
        cajasElem[i].src = cajeros[i].cliente.image;
        cajasElem[i].hidden = false;
      } else {
        cajasElem[i].hidden = true;
      }
      statusElem[i].innerHTML = "Status: " + cajeros[i].status;
      totalElem[i].innerHTML = "Dinero en caja: $" + cajeros[i].total + ".00";
    }
  }
}

function pasoSegundoParaCajas() {
  for (var i = 0; i < 3; i++) {
    if (cajeros[i].tiempoRest > 0) {
      cajeros[i].tiempoRest = cajeros[i].tiempoRest - 1;
    }
  }
  actualizarCajas();
}

function showScoreTotal() {
  var scoreFinal = pantalla.innerHTML.replace("Tiempo - Score ", "");
  alert("Game Over \nTu score fue de " + scoreFinal);
  location.reload();
}

// Metodos de Numeros rectangulares
function generarNumRectangular(inf, sup) {
  const e = 2.718281828;
  var lambda = 2.6667;
  let constante = Math.pow(e, -1 * lambda);
  let fact = 1;
  let sum = 0;
  let pois = 0;
  let vP = 0;
  var r = Math.random(50, 100);
  for (let x = 0; sum <= r; x++) {
    if (x == 0) {
      pois = constante * (Math.pow(lambda, x));
      sum = sum + pois;
    } else {
      fact = fact * x;
      pois = (constante * (Math.pow(lambda, x))) / fact;
      sum = sum + pois;
    }
    vP = aleatorio(inf, sup);
  }
  return vP;
}

function aleatorio(inferior, superior) {
  var numPosibilidades = superior - inferior;
  var aleatorio = Math.random() * (numPosibilidades + 1);
  aleatorio = Math.floor(aleatorio);
  return inferior + aleatorio;
}
