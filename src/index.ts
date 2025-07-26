import express, { Request, Response } from "express"
import mainRoutes from "./routes"
const app = express()

app.use(express.json())

app.use(mainRoutes)

app.listen(4000, () => console.log("Server running on port 4000"))