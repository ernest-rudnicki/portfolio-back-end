import { Arg, Mutation, Query, Resolver } from "type-graphql";
import * as bcrypt from "bcryptjs";

import { RegisterInput } from "./RegisterInput";
import { User, UserModel } from "@entities/User";

@Resolver()
export class RegisterResolver {

    @Query(() => String)
    async hello() {
        return "Hello World";
    }

    @Mutation(() => User)
    async create(@Arg("data") {
        email,
        firstName,
        lastName,
        password,
    }: RegisterInput): Promise<User> {
        if (!process.env.PASSWORD_SALT) {
            throw new Error("Password salt was not provided");
        }

        const hashedPassword =  await bcrypt.hash(password, bcrypt.genSaltSync(parseInt(process.env.PASSWORD_SALT)));

        const user = await UserModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        return user;
    }
}   