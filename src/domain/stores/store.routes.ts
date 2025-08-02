import isAuth from "@/middlewares/isAuth";
import { validateSchema } from "@/middlewares/validateSchema";
import { Router } from "express";
import { storeSchema } from "./store.schemas";
import * as storeControllers from "./store.controllers";
import { checkShopOwnership } from "./store.middlewares";

export const storeRoutes = Router()

storeRoutes.use(isAuth)
storeRoutes.use("/:storeId", checkShopOwnership)

storeRoutes.get("/", storeControllers.getStores)

storeRoutes.put("/:storeId", validateSchema(storeSchema), storeControllers.updateStore)

storeRoutes.post("/", validateSchema(storeSchema), storeControllers.createStore)