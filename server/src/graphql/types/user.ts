import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UserType {
	@Field(() => String)
	identity!: string;

	@Field(() => String)
	name!: string;
}
