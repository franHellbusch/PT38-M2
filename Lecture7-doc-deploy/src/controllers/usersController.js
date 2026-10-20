import { badRequest, conflict, notFound } from "../utils/errors.js";
import { validarEdad, validarEmail, validarNombre } from "../utils/validators.js";

let users = [
  { id: 1, name: "Ana García", email: "ana@example.com", age: 28 },
  { id: 2, name: "Carlos Ruiz", email: "carlos@example.com", age: 34 },
];
let nextId = 3;

export const getAllUsers = (req, res) => {
  res.json(users);
};

export const getUserById = (req, res, next) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (!user) return next(notFound("Usuario no encontrado"));

  res.json(user);
};

export const createUser = (req, res, next) => {
  const { name, email, age } = req.body;

  const errorNombre = validarNombre(name);
  if (errorNombre) return next(badRequest(errorNombre));

  const errorEmail = validarEmail(email);
  if (errorEmail) return next(badRequest(errorEmail));

  const errorEdad = validarEdad(age);
  if (errorEdad) return next(badRequest(errorEdad));

  const emailExists = users.some((u) => u.email === email);
  if (emailExists) return next(conflict("El email ya está registrado"));

  const user = { id: nextId++, name, email, age };

  users.push(user);

  res.status(201).json(user);
};

export const updateUser = (req, res, next) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));

  if (index === -1) return next(notFound("Usuario no encontrado"));

  users[index] = { ...users[index], ...req.body };

  res.json(users[index]);
};

export const deleteUser = (req, res, next) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));

  if (index === -1) return next(notFound("Usuario no encontrado"));

  users.splice(index, 1);

  res.json({ message: "Usuario eliminado" });
};
