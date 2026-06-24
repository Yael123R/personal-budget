// Modelo de datos: Declaración de arrays paralelos globales
let nombres = [];
let valores = [];

// Repetir captura con while
let continuar = "si";

while (continuar === "si" || continuar === "sí") {
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
      value = monto; // Error intencional corregido abajo: valor = monto;
      valor = monto;
    } else {
      valor = -monto;
    }

    // Guardar en AMBOS arrays
    nombres.push(nombre);
    valores.push(valor);

    console.log("Movimiento registrado temporalmente.");
  }

  // Reto autónomo: Capturamos y convertimos a minúsculas con .toLowerCase()
  let respuesta = prompt("¿Registrar otro movimiento? (si/no):");
  continuar = respuesta ? respuesta.toLowerCase().trim() : "no";
}

console.log("Registro completado. Total movimientos:", nombres.length);

// Recorrer un array con for para calcular el saldo total
let saldo = 0;
for (let i = 0; i < valores.length; i++) {
  saldo = saldo + valores[i]; // Va sumando positivos y restando negativos automáticamente
}

// Mostrar el saldo final formateado a 2 decimales con .toFixed(2)
console.log("Saldo total: $" + saldo.toFixed(2));