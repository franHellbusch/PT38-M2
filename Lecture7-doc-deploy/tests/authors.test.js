import { describe, test, expect, beforeEach, afterAll } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import pool from "../src/db/config.js";

beforeEach(async () => {
  await pool.query("TRUNCATE authors RESTART IDENTITY CASCADE");
  await pool.query(`
    INSERT INTO authors (name, email, bio) VALUES
      ('Ana García',  'ana@example.com',    'Full-stack dev'),
      ('Carlos Ruiz', 'carlos@example.com', 'Escritor técnico')
  `);
});

afterAll(async () => {
  await pool.end();
});

describe("GET /api/authors", () => {
  test("devuelve los autores sembrados", async () => {
    const response = await request(app).get("/authors");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty("name");
  });
});
