import { InputType, Field } from "type-graphql";
import { IsEmail, Length } from "class-validator";

import { User, UserModel } from "@entities/User";
import { Unique } from "@custom-validators/Unique";
import { isStrongPassword } from "@custom-validators/isStrongPassword";
import { Role } from "@utils/types";

@InputType()
export class RegisterInput implements Partial<User> {
  @Field()
  @Length(1, 255)
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;

  @Field()
  @IsEmail()
  @Unique(UserModel)
  email: string;

  @Field()
  @Length(1, 255)
  @isStrongPassword()
  password: string;

  // eslint-disable-next-line prettier/prettier
  @Field(() => Role)
  role: Role;
}
