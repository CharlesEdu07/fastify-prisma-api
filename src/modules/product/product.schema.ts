import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const productInput = {
    title: z.string(),
    price: z.string(),
    content: z.string().optional()
};

const productOutput = {
    id: z.string().uuid(),
    createdAt: z.string(),
    updatedAt: z.string()
};

const createProductSchema = z.object({
    ...productInput
});

const productResponseSchema = z.object({
    ...productInput, ...productOutput
});

const productsResponseSchema = z.array(productResponseSchema);

export type CreateProductInput = z.infer<typeof createProductSchema>;

export const { schemas: productSchemas, $ref } = buildJsonSchemas({
    createProductSchema,
    productResponseSchema,
    productsResponseSchema
});