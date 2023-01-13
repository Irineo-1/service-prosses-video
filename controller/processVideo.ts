import { Request, Response } from "express"

const processVideo = (_req: Request, res: Response) =>
{
    res.send("que tal")
}

export { processVideo }