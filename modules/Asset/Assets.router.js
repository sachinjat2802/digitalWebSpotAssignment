import { Router } from "express";
import AssetUploadController from "./Assets.controller.js";
const router = Router();

router.post("/uploadSingleImage", AssetUploadController.uploadSingleImage);

export default router;
