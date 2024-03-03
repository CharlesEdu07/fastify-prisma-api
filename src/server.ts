import fastify from "fastify";

const app = fastify();

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

app.listen({
    host: "0.0.0.0",
    port: 3333,
}).then(() => {
    console.log("Server is running on http://localhost:3333/");
});
