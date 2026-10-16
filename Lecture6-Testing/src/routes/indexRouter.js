import { Router } from "express";
import authorsRouter from "./authorsRouter.js";
import usersRouter from "./usersRouter.js";

const router = Router();

router.use("/authors", authorsRouter);
router.use("/users", usersRouter);

export default router;
