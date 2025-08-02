import { getToken } from "@/utils/token"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { IJWTPayload } from "../auth/auth.interfaces"
import * as storeServices from "./store.services"

export const getStores = async (req: Request, res: Response) => {
    try {
        const { id } = jwt.decode(getToken(req)) as IJWTPayload

        const store = await storeServices.getStoresByUserId({ userId: id })

        res.json({
            payload: store
        })
    } catch (error) {
        res.status(500).json({
            message: "Error recuperando la lista de tiendas"
        })
    }
}

export const updateStore = async (req: Request, res: Response) => {
    try {
        const { storeId } = req.params


        const store = await storeServices.updateStoreById({ id: Number(storeId), ...req.body })


        res.json({ payload: store })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error actualizando la tienda"
        })
    }
}

export const createStore = async (req: Request, res: Response) => {
    try {
        const { id } = jwt.decode(getToken(req)) as IJWTPayload

        const store = await storeServices.createStore({ userId: id, ...req.body })

        res.json({
            message: "¡Tienda creada correctamente!",
            payload: store
        })
    } catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error creando la tienda"
        })
    }
}