import { FastifyInstance } from "fastify";
import { registerUserHandler } from "./user.controller";
import { $ref } from "./user.schema";

async function userRoutes(server: FastifyInstance) {
    server.get("/", () => {
        return "Lista de usuários"
    })

    server.post("/", {
        schema: {
            body: $ref('createUserSchema'),
            response: {
                201: $ref('createUserResponseSchema')
            }
        }
    }, registerUserHandler);
}

export default userRoutes;