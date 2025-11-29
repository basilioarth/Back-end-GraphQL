import { prismaClient } from "../../prisma/prisma";
import { CreateIdeaInput, UpdateIdeaInput } from "../dtos/input/idea.input";


export class IdeaService {
    async createIdea(data: CreateIdeaInput, authorId: string) {
        return prismaClient.idea.create({
            data: {
                title: data.title,
                description: data.description,
                authorId: authorId
            }
        });
    };

    async updateIdea(id: string, data: UpdateIdeaInput) {
        const idea = await prismaClient.idea.findUnique({
            where: {
                id: id
            }
        });

        if (!idea) throw new Error('Ideia não encontrada');

        return prismaClient.idea.update({
            where: { id: id },
            data: {
                title: data.title,
                description: data.description
            }
        });
    }
}