import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { JWT_EXPIRATION_TIME, JWT_SECRET_KEY } from "../config/jwt.config"
import { IJWTPayload } from "../domain/auth/auth.interfaces"

interface VerifyTokenPayload {
    data: IJWTPayload
    isExpired: boolean
    isUnsigned: boolean
}

export const verifyToken = (token: string): VerifyTokenPayload => {
    try {
        jwt.verify(token, JWT_SECRET_KEY)
        const decoded = jwt.decode(token) as IJWTPayload

        return {
            data: decoded,
            isExpired: false,
            isUnsigned: false
        }
    } catch (error) {
        const decoded = jwt.decode(token) as IJWTPayload

        if (!decoded) return {
            data: decoded,
            isUnsigned: true,
            isExpired: false
        }


        const now = Date.now() / 1000
        let isExpired = false
        if (decoded.exp && now > decoded.exp) isExpired = true

        return {
            data: decoded,
            isExpired,
            isUnsigned: false
        }
    }
}

const isAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization
        const tokenParsed = token?.replace("Bearer ", "")

        if (!tokenParsed) return res.status(401).json({ message: "No autorizado" })

        const verify = verifyToken(tokenParsed)
        
        if (verify.isUnsigned) return res.status(401).json({ message: "No autorizado" })
        if (verify.isExpired && !verify.data.rememberMe) return res.status(401).json({ message: "No autorizado" })
        if (verify.isExpired && verify.data.rememberMe) {
            const tokenRenewed = jwt.sign({ id: verify.data.id, rememberMe: true }, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRATION_TIME })
            req.body["tokenRenewed"] = tokenRenewed
            return next()
        }

        next()
    } catch (error) {
        res.status(500).json({ message: "Error al verificar el token" })
    }
}

export default isAuth