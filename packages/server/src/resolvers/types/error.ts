import { Field, ObjectType } from "type-graphql";

@ObjectType()
class FieldError {
  @Field()
  field?: string;
  @Field()
  message: string;
}

@ObjectType()
class QueryError {
  @Field()
  code: number;
  @Field()
  message: string;
}

export { FieldError, QueryError };
