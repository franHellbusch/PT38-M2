import { Router } from "express";
import booksRouter from "./booksRouter.js";

const router = Router();

router.use("/books", booksRouter);

export default router;
