import chalk from "chalk";
import fs from "fs";
import path from "path";
import os from "os";

console.log(chalk.yellow("\n=== Explorador de archivos ===\n"));

const dirUsuario = os.homedir();
console.log(chalk.cyan("Directorio:", dirUsuario));

try {
  const archivos = fs.readdirSync(dirUsuario);

  archivos.slice(0, 10).forEach((archivo) => {
    const ruta = path.join(dirUsuario, archivo);
    const stats = fs.statSync(ruta);

    if (stats.isDirectory()) {
      console.log(chalk.blue("📁 " + archivo));
    } else {
      console.log(chalk.white("📄 " + archivo));
    }
  });

  console.log(chalk.gray(`\n... y ${archivos.length} items en total`));
} catch (error) {
  console.log(chalk.red("Error:", error.message));
}
