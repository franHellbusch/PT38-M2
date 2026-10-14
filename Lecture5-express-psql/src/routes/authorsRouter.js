import { Router } from "express";
import {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
} from "../controllers/authorsController.js";

const authorsRouter = Router();

authorsRouter.get("/", getAllAuthors);
authorsRouter.get("/:id", getAuthorById);
authorsRouter.post("/", createAuthor);
authorsRouter.put("/:id", updateAuthor);

export default authorsRouter;
