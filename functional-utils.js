// Parte 1
const obtenerIngresos = (valores) => valores.filter((valor) => valor > 0);

const obtenerGastos = (valores) => valores.filter((valor) => valor < 0);

const montosAbsolutos = (valores) => valores.map((valor) => Math.abs(valor));

const buscarPrimerGastoMayor = (valores, monto) =>
  valores.find((valor) => valor < -monto);

// Reto autonomo 1
const contarGastos = (valores) => valores.filter((valor) => valor < 0).length;

// Parte 2
const calcularSaldo = (valores) =>
  valores.reduce((acumulador, valor) => acumulador + valor, 0);

const totalIngresos = (valores) =>
  obtenerIngresos(valores).reduce((acumulador, valor) => acumulador + valor, 0);

const totalGastos = (valores) =>
  obtenerGastos(valores).reduce((acumulador, valor) => acumulador + valor, 0);

// Retorna: [cantidad, totalIngresos, totalGastos, saldo]
const generarValoresReporte = (valores) => [
  valores.length,
  totalIngresos(valores),
  totalGastos(valores),
  calcularSaldo(valores),
];

const imprimirReporte = (nombres, valores) => {
  console.log("--- Resumen Final ---");

  valores.forEach((valor, indice) => {
    const tipo = valor > 0 ? "ingreso" : "gasto";
    console.log(
      `  ${indice + 1}. ${nombres[indice]} (${tipo}): $${Math.abs(valor).toFixed(2)}`,
    );
  });

  const reporte = generarValoresReporte(valores);
  console.log("Total movimientos:", reporte[0]);
  console.log("Total ingresos: $" + reporte[1].toFixed(2));
  console.log("Total gastos: $" + Math.abs(reporte[2]).toFixed(2));
  console.log("Saldo: $" + reporte[3].toFixed(2));
};

// Reto autonomo 2
const promedioMovimiento = (valores) =>
  valores.reduce((acumulador, valor) => acumulador + Math.abs(valor), 0) /
  valores.length;

// Parte 3
// Composición + DRY
const promedioIngresos = (valores) => {
  const ingresos = obtenerIngresos(valores);
  if (ingresos.length === 0) return 0;
  return totalIngresos(valores) / ingresos.length;
};

// Reto autonomo 3
const validarPresupuesto = (valores, limite) =>
  Math.abs(totalGastos(valores)) <= limite;

// Logros adicionales (Laboratorio 6)

// Logro 1: Mediana
const mediana = (valores) => {
  if (valores.length === 0) return 0;
  const ordenados = [...valores].sort((a, b) => a - b);
  const mitad = Math.floor(ordenados.length / 2);

  return ordenados.length % 2 !== 0
    ? ordenados[mitad]
    : (ordenados[mitad - 1] + ordenados[mitad]) / 2;
};

// Logro 1: Desviación Estándar
const desviacionEstandar = (valores) => {
  if (valores.length === 0) return 0;
  const prom = valores.reduce((acc, val) => acc + val, 0) / valores.length;
  const varianza =
    valores.reduce((acc, val) => acc + Math.pow(val - prom, 2), 0) /
    valores.length;
  return Math.sqrt(varianza);
};

// Logro 2: Categorización
const categorizarPorMonto = (valores) => {
  return valores.reduce(
    (resultado, valor) => {
      const abs = Math.abs(valor);

      // Criterio de rangos
      if (abs <= 50) {
        resultado.bajo.push(valor);
      } else if (abs <= 500) {
        resultado.medio.push(valor);
      } else {
        resultado.alto.push(valor);
      }

      return resultado;
    },
    { bajo: [], medio: [], alto: [] },
  );
};