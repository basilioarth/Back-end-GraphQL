import { Field, ObjectType, ID, GraphQLISODateTime } from "type-graphql";

@ObjectType()
export class UserModel {
    @Field(() => ID)
    id!: string

    @Field(() => String)
    name!: string

    @Field(() => String)
    email!: string

    @Field(() => String, { nullable: true })
    role?: string

    @Field(() => String, { nullable: true })
    password?: string

    @Field(() => GraphQLISODateTime)
    createdAt!: Date

    @Field(() => GraphQLISODateTime)
    updatedAt!: Date
}