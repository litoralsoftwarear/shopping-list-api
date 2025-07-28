import { Request, Response } from "express"
import *  as userServices from "./user.services"
import ca from "zod/v4/locales/ca.cjs"

// SERVICIOS

export const createUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, username, password } = req.body

        const user = await userServices.createUser({ name, username, password })

        res.json({
            message: "¡El usuario se ha creado corretamente!",
            data: user
        })
    } catch (error) {
        res.status(500).json({ message: "Error al crear el usuario" })
    }
}

export const getAll = async (_: Request, res: Response): Promise<void> => {
    try {
        const users = await userServices.getUsers({})

        res.json({ data: users })
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios" })
    }

}

export const getUser = async (req: Request, res: Response): Promise<any> => res.json({ data: req.body.user })

export const updateUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params
        const { name, username, password } = req.body
        
        const user = await userServices.updateUser({ id: Number(id), name, username, password })
        
        res.json({ data: user })
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el usuario" })
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params

        const user = await userServices.deleteUser(Number(id))

        res.json({ data: user })

    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el usuario" })
    }
}