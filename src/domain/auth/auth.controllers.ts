import { Request, Response } from "express"
import * as authServices from "./auth.services"
import * as userServices from "../users/user.services"
import jwt from "jsonwebtoken"
import * as JWTConfig from "../../config/jwt.config"


export const login = async (req: Request, res: Response): Promise<any> => {
    try {
        const { username, password, rememberMe = false } = req.body

        const user = await authServices.userLogin({ username, password })

        if (!user) return res.status(401).json({ message: "Credenciales incorrectas" })

        const token = jwt.sign({ id: user.id, rememberMe }, JWTConfig.JWT_SECRET_KEY, { expiresIn: JWTConfig.JWT_EXPIRATION_TIME })

        res.json({
            message: "¡Has iniciado sesion correctamente!",
            data: { token }
        })
    } catch (error) {
        res.status(500).json({ message: "Error al iniciar sesion" })
    }
}

export const register = async (req: Request, res: Response): Promise<any> => {
    try {
        const user = await userServices.createUser(req.body)

        const token = jwt.sign({ id: user.id }, JWTConfig.JWT_SECRET_KEY, { expiresIn: JWTConfig.JWT_EXPIRATION_TIME })

        res.json({
            message: "¡El usuario se ha creado corretamente!",
            data: { token }
        })
    } catch (error) {
        res.status(500).json({ message: "Error al crear el usuario" })
    }
}