import { describe, test, expect } from "vitest";
import { validarEdad, validarEmail, validarNombre } from "../src/utils/validators.js";

describe("validarEmail", () => {
  test("acepta email valido", () => {
    expect(validarEmail("test@example.com")).toBe(null);
  });

  test("rechaza email sin @", () => {
    expect(validarEmail("testexample.com")).toContain("inválido");
  });

  test("rechaza email vacío", () => {
    expect(validarEmail("")).toContain("requerido");
  });

  test("rechaza email null", () => {
    expect(validarEmail(null)).toContain("requerido");
  });

  test("rechaza email sin dominio", () => {
    expect(validarEmail("test@")).toContain("inválido");
  });
});

describe("validarNombre", () => {
  test("acepta nombre válido", () => {
    expect(validarNombre("Juan Pérez")).toBe(null);
  });

  test("rechaza nombre undefined", () => {
    expect(validarNombre(undefined)).toContain("requerido");
  });

  test("rechaza nombre vacío", () => {
    expect(validarNombre("")).toContain("vacío");
  });

  test("rechaza nombre solo espacios", () => {
    expect(validarNombre("   ")).toContain("vacío");
  });

  test("rechaza nombre de 1 carácter", () => {
    expect(validarNombre("J")).toContain("entre 2 y 100");
  });

  test("rechaza nombre que no es string", () => {
    expect(validarNombre(123)).toContain("texto");
  });
});

describe("validarEdad", () => {
  test("acepta edad válida", () => {
    expect(validarEdad(25)).toBe(null);
  });

  test("rechaza edad negativa", () => {
    expect(validarEdad(-5)).toContain("entre 0 y 150");
  });

  test("rechaza edad mayor a 150", () => {
    expect(validarEdad(200)).toContain("entre 0 y 150");
  });

  test("rechaza edad como string", () => {
    expect(validarEdad("25")).toContain("número");
  });

  test("rechaza NaN", () => {
    expect(validarEdad(NaN)).toContain("número");
  });
});
