import { prismaClient } from "../../prisma/prisma";
import { CreateUserInput } from "../dtos/input/user.input";

export class UserService {
    async createUser(data: CreateUserInput) {
        const findedUser = await prismaClient.user.findUnique({
            where: {
                email: data.email
            }
        });

        if (findedUser) throw new Error('Usuário já cadastrado!');

        return prismaClient.user.create({
            data: {
                name: data.name,
                email: data.email
            }
        });
    };

    async findUser(id: string) {
        const user = await prismaClient.user.findUnique({
            where: {
                id: id
            }
        });

        if (!user) throw new Error('Usuário não existe');

        return user;
    };

    async listUsers() {
        return await prismaClient.user.findMany();
    }
}