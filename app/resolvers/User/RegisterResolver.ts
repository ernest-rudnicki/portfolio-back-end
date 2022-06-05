import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import * as bcrypt from "bcryptjs";

import { RegisterInput } from "./input/RegisterInput";
import { User, UserModel } from "@entities/User";
import { Role } from "@utils/types";

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return "Hello World";
  }

  @Authorized([Role.ADMINISTRATOR])
  @Mutation(() => User)
  async create(
    @Arg("data") { email, firstName, lastName, password, role }: RegisterInput
  ): Promise<User> {
    if (!process.env.PASSWORD_SALT) {
      throw new Error("Password salt was not provided");
    }

    const hashedPassword = await bcrypt.hash(
      password + process.env.PASSWORD_SECRET,
      bcrypt.genSaltSync(parseInt(process.env.PASSWORD_SALT))
    );

    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      role,
      password: hashedPassword,
    });

    return user;
  }
}
