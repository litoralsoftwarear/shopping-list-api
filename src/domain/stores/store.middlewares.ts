import { getToken } from "@/utils/token"
import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { IJWTPayload } from "../auth/auth.interfaces"
import { getStoreById } from "./store.services"

export const checkShopOwnership = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = jwt.decode(getToken(req)) as IJWTPayload
        const { storeId } = req.params

        const store = await getStoreById({ id: Number(storeId) })

        if (!store) return res.status(403).json({
            message: "Unauthorized"
        })

        if (store.userId !== id) return res.status(403).json({
            message: "Unauthorized"
        })


        next()

    } catch (error) {
        res.sendStatus(500)
    }
}
