import prisma from "../../database";
import { Prisma, User } from "../../generated/prisma";

export const getUser = async ({ id }: { id: number }): Promise<User | null> => {
    try {
        const user = await prisma.user.findUnique({ where: { id } })

        return user
    } catch (error) {
        throw error
    }
}


export const getUsers = async ({ }): Promise<User[]> => {
    try {
        const users = await prisma.user.findMany({ orderBy: { name: "asc" } })

        return users
    } catch (error) {
        throw error
    }
}

interface IUserData {
    id?: number

    name: string
    username: string
    password: string
}

export const createUser = async (data: IUserData) => {
    try {
        const user = await prisma.user.create({ data })

        return user
    } catch (error) {
        throw error
    }
}

export const updateUser = async ({ id, ...data }: IUserData) => {
    try {
        const user = await prisma.user.update({ where: { id }, data })

        return user
    } catch (error) {
        throw error
    }
}

export const deleteUser = async (id: number) => {
    try {
        const user = await prisma.user.delete({ where: { id } })

        return user
    } catch (error) {
        throw error
    }
}


interface IUsernameIsAvailable {
    username: string
    id?: number
    forUpdate?: boolean
}
export const userIsAvailable = async ({ username, id, forUpdate = false }: IUsernameIsAvailable): Promise<boolean> => {
    try {

        const where: Prisma.UserWhereUniqueInput = { username }

        if (forUpdate && id) where["NOT"] = { id: Number(id) }

        const user = await prisma.user.findUnique({ where })

        if (user) return false

        return true
    } catch (error) {
        throw error
    }
}