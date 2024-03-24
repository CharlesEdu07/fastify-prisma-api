import "dotenv/config"

import Fastify, { FastifyReply, FastifyRequest } from "fastify"
import fastifyJwt from "@fastify/jwt"

import userRoutes from "./modules/user/user.route";

import { userSchemas } from "./modules/user/user.schema";

const HOST = process.env.HOST;
const PORT = process.env.PORT;

export const server = Fastify();

server.register(fastifyJwt, {
    secret: "supersecret"
});

server.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        await request.jwtVerify();
    } catch (error) {
        return reply.code(401).send({ message: "Unauthorized" });
    }
})

server.get("/healthcheck", async function () {
    return { status: "ok" }
});

async function main() {
    for (const schema of userSchemas) {
        server.addSchema(schema);
    }

    server.register(userRoutes, { prefix: "api/users" });

    server.listen({
        host: typeof HOST == "string" ? HOST : "0.0.0.0",
        port: typeof PORT == "string" ? Number(PORT) : 3333
    }).then(() => {
        console.log(`Server is running on http://${HOST}:${3333}/`);
    });
}

main();