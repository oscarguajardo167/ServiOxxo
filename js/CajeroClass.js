class CajeroClass {
  constructor(tardanza, numCaja) {
    this.tardanza = tardanza;//tiempo en segundos en atender a alguien
    this.caja = numCaja; // numero de la caja que le toco(index)
    this.total = 0; // variable del total para el retiro
    this.cliente = null; //variable en la que se guardara el objeto atendiendo
    this.tiempoRest = 0; // tiempo restante para desocuparse
    this.haciendoCorte = false; // Variable para saber si esta haciendo corte
    this.status = "libre";
  }

  atender(cliente){
    this.cliente = cliente;
    this.total = this.total + cliente.pago;
    this.tiempoRest = this.tardanza;
    this.status = "ocupado - Atendiendo";
  }

}
