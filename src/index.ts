import express from "express"
import cors from "cors"
import mainRoutes from "./routes"

const app = express()

app.use(cors({ origin: "*" }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(mainRoutes)

app.listen(4000, () => console.log("Server running on port 4000"))