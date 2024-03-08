import "dotenv/config"

import fastify from "fastify"

const app = fastify()

app.get("/healthcheck", async function () {
    return { status: "ok" }
})

app.get("/user", () => {
    return "Lista de usuários"
})

app.post("/user", () => {
    return "Criar usuário"
})

app.put("/user", () => {
    return "Atualizar usuário"
})

app.delete("/user", () => {
    return "Deletar usuário"
})

const HOST = process.env.HOST
const PORT = process.env.PORT

app.listen({
    host: typeof HOST == "string" ? HOST : "0.0.0.0",
    port: typeof PORT == "string" ? Number(PORT) : 3333
}).then(() => {
    console.log(`Server is running on http://${HOST}:${3333}/`);
});
