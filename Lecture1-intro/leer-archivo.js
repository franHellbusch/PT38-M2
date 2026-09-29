const fs = require("fs");

try {
  const contenido = fs.readFileSync("notas.txt", "utf-8");
  console.log(contenido);
} catch (error) {
  console.log("Error al leer:", error.message);
}

console.log("hola mundo");

const archivos = fs.readdirSync(".");
console.log(archivos);
