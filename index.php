<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="main.css">
    <title>ServiOxxo</title>
  </head>
  <body>

    <h1 class="center wc-header">Bienvenido al Juego de colas ServiOxxo</h1>

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
          <li>Seleccione el nivel de dificultad y de click en "Jugar"</li>
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
    
    <div class="center">
      <div class="container">
        <h2>Selecciona la dificultad</h2>
        <form action="jugar.php" method="get">
          <div class="form-group">
              <select class="form-control" name="dificulty" id="dificulty">
                <option value="facil">Fácil</option>
                <option value="normal">Normal</option>
                <option value="dificil">Difícil</option>
              </select>
          </div>
          <button type="submit" class="hvr-sweep-to-right btn btn-default">Jugar</button>
        </form>
      </div>
    </div>

    
  </body>
</html>
