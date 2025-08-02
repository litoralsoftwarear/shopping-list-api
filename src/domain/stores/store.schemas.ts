import z from "zod";

export const storeSchema = z.object({
    name: z.string("El campo 'name' debe ser un string").nonempty("El campo 'name' no debe estar vacío"),
    image: z.url("El campo 'image' de ser una URL").nonempty("El campo 'image' no debe estar vacío"),
    description: z.string("El campo 'description' debe ser un string").optional().or(z.literal(""))
})