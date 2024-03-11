import { FastifyInstance } from "fastify";
import { registerUserHandler } from "./user.controller";

async function userRoutes(server: FastifyInstance) {
    server.get("/", () => {
        return "Lista de usuários"
    })

    server.post("/", registerUserHandler)
}

export default userRoutes;