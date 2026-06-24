// Modelo de datos: Declaración de arrays paralelos globales
let nombres = [];
let valores = [];

// Captura inicial con prompt
const nombre = prompt("Nombre del movimiento:");
const tipo = prompt("Tipo (ingreso / gasto):");
const monto = parseFloat(prompt("Monto:"));

// Validar con if antes de guardar
if (
  !nombre ||
  (tipo !== "ingreso" && tipo !== "gasto") ||
  isNaN(monto) ||
  monto <= 0
) {
  alert("Datos inválidos. Intenta de nuevo.");
} else {
  // Calcular el valor con signo
  let valor;
  if (tipo === "ingreso") {
    valor = monto;
  } else {
    valor = -monto; // Si es gasto, se convierte a negativo
  }

  // Guardar en AMBOS arrays - siempre juntos manteniendo la sincronía de índices
  nombres.push(nombre);
  valores.push(valor);

  console.log("Movimiento registrado.");
  console.log("Nombres:", nombres);
  console.log("Valores:", valores);
}