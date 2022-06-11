import { InputType, Field } from "type-graphql";
import { IsEmail, Length } from "class-validator";

import { User, UserModel } from "@entities/User";
import { Unique } from "@custom-validators/Unique";
import { isStrongPassword } from "@custom-validators/isStrongPassword";
import { Role } from "@utils/types";

@InputType()
export class UpdateUserInput implements Partial<User> {
  @Field({ nullable: true })
  @Length(1, 255)
  firstName?: string;

  @Field({ nullable: true })
  @Length(1, 255)
  lastName?: string;

  @Field({ nullable: true })
  @IsEmail()
  @Unique(UserModel)
  email?: string;

  @Field({ nullable: true })
  @Length(1, 255)
  @isStrongPassword()
  password?: string;

  @Field(() => Role, { nullable: true })
  role?: Role;
}
