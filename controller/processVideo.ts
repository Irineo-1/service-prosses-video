import { Request, Response } from "express"

const processVideo = (req: Request, res: Response) =>
{
    console.log("files ============> ", req.files)
    console.log("data ==============> ", req.body)
    res.status(200).send("que tal")
}

export { processVideo }