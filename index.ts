import express, { Express } from "express"
import router from "./router/router"
import cors from 'cors'

const app: Express = express()
const port: number = 3000

app.use("/api",router)
app.use(cors)
app.use(express.json())

app.listen(port, () => {
    console.log("servicion process video en el puerto: ", port)
})