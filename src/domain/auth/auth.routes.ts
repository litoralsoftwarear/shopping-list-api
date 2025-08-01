import { Router } from "express"
import * as authControllers from "./auth.controllers"
import * as authSchemas from "./auth.schemas"
import * as userSchemas from "../users/user.schemas"
import { validateSchema } from "../../middlewares/validateSchema"
import { usernameIsAvailable } from "../users/user.middlewares"

const authRoutes = Router()

authRoutes.post("/login", validateSchema(authSchemas.loginSchema), authControllers.login)
authRoutes.post("/register", validateSchema(userSchemas.userCreationSchema), usernameIsAvailable, authControllers.register)

export default authRoutes