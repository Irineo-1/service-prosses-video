import express, { Router } from "express"
import { processVideo } from "../controller/processVideo"

const router: Router = express.Router()

router.get("/process_video", processVideo)

export default router