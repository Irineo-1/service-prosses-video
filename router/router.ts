import express, { Router } from "express"
import { processVideo } from "../controller/processVideo"
import fileUpload from "express-fileupload"

const router: Router = express.Router()

router.post("/process_video", fileUpload(), processVideo)

export default router