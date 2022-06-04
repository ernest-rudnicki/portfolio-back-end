import { ObjectType, Field, ID, Root, } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';

@ObjectType({ description: 'The User model' })
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  @Property({ required: true, unique: true })
  email: String;

  @Property({ required: true })
  firstName: String;

  @Property({ required: true })
  lastName: String

  @Field()
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Field()
  @Property({ default: new Date() })
  creationDate: Date;

  @Property({ required: true })
  password: String;
  
}

export const UserModel = getModelForClass(User);