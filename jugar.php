<!DOCTYPE html>
<?php
if (isset($_GET["dificulty"])){
  $dificultad = $_GET["dificulty"];
}else{
  $dificultad = "normal";
}
?>
<html lang="en" dir="ltr">
<!-- MUSICA -->
<audio src="/music/BackgroundMusic.mp3" autoplay loop onloadeddata="setHalfVolume()" id= "audio1">
<p>If you are reading this, it is because your browser does not support the audio element.</p>
</audio>

  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.14.0/css/all.css"
    integrity="sha384-HzLeBuhoNPvSl5KYnjx0BT+WB0QEEqLprO+NBkkk5gbc67FTaL7XIGa2w1L0Xbgc" crossorigin="anonymous">
    <link rel="stylesheet" href="main.css">
    <title>ServiOxxo</title>
  </head>
  <body>
    <div class="center">

      <div class="header-juego">
        <a href="index.php">
          <i class="fas fa-arrow-left"></i>
          
        </a>
        <h1>Jugando en nivel: <?= $dificultad ?></h1>
      </div>

      <div class="juego-container">

        <div class="cajas-container">
            <?php for ($i=0; $i < 3; $i++) { ?>

              <div class="caja">
                <div class="status-bar">
                  <p id="status-<?= $i ?>">Status: Libre</p>
                </div>
                <div class="container-compra">
                  <img id="caja-<?= $i ?>"rc="/images/cliente1" width="100%" hidden>
                </div>
                <img src="images/cajero.png" width="100" height="100">
                <div class="total-money">
                  <p id="money-<?= $i ?>">Dinero en caja: $0.00</p>
                </div>
                <button id="button-caja-<?= $i ?>" class="button-cliente" type="button" name="button" onclick="enviarParaCaja(<?= $i ?>);">
                  Mandar cliente
                </button>
              </div>

            <?php }?>
        </div>

        <div class="fila_container">
          <img class="background-image" src="images/fila.png" width="80%">
          <div class="time-container">
            <p id="time-to-wait">Tiempo de espera: 0 segundos</p>
          </div>
          <div id="fila_content" class="fila">
            <?php for ($i=0; $i < 7; $i++) {?>
              <div class="wating-person">
                <p id="waiting-cost-<?= $i ?>" hidden>$0.0</p>
                <img id="waiting-<?= $i ?>" src="images/cliente1.png" width="100%" hidden>
              </div>
            <?php }?>
          </div>
          <div id="containerLost" class="perdido_container" hidden>
            <div class="message-perdido">
              <p>¡Está lleno, mejor me voy!</p>
            </div>
            <div class="wating-person">
                <img id="cliente-perdido" src="images/cliente1.png" width="100%">
            </div>
          </div>
        </div>

        <div class="start-container">
          <button id="start-button"class="start" type="button" name="button" onclick="start()">Comenzar</button>
        </div>

        <div class="life-container">
          <img id="life1" class="life-image" src="images/corazon.png" height="100%">
          <img id="life2" class="life-image" src="images/corazon.png" height="100%">
          <img id="life3" class="life-image" src="images/corazon.png" height="100%">
        </div>

        <div class="score-container">
          <p id="score" class="score">Tiempo - Score 00:00</p>
        </div>

        <div id="dificulty" class="<?=$dificultad ?>" hidden></div>

      </div>
       
    </div>
    <div class="reglas">
      <div class="objetivos">
        <h1>Objetivos del juego:</h1>
        <ol>
          <li>Evita conglomeraciones atendiendo lo más rápido posible a tus clientes.</li>
          <li>Manten tu cola vacía para evitar perder clientes.</li>
          <li>Administra tus flujos de cajas para evitar desbordes en tu fila.</li>
        </ol>
      </div>
      
      <div class="instrucciones">
        <h1>Reglas</h1>
        <ol>
          <li>Incia el juego dando click en el botón "Comenzar".
            <button id="start-button"class="start" type="button" name="button">Comenzar</button>
          </li>
          <li>Atiende un cliente en la caja deseada con el botón "Mandar cliente".
            <button id="button-caja-<?= $i ?>" class="button-cliente" type="button" name="button">Mandar cliente</button>
          </li>
          <li>Cuando tu caja sobrepase los $1,000 pesos realizará el corte de caja.</li>
          <li>El máximo de clientes permitidos en la fila es de 8 clientes</li>
          <li>Tienes un total de 3 vidas.</li>
          <li>Si un cliente nuevo llega y la fila está llena, se irá de la tienda y perderás una vida.</li>
          <li>Si pierdes las 3 vidas, el juego finalizará.</li>
        </ol>
      </div>

    </div>
  
    <footer class="center">
      <p> Música de Fondo: “Boss Theme” by sawsquarenoise is licensed under CC BY 4.0  </p>
    </footer> 
 
    
    <script src="js/CajeroClass.js"/></script>
    <script src="js/ClienteClass.js"/></script>
    <script src="main.js"/></script>
  </body>
</html>
