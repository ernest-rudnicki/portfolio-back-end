import { InputType, Field } from "type-graphql";
import { IsEmail, Length } from "class-validator";

import { User, UserModel } from "@entities/User";
import { Unique } from "@custom-validators/Unique";
import { isStrongPassword } from "@custom-validators/isStrongPassword";

@InputType()
export class RegisterInput implements Partial<User> {
  @Field()
  @Length(1, 255)
  firstName: string;

  @Length(1, 255)
  @Field()
  lastName: string;

  @Field()
  @IsEmail()
  @Unique(UserModel)
  email: string;

  @Field()
  @Length(1, 255)
  @isStrongPassword()
  password: string;
}
