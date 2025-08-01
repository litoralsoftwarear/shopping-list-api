import prisma from "../../database"
import { User } from "../../generated/prisma"

interface IUserLogin {
    username: string
    password: string
}

export const userLogin = async ({ username, password }: IUserLogin): Promise<User | null> => {
    try {
        const user = await prisma.user.findUnique({ where: { username } })

        const passwordIsValid = user?.password === password

        if (!passwordIsValid) return null

        return user
    } catch (error) {
        throw error
    }
}