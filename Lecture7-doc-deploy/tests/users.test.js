import { describe, test, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("GET /users", () => {
  test("devuelve lista de usuarios", async () => {
    const response = await request(app).get("/users");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe("POST /users", () => {
  test("crea usuario con datos válidos", async () => {
    const response = await request(app)
      .post("/users")
      .send({ name: "María López", email: "maria@example.com", age: 25 });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("María López");
    expect(response.body.email).toBe("maria@example.com");
  });

  test("rechaza request sin nombre", async () => {
    const response = await request(app).post("/users").send({ email: "test@example.com" });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toContain("requerido");
  });

  test("rechaza email con formato inválido", async () => {
    const response = await request(app)
      .post("/users")
      .send({ name: "Juan", email: "no-es-un-email" });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toContain("inválido");
  });

  test("rechaza request vacío", async () => {
    const response = await request(app).post("/users").send({});

    expect(response.statusCode).toBe(400);
  });

  test("rechaza edad que no es número", async () => {
    const response = await request(app)
      .post("/users")
      .send({ name: "Pedro", email: "pedro@test.com", age: "veinte" });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toContain("número");
  });
});
