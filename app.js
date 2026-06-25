// 1) GLOBALES

let nombres = ['Salario', 'Cena', 'Freelance', 'Transporte'];
let valores = [3000, -45.50, 500, -30];
// Pruebas del checkpoint 1
console.log('Ingresos:', obtenerIngresos(valores)); 
// Debe mostrar: [3000, 500]

console.log('Gastos:', obtenerGastos(valores)); 
// Debe mostrar: [-45.50, -30]

console.log('Montos sin signo:', montosAbsolutos(valores)); 
// Debe mostrar: [3000, 45.5, 500, 30]

console.log('Primer gasto > $40:', buscarPrimerGastoMayor(valores, 40)); 
// Debe mostrar: -45.50

// Reto autonomo
console.log('Cantidad de gastos:', contarGastos(valores)); 
// Debe mostrar: 2

// 2) FUNCIONES IMPERATIVAS

function registrarMovimiento() {
  const nombre = prompt("Nombre del movimiento:");

  // Validar que los nombres no se repitan (ignora mayúsculas/minúsculas)
  // El método .some() busca si ya existe un nombre idéntico en el array
  if (
    nombre &&
    nombres.some((n) => n.toLowerCase() === nombre.toLowerCase().trim())
  ) {
    alert(`El movimiento "${nombre}" ya existe. Usa un nombre diferente.`);
    return;
  }

  const tipo = prompt("Tipo (ingreso / gasto):");
  const monto = parseFloat(prompt("Monto:"));

  // Validacion temprana
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

function calcularSaldo() {
  let saldo = 0;
  for (let i = 0; i < valores.length; i++) {
    saldo = saldo + valores[i];
  }
  return saldo;
}

function mostrarResumen() {
  console.log("--- 📊 RESUMEN FINAL ---");
  console.log("Total de movimientos:", nombres.length);

  let totalIngresos = 0;
  let totalGastos = 0;

  // Variables para el LOGRO 1
  let ingresoMasAlto = 0;
  let gastoMasBajo = 0; // Guardará el valor más negativo (ej. -500 es menor que -45)

  for (let i = 0; i < valores.length; i++) {
    if (valores[i] > 0) {
      totalIngresos += valores[i];
      // Si el ingreso actual es mayor al que teníamos guardado, lo actualizamos
      if (valores[i] > ingresoMasAlto) {
        ingresoMasAlto = valores[i];
      }
    } else {
      totalGastos += Math.abs(valores[i]);
      // Para el gasto más fuerte (más negativo), buscamos el menor número en la recta numérica
      if (valores[i] < gastoMasBajo) {
        gastoMasBajo = valores[i];
      }
    }
  }

  // Imprimir desgloses básicos
  console.log("Total ingresos: $" + totalIngresos.toFixed(2));
  console.log("Total gastos: $" + totalGastos.toFixed(2));
  console.log("Saldo total: $" + calcularSaldo().toFixed(2));

  console.log("------------------------");
  // Imprimir LOGRO 1
  console.log(
    "Ingreso más alto: " +
      (ingresoMasAlto > 0 ? "$" + ingresoMasAlto.toFixed(2) : "No registrado"),
  );
  console.log(
    "Gasto más fuerte: " +
      (gastoMasBajo < 0
        ? "$" + Math.abs(gastoMasBajo).toFixed(2)
        : "No registrado"),
  );
}

// 3) FLUJO DE EJECUCIÓN

let continuar = "si";

while (continuar === "si" || continuar === "sí") {
  registrarMovimiento();

  let respuesta = prompt("¿Registrar otro movimiento? (si/no):");
  continuar = respuesta ? respuesta.toLowerCase().trim() : "no";
}

mostrarResumen();