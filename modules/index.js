import { Router } from "express";

import {taskRouter} from "./tasks/router.js";
import assetRouter from "./Asset/Assets.router.js";
const router = Router();

router.use("/tasks",taskRouter);
router.use("/assets",assetRouter);


export default router;
