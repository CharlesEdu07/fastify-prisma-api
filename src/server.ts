import "dotenv/config"

import fastify from "fastify"
import userRoutes from "./modules/user/user.route"

const HOST = process.env.HOST
const PORT = process.env.PORT

const server = fastify()

server.get("/healthcheck", async function () {
    return { status: "ok" }
})

async function main() {
    server.register(userRoutes, { prefix: "api/users" })

    server.listen({
        host: typeof HOST == "string" ? HOST : "0.0.0.0",
        port: typeof PORT == "string" ? Number(PORT) : 3333
    }).then(() => {
        console.log(`Server is running on http://${HOST}:${3333}/`);
    });
}

main()