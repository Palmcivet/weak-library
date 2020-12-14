import { Field, ObjectType } from "type-graphql";

@ObjectType({ description: "Authentication Type" })
export class AuthType {
	@Field((type) => String)
	identity!: string;

	@Field((type) => String)
	password!: string;
}
