import { Request } from "express";

export const getToken = (req: Request) => req.headers.authorization?.replace("Bearer ", "") || ""