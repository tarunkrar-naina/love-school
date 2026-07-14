import { Router, type IRouter } from "express";
import healthRouter from "./health";
import chatRouter from "./chat";
import admissionRouter from "./admission";

const router: IRouter = Router();

router.use(healthRouter);
router.use(chatRouter);
router.use(admissionRouter);

export default router;
