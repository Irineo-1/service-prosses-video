import { Request, Response } from "express"
import { v4 as uuidv4 } from 'uuid'
import { spawn } from "child_process"
import { fileData } from '../interfaces/req_files'
import * as fs from 'fs'
import { UploadedFile } from "express-fileupload"

const processVideo = async (req: Request, res: Response) =>
{
    let ramdomFinalName: string = uuidv4()
    let ramdomBlob: string = uuidv4()

    const route_blobs = `./temparalVideos/${ramdomBlob}`
    const route_Video = `./temparalVideos/${ramdomFinalName}`

    const FileData: fileData = req.body

    const File = req.files!.File as UploadedFile

    File.mv(`${route_blobs}`, err => {
    
        const paramsFF = `-b:a 128k -c:a aac -c:v libx264 -framerate ${FileData.Fps} -filter:v scale=${FileData.Ancho}x${FileData.Ancho}`
        const comandoShellFF = `ffmpeg -i ${route_blobs} ${paramsFF} ${route_Video}.${FileData.Extencion}`

        const ls = spawn(comandoShellFF,[], {shell: true})
    
        ls.stdout.on("data", data => {
            console.log(`stdout: ${data}`)
        })
        
        ls.stderr.on("data", data => {
            console.log(`stderr: ${data}`)
        })
        
        ls.on('error', (error) => {
            console.log(`error: ${error.message}`)
        })
        
        ls.on("close", code => {
            console.log(`child process exited with code ${code}`)
            fs.unlinkSync(route_blobs)
            res.status(200).send(ramdomFinalName)
        })
    })
}

export { processVideo }