const fsPromises = require("fs/promises");

async function leerConAwait() {
  try {
    const contenido = await fsPromises.readFile("notas.txt", "utf-8");
    console.log(contenido);
  } catch (error) {
    console.log("Error:", error.message);
  }
}

leerConAwait();
