// 1) GLOBALES
let nombres = ["Salario", "Cena", "Freelance", "Transporte"];
let valores = [3000, -45.5, 500, -30];

// 2) FUNCIONES IMPERATIVAS
function registrarMovimiento() {
  const nombre = prompt("Nombre del movimiento:");

  // Validar que los nombres no se repitan
  if (
    nombre &&
    nombres.some((n) => n.toLowerCase() === nombre.toLowerCase().trim())
  ) {
    alert(`El movimiento "${nombre}" ya existe. Usa un nombre diferente.`);
    return;
  }

  const tipo = prompt("Tipo (ingreso / gasto):");
  const monto = parseFloat(prompt("Monto:"));

  // Validar datos
  if (
    !nombre ||
    (tipo !== "ingreso" && tipo !== "gasto") ||
    isNaN(monto) ||
    monto <= 0
  ) {
    alert("Datos inválidos. Intenta de nuevo.");
    return;
  }

  let valor = tipo === "ingreso" ? monto : -monto;

  nombres.push(nombre.trim());
  valores.push(valor);

  console.log("Movimiento registrado temporalmente.");
}

// 3) FLUJO DE EJECUCIÓN
let continuar = "si";

while (continuar === "si" || continuar === "sí") {
  registrarMovimiento();

  let respuesta = prompt("¿Registrar otro movimiento? (si/no):");
  continuar = respuesta ? respuesta.toLowerCase().trim() : "no";
}

// 4) REPORTE FUNCIONAL FINAL
// Imprimir desglose
imprimirReporte(nombres, valores);

// Imprimir promedio de ingresos
console.log("Promedio de ingresos: $" + promedioIngresos(valores).toFixed(2));

// Reto autonomo 3
console.log(
  "¿El presupuesto está dentro del límite de $100?:",
  validarPresupuesto(valores, 100),
);

// Logros adicionales (Laboratorio 6)
console.log("Mediana de movimientos:", mediana(valores));
console.log("Desviación Estándar:", desviacionEstandar(valores).toFixed(2));
console.log("Categorización por monto:", categorizarPorMonto(valores));