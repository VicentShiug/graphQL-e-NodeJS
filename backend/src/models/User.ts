import { Length } from "class-validator";
import { __Type } from "graphql";
import { Field, ID, ObjectType } from "type-graphql";

export @ObjectType()
class User {

  @Field(__Type => ID)
  id: string

  @Field()
  @Length(10, 50)
  nome: string

}





