import { Resolver, Arg, Mutation, FieldResolver, Root } from "type-graphql";
import { CommentModel } from "../models/comment.model";
import { CreateCommentInput } from "../dtos/input/comment.input";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { User } from "@prisma/client";
import { CommentService } from "../services/comment.service";
import { IdeaModel } from "../models/idea.model";
import { UserModel } from "../models/user.model";
import { IdeaService } from "../services/idea.service";
import { UserService } from "../services/user.service";

@Resolver(() => CommentModel)
export class CommentResolver {
    private commentService = new CommentService();
    private ideaService = new IdeaService();
    private userService = new UserService();

    @Mutation(() => CommentModel)
    async CreateComment(
        @Arg('ideaId', () => String) ideaId: string,
        @Arg('data', () => CreateCommentInput) data: CreateCommentInput,
        @GqlUser() user: User
    ): Promise<CommentModel> {
        return this.commentService.create(ideaId, user.id, data);
    };

    @FieldResolver(() => IdeaModel)
    async idea(@Root() comment: CommentModel): Promise<IdeaModel> {
        return this.ideaService.findIdeaById(comment.ideaId);
    }

    @FieldResolver(() => UserModel)
    async author(@Root() comment: CommentModel): Promise<UserModel> {
        return this.userService.findUser(comment.authorId);
    }
}