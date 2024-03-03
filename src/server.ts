import fastify from "fastify";

const app = fastify();

app.get("/user", () => {
    return "Rota de usuário";
})

app.listen({
    host: "0.0.0.0",
    port: 3333,
}).then(() => {
    console.log("Server is running on http://localhost:3333/");
});
