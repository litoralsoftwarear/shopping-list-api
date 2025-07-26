import { Router } from "express"
import { createUser, deleteUser, getAll, getUser, updateUser } from "../controllers/user.controllers"

export const userRoutes = Router()

userRoutes.get("/", getAll)
userRoutes.get("/:id", getUser)

userRoutes.post("/", createUser)

userRoutes.patch("/:id", updateUser)

userRoutes.delete("/:id", deleteUser)