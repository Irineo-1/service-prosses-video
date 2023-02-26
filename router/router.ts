import express, { Router } from "express"
import { processVideo } from "../controller/processVideo"
import fileUpload from "express-fileupload"
import { scheduleJob } from "node-schedule"
import * as fs from 'fs'
import path from "path"
import cors from 'cors'

const allowedOrigins = ['http://localhost'];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200
};

const router: Router = express.Router()

router.post("/process_video", cors(options), fileUpload(), processVideo)

router.get("/download_video/:file_name", cors(options), (req, res) => {

    const routeFile = `./temporalvideos/${req.params.file_name}`

    if( fs.existsSync(routeFile) )
    {
        const extVideo = path.extname(req.params.file_name)
        res.setHeader('Content-Type', `video/${extVideo.replace('.','')}`)
        res.setHeader('Content-Disposition', `attachment; filename=${req.params.file_name}`);

        const video = fs.createReadStream(routeFile);

        let timePetitionDownload = new Date()

        let hourDelete = timePetitionDownload.getHours() + 2
    
        timePetitionDownload.setHours(hourDelete)
    
        scheduleJob(timePetitionDownload, () => {
            if( fs.existsSync(routeFile) ) fs.unlinkSync(routeFile)
        })
        video.pipe(res);
    }
    else
    {
        res.send("File not found").status(404)
    }
})

export default router