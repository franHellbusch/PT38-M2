import { Router } from "express";
import { createBook, demo, getAllBooks, getBookById } from "../controllers/booksController.js";

const booksRouter = Router();

booksRouter.get("/", getAllBooks);
booksRouter.get("/:id", getBookById);
booksRouter.post("/", createBook);
booksRouter.get("/demo/:id", demo);

export default booksRouter;
