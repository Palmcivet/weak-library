import { Field, ObjectType, registerEnumType } from "type-graphql";

export enum EResponseCode {
	FAIL = -1,
	SUCCESS = 0,
	ERROR = 1,
}

registerEnumType(EResponseCode, {
	name: "EResponseCode",
	description: "Status code for each response",
});

@ObjectType()
export class ResponseType {
	@Field(() => EResponseCode)
	code!: EResponseCode;

	@Field(() => String)
	msg!: string;
}
