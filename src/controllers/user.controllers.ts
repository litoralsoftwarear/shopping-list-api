import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";
import prisma from "../database";

export const createUser = async (req: Request, res: Response): Promise<any> => {
    const { name, username, password } = req.body

    if (!name || !username || !password) return res.status(400).json({ message: "Todos los campos son obligatorios" })

    const userExist = await prisma.user.findUnique({ where: { username } })
    if (userExist) return res.status(400).json({ message: "El usuario ya existe" })

    const user = await prisma.user.create({
        data: { name, username, password }
    })

    res.json({
        message: "¡El usuario se ha creado corretamente!",
        data: user
    })
}

export const getAll = async (_: Request, res: Response): Promise<void> => {
    const users = await prisma.user.findMany()

    res.json({ data: users })
}

export const getUser = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params

    const user = await prisma.user.findUnique({ where: { id: Number(id) } })

    if (!user) return res.status(404).json({ message: "El usuario no existe" })

    res.json({ data: user })
}


export const updateUser = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params
    const { name, username, password } = req.body

    if (!name || !username || !password) return res.status(400).json({ message: "Todos los campos son obligatorios" })

    // Valida que el usuario exista
    const userExist = await prisma.user.findUnique({ where: { id: Number(id) } })
    if (!userExist) return res.status(404).json({ message: "El usuario no existe" })

    // Valida que el username esté disponible
    const usernameIsAvailable = await prisma.user.findUnique({ where: { username, NOT: { id: Number(id) } } })
    if (usernameIsAvailable) return res.status(404).json({ message: "El username ya existe" })

    const user = await prisma.user.update({
        where: { id: Number(id) },
        data: { name, username, password }
    })

    res.json({ data: user })
}

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params

    const userExist = await prisma.user.findUnique({ where: { id: Number(id) } })

    if (!userExist) {
        return res.status(404).json({
            message: "El usuario no existe"
        })
    }

    const user = await prisma.user.delete({ where: { id: Number(id) } })

    res.json({ data: user })
}