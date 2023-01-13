import express, { Express } from "express"
import router from "./router/router"

const app: Express = express()
const port: number = 3000

app.use("/api",router)
app.use(express.json())

app.listen(port, () => {
    console.log("ejecutandoce en el puerto: ", port)
})