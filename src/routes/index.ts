import { Router } from "express";
import { userRoutes } from "../domain/users/user.routes";
import { storeRoutes } from "../domain/stores/store.routes";
import { productRoutes } from "../domain/products/product.routes";
import authRoutes from "../domain/auth/auth.routes";

const mainRoutes = Router()

mainRoutes.use("/auth", authRoutes)
mainRoutes.use("/users", userRoutes)
mainRoutes.use("/stores", storeRoutes)
mainRoutes.use("/products", productRoutes)

export default mainRoutes