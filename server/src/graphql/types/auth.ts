import { Field, ObjectType } from "type-graphql";

@ObjectType({ description: "Authentication Type" })
export class AuthType {
	@Field(() => String)
	identity!: string;

	@Field(() => String)
	password!: string;
}
