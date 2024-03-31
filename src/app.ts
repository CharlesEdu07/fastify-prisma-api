import Fastify, { FastifyReply, FastifyRequest } from "fastify";

import fjwt from "@fastify/jwt";

import userRoutes from "./modules/user/user.route";

import { userSchemas } from "./modules/user/user.schema";
import { productSchemas } from "./modules/product/product.schema";

export const server = Fastify();

declare module "fastify" {
    export interface FastifyInstance {
        authenticate: any;
    }
}

server.register(fjwt, {
    secret: "supersecret",
});

server.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        await request.jwtVerify();
    } catch (err) {
        return reply.send(err);
    }
});

server.get("/healthcheck", async function () {
    return {
        status: "OK",
    };
});

async function main() {
    for (const schema of [...userSchemas, ...productSchemas]) {
        server.addSchema(schema);
    }

    server.register(userRoutes, { prefix: "api/users" });

    try {
        await server.listen({
            host: "0.0.0.0",
            port: 3000,
        });

        console.log(`Server running at http://localhost:3000/`);
    } catch (err) {
        server.log.error(err);

        process.exit(1);
    }
}

main();