import { Field, ObjectType, ID } from "type-graphql";
import { UserModel } from "./user.model";
import { IdeaModel } from "./idea.model";

@ObjectType()
export class VoteModel {
    @Field(() => ID)
    id!: string

    @Field(() => String)
    userId!: string

    @Field(() => UserModel, { nullable: true })
    user?: UserModel

    @Field(() => String)
    ideaId!: string

    @Field(() => IdeaModel, { nullable: true })
    idea?: IdeaModel
}