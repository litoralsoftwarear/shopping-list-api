import { JwtPayload } from "jsonwebtoken";

export interface IJWTPayload extends JwtPayload {
    id: number,
    rememberMe?: boolean
}