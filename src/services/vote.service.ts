import { prismaClient } from "../../prisma/prisma";


export class VoteService {
    async toggleVote(userId: string, ideaId: string): Promise<boolean> {
        const existingVote = await prismaClient.vote.findUnique({
            where: {
                userId_ideaId: {
                    userId: userId,
                    ideaId: ideaId
                }
            }
        });

        if (existingVote) {
            await prismaClient.vote.delete({
                where: {
                    userId_ideaId: {
                        userId: userId,
                        ideaId: ideaId
                    }
                }
            });
        } else {
            await prismaClient.vote.create({
                data: {
                    userId: userId,
                    ideaId: ideaId
                }
            });
        }

        return true;
    }

    async listVotesByIdea(ideaId: string) {
        return prismaClient.vote.findMany({
            where: {
                ideaId: ideaId
            }
        });
    };

    async countVotesByIdea(ideaId: string) {
        return prismaClient.vote.count({
            where: {
                ideaId: ideaId
            }
        });
    };
}