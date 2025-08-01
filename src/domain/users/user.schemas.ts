import z from "zod";

const USERNAME_PATTERN = /^[a-zA-Z0-9._]+$/

export const userCreationSchema = z.object({
    name: z.string("El 'name' deber ser de tipo 'string'")
        .min(3, "El 'name' debe tener al menos 3 caracteres")
        .max(50, "El 'name' debe tener menos de 50 caracteres"),
    username: z.string("El 'username' deber ser de tipo 'string'")
        .regex(USERNAME_PATTERN, "Debe tener solo letras, guiones bajos, puntos o números.")
        .min(3, "El 'username' debe tener al menos 3 caracteres")
        .max(50, "El 'username' debe tener menos de 50 caracteres"),
    password: z.string("El 'password' deber ser de tipo 'string'")
        .min(6, "El 'password' debe tener al menos 6 caracteres")
        .max(50, "El 'password' debe tener menos de 50 caracteres"),
})