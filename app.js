// 1) GLOBALES (Laboratorio 7)
let movimientos = [];

// 2) FUNCIONES IMPERATIVAS
function registrarMovimiento() {
  const nombre = prompt("Nombre del movimiento:");

  // Validar que los nombres no se repitan
  if (
    nombre &&
    movimientos.some((m) => m.nombre.toLowerCase() === nombre.toLowerCase().trim())
  ) {
    alert(`El movimiento "${nombre}" ya existe. Usa un nombre diferente.`);
    return;
  }

  const tipo = prompt("Tipo (ingreso / gasto):");
  const valor = parseFloat(prompt("Monto:"));

  // Validar datos
  if (
    !nombre ||
    (tipo !== "ingreso" && tipo !== "gasto") ||
    isNaN(valor) ||
    valor <= 0
  ) {
    alert("Datos inválidos. Intenta de nuevo.");
    return;
  }

  // 1 solo push de un objeto. valor SIEMPRE positivo. (Lab 7 - Parte 2)
  movimientos.push(new Movimiento(nombre.trim(), tipo, valor));

  console.log("Movimiento registrado temporalmente.");
}

// 3) FLUJO DE EJECUCIÓN
let continuar = "si";
while (continuar === "si") {
  registrarMovimiento();
  continuar = prompt("¿Registrar otro movimiento? (si/no):");
}

// 4) REPORTE FUNCIONAL FINAL
// Imprimir desglose
imprimirReporte(movimientos); // un solo argumento

// Array temporal de números "con signo" para mantener vivas las funciones del Lab 6
const valoresCompatibles = movimientos.map(m => m.tipo === 'gasto' ? -m.valor : m.valor);

// Imprimir promedio de ingresos
console.log("Promedio de ingresos: $" + promedioIngresos(movimientos).toFixed(2));

// Reto autonomo 3 (Laboratorio 6)
console.log(
  "¿El presupuesto está dentro del límite de $100?:",
  validarPresupuesto(movimientos, 100),
);

// Logros adicionales (Laboratorio 6)
console.log("Mediana de movimientos:", mediana(movimientos));
console.log("Desviación Estándar:", desviacionEstandar(movimientos).toFixed(2));
console.log("Categorización por monto:", categorizarPorMonto(movimientos));