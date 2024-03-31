import prisma from "../../utils/prisma";
import { CreateProductInput } from "./product.schema";

export async function createProduct(data: CreateProductInput & { ownerId: number }) {
    return prisma.product.create({
        data,
    });
}