import jwt from "jsonwebtoken"
import { JWT_SECRET_KEY } from "../config/jwt.config"
import { verifyToken } from "./isAuth"

async function main() {
    const tokenExpired = jwt.sign({ id: 1, rememberMe: false }, JWT_SECRET_KEY, { expiresIn: "1s" })
    const tokenExpiredRemember = jwt.sign({ id: 2, rememberMe: true }, JWT_SECRET_KEY, { expiresIn: "1s" })
    const token = jwt.sign({ id: 2, rememberMe: true }, JWT_SECRET_KEY, { expiresIn: "5d" })

    await new Promise((resolve) => {
        setTimeout(() => resolve(true), 2000)
    })

    // Token expirado y no recordar
    console.log(verifyToken(tokenExpired))

    // Token expirado y recordar
    console.log(verifyToken(tokenExpiredRemember))

    // Token no expirado
    console.log(verifyToken(token))

    // Token no válido
    console.log(verifyToken("aasdasdas"))
}

// Ejecutar test
main()