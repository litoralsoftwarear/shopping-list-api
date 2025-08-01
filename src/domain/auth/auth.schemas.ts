import z from "zod";

export const loginSchema = z.object({
    username: z.string("El 'username' deber ser de tipo 'string'").nonempty("El 'username' no puede estar vacio"),
    password: z.string("El 'password' deber ser de tipo 'string'").nonempty("El 'password' no puede estar vacio"),
})