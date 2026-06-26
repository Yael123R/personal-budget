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

  // ⭐️ LOGRO 2 (Lab 7 - Parte 3): Validar la integridad de los datos del movimiento
  esValido() {
    const nombreValido =
      typeof this.nombre === "string" && this.nombre.trim().length > 0;
    const tipoValido = this.tipo === "ingreso" || this.tipo === "gasto";
    const valorValido =
      typeof this.valor === "number" && this.valor > 0 && !isNaN(this.valor);

    return nombreValido && tipoValido && valorValido;
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

// CLASE GESTORA (PRESUPUESTO)
class Presupuesto {
  constructor() {
    this.movimientos = [];
  }

  // ⭐️ LOGRO 2 (Lab 7 - Parte 3): Solo agrega si pasa el control de calidad
  agregar(movimiento) {
    if (movimiento && movimiento.esValido()) {
      this.movimientos.push(movimiento);
      return true;
    }
    console.warn(
      `Movimiento inválido rechazado: "${movimiento?.nombre || "Sin Nombre"}"`,
    );
    return false;
  }

  // ⭐️ LOGRO 1 (Lab 7 - Parte 3): Alerta cuando los gastos superan el 80% de los ingresos
  verificarLimites() {
    const ingresos = this.totalIngresos();
    if (ingresos === 0) {
      // Si no hay ingresos pero ya hay gastos, técnicamente ya superó cualquier límite
      return this.totalGastos() > 0;
    }
    // Retorna true si los gastos superan el 80% (0.80) de los ingresos
    return this.totalGastos() > ingresos * 0.8;
  }

  eliminar(nombre) {
    this.movimientos = this.movimientos.filter((m) => m.nombre !== nombre);
  }

  obtenerIngresos() {
    return this.movimientos.filter((m) => m.esIngreso());
  }

  obtenerGastos() {
    return this.movimientos.filter((m) => m.esGasto());
  }

  totalIngresos() {
    return this.obtenerIngresos().reduce(
      (acumulador, m) => acumulador + m.valor,
      0,
    );
  }

  totalGastos() {
    return this.obtenerGastos().reduce(
      (acumulador, m) => acumulador + m.valor,
      0,
    );
  }

  saldo() {
    return this.totalIngresos() - this.totalGastos();
  }

  buscarPorNombre(texto) {
    return this.movimientos.find((m) =>
      m.nombre.toLowerCase().includes(texto.toLowerCase()),
    );
  }

  resumen() {
    return {
      cantidad: this.movimientos.length,
      ingresos: this.totalIngresos(),
      gastos: this.totalGastos(),
      saldo: this.saldo(),
    };
  }

  // 🏆 RETO AUTÓNOMO (Lab 7 - Parte 3)
  topGastos(n) {
    return this.obtenerGastos()
      .sort((a, b) => b.valor - a.valor) // Ordena de mayor a menor costo
      .slice(0, n); // Toma los primeros 'n' elementos
  }
}