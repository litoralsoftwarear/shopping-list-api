import { Router } from "express"
import { createUser, deleteUser, getAll, getUser, updateUser } from "./user.controllers"
import { validateSchema } from "../../middlewares/validateSchema"
import { userCreateSchema } from "../../schemas/user.schemas"
import { userExist, usernameIsAvailable, usernameIsAvailableUpdate } from "./user.middlewares"

export const userRoutes = Router()

userRoutes.get("/", getAll)

userRoutes.get("/:id", userExist, getUser)

userRoutes.post("/", validateSchema(userCreateSchema), usernameIsAvailable, createUser)

userRoutes.patch("/:id", userExist, usernameIsAvailableUpdate, updateUser)

userRoutes.delete("/:id", userExist, deleteUser)