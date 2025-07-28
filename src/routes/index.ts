import { Router } from "express";
import { userRoutes } from "../domain/users/user.routes";
import { storeRoutes } from "./store.routes";
import { productRoutes } from "./product.routes";

const mainRoutes = Router()

mainRoutes.use("/users", userRoutes)
mainRoutes.use("/stores", storeRoutes)
mainRoutes.use("/products", productRoutes)

export default mainRoutes