console.log("=== Código síncrono ===");

console.log("1: Inicio");

setTimeout(() => {
  console.log("2: Timeout (aunque sea 0ms)");
}, 0);

Promise.resolve().then(() => {
  console.log("3: Promise resuelta");
});

console.log("4: Fin del código síncrono");
