import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class UserType {
	@Field((type) => String)
	identity!: string;

	@Field((type) => String)
	name!: string;
}
