import { prismaClient } from "../../prisma/prisma";
import { CreateCommentInput } from "../dtos/input/comment.input";


export class CommentService {
    async create(ideaId: string, authorId: string, data: CreateCommentInput) {
        const findedIdea = await prismaClient.idea.findUnique({
            where: {
                id: ideaId
            }
        });

        if (!findedIdea) throw new Error('Ideia não encontrada!');

        return prismaClient.comment.create({
            data: {
                ideaId: ideaId,
                authorId: authorId,
                content: data.content
            }
        });
    }

    async listByIdea(ideaId: string) {
        return prismaClient.comment.findMany({
            where: {
                ideaId: ideaId
            }
        });
    };
}