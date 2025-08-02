import prisma from "@/database"
import { Store } from "@/generated/prisma"


interface IStore {
    name: string
    image: string
    description?: string
}


interface ICreateStore extends IStore {
    userId: number
}

export const createStore = async (data: ICreateStore): Promise<Store> => {
    try {
        const store = await prisma.store.create({ data })

        return store
    } catch (error) {
        throw error
    }
}

export const getStoresByUserId = async ({ userId }: { userId: number }): Promise<Store[]> => {
    try {
        const stores = await prisma.store.findMany({ where: { userId } })

        return stores
    } catch (error) {
        throw error
    }
}

export const getStoreById = async ({ id }: { id: number }): Promise<Store | null> => {
    try {
        const store = await prisma.store.findUnique({ where: { id } })

        return store
    } catch (error) {
        throw error
    }
}

interface IUpdateStoreById extends IStore {
    id: number
}

export const updateStoreById = async ({ id, ...data }: IUpdateStoreById): Promise<Store> => {
    try {
        const store = await prisma.store.update({ where: { id }, data })

        return store
    } catch (error) {
        throw error
    }
}