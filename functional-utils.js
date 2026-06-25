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