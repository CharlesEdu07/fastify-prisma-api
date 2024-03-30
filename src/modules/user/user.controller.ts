import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, findUserByEmail } from "./user.service";
import { CreateUserInput, LoginInput } from "./user.schema";
import { verifyPassword } from "../../utils/hash";
import { server } from "../../app";

export async function registerUserHandler(
    request: FastifyRequest<{
        Body: CreateUserInput
    }>,
    reply: FastifyReply
) {
    const body = request.body;

    try {
        const user = await createUser(body);

        return reply.status(201).send(user);
    } catch (error) {
        console.log(error);

        reply.status(500).send(error);
    }
}

export async function loginHandler(
    request: FastifyRequest<{
        Body: LoginInput;
    }>,
    reply: FastifyReply
) {
    const user = await findUserByEmail(request.body.email);

    if (!user) {
        return reply.status(404).send({
            message: "Invalid email or password",
        });
    }

    const correctPassword = verifyPassword({
        candidatePassword: request.body.password,
        salt: user.salt,
        hash: user.password,
    });

    if (correctPassword) {
        const { password, salt, ...rest } = user;

        return { accessToken: server.jwt.sign(rest) };
    }

    return reply.status(404).send({
        message: "Invalid email or password",
    });
}