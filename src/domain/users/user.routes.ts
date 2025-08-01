import { Router } from "express"
import { deleteUser, getUser, updateUser } from "./user.controllers"
import { userExist, usernameIsAvailableUpdate } from "./user.middlewares"
import isAuth from "../../middlewares/isAuth"

export const userRoutes = Router()

userRoutes.use(isAuth, userExist)

userRoutes.get("/", getUser)
userRoutes.patch("/", usernameIsAvailableUpdate, updateUser)
userRoutes.delete("/", deleteUser)