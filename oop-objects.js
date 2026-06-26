// CLASE MOVIMIENTO
class Movimiento {
  constructor(nombre, tipo, valor) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.valor = valor;
    // Guarda la fecha actual automáticamente al crearse
    this.fecha = new Date().toLocaleDateString();
  }

  esIngreso() {
    return this.tipo === "ingreso";
  }

  esGasto() {
    return this.tipo === "gasto";
  }

  datosMovimiento() {
    let signo = this.esIngreso() ? "+" : "-";
    return `${this.nombre} (${this.tipo}): ${signo}$${this.valor.toFixed(2)}`;
  }

  // 🏆 RETO AUTÓNOMO (Lab 7 - Parte 2)
  antiguedadEnDias() {
    // Convertimos las cadenas de fecha a objetos Date reales para restar milisegundos
    const fechaInicio = new Date(this.fecha);
    const fechaHoy = new Date();

    // Diferencia en milisegundos
    const diferenciaMilisegundos = fechaHoy - fechaInicio;

    // Convertir milisegundos a días: (1000ms * 60s * 60m * 24h)
    const dias = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
    return dias;
  }
}