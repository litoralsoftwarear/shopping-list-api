import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import * as userServices from "./user.services"
import { IJWTPayload } from "../auth/auth.interfaces"
import { getToken } from "../../utils/token"


export const userExist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = jwt.decode(getToken(req)) as IJWTPayload
        const user = await userServices.getUser({ id })

        if (!user) return res.status(404).json({ message: "El usuario no existe" })

        req.body["user"] = user

        next()
    } catch (error) {
        res.sendStatus(500)
    }
}

export const usernameIsAvailable = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { username } = req.body

        const usernameIsAvailable = await userServices.userIsAvailable({ username })

        if (!usernameIsAvailable) return res.status(400).json({ message: "El username ya existe" })

        next()
    } catch (error) {
        res.sendStatus(500)
    }
}

export const usernameIsAvailableUpdate = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.params
        const { username } = req.body
        // Valida que el username esté disponible
        const usernameIsAvailable = await userServices.userIsAvailable({ username, id: Number(id), forUpdate: true })

        if (!usernameIsAvailable) return res.status(400).json({ message: "El username ya existe" })

        next()
    } catch (error) {
        res.sendStatus(500)
    }
}