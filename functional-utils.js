// Parte 1 (Laboratorio 7)
const obtenerIngresos = (movimientos) =>
  movimientos.filter((movimiento) => movimiento.tipo === "ingreso");

const obtenerGastos = (movimientos) =>
  movimientos.filter((movimiento) => movimiento.tipo === "gasto");

const totalIngresos = (movimientos) =>
  obtenerIngresos(movimientos).reduce(
    (acumulador, movimiento) => acumulador + movimiento.valor,
    0,
  );

const totalGastos = (movimientos) =>
  obtenerGastos(movimientos).reduce(
    (acumulador, movimiento) => acumulador + movimiento.valor,
    0,
  );

const calcularSaldo = (movimientos) =>
  totalIngresos(movimientos) - totalGastos(movimientos);

const buscarPrimerGastoMayor = (movimientos, monto) =>
  obtenerGastos(movimientos).find((movimiento) => movimiento.valor > monto);

// Reto Autónomo 1 (Laboratorio 7)
const agruparPorTipo = (movimientos) => {
  return movimientos.reduce(
    (acumulador, movimiento) => {
      if (movimiento.tipo === "ingreso") {
        acumulador.ingresos.push(movimiento);
      } else if (movimiento.tipo === "gasto") {
        acumulador.gastos.push(movimiento);
      }
      return acumulador;
    },
    { ingresos: [], gastos: [] },
  );
};

// Retorna: [cantidad, totalIngresos, totalGastos, saldo]
const generarValoresReporte = (movimientos) => [
  movimientos.length,
  totalIngresos(movimientos),
  totalGastos(movimientos),
  calcularSaldo(movimientos),
];

const imprimirReporte = (movimientos) => {
  console.log("--- Resumen Final ---");

  movimientos.forEach((movimiento, indice) => {
    console.log(`  ${indice + 1}. ${movimiento.datosMovimiento()}`);
  });

  const reporte = generarValoresReporte(movimientos);
  console.log("Total movimientos:", reporte[0]);
  console.log("Total ingresos: $" + reporte[1].toFixed(2));
  console.log("Total gastos: $" + reporte[2].toFixed(2)); // ya es positivo: sin Math.abs
  console.log("Saldo: $" + reporte[3].toFixed(2));
};

// Reto autonomo 2 (Laboratorio 6)
const promedioMovimiento = (valores) =>
  valores.reduce((acumulador, valor) => acumulador + Math.abs(valor), 0) /
  valores.length;

// Parte 3 (Laboratorio 6)
// Composición + DRY
const promedioIngresos = (movimientos) => {
  const ingresos = obtenerIngresos(movimientos);
  if (ingresos.length === 0) return 0;
  return totalIngresos(movimientos) / ingresos.length;
};

// Reto autonomo 3 (Laboratorio 6)
const validarPresupuesto = (movimientos, limite) =>
  Math.abs(totalGastos(movimientos)) <= limite;

// Logros adicionales (Laboratorio 6)

// Logro 1: Mediana
const mediana = (movimientos) => {
  if (movimientos.length === 0) return 0;
  const valores = movimientos.map((m) =>
    m.tipo === "gasto" ? -m.valor : m.valor,
  );
  const ordenados = [...valores].sort((a, b) => a - b);
  const mitad = Math.floor(ordenados.length / 2);

  return ordenados.length % 2 !== 0
    ? ordenados[mitad]
    : (ordenados[mitad - 1] + ordenados[mitad]) / 2;
};

// Logro 1: Desviación Estándar
const desviacionEstandar = (movimientos) => {
  if (movimientos.length === 0) return 0;
  const valores = movimientos.map((m) =>
    m.tipo === "gasto" ? -m.valor : m.valor,
  );
  const prom = valores.reduce((acc, val) => acc + val, 0) / valores.length;
  const varianza =
    valores.reduce((acc, val) => acc + Math.pow(val - prom, 2), 0) /
    valores.length;
  return Math.sqrt(varianza);
};

// Logro 2: Categorización
const categorizarPorMonto = (movimientos) => {
  return movimientos.reduce(
    (resultado, m) => {
      const abs = m.valor;

      // Criterio de rangos
      if (abs <= 50) {
        resultado.bajo.push(m);
      } else if (abs <= 500) {
        resultado.medio.push(m);
      } else {
        resultado.alto.push(m);
      }

      return resultado;
    },
    { bajo: [], medio: [], alto: [] },
  );
};