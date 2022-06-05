import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import * as bcrypt from "bcryptjs";

import { TokenModel } from "@entities/Token";
import { uidgen } from "@utils/uid";
import { ApiContext } from "@utils/types";
import { AUTH_COOKIE_NAME, USER_ID_COOKIE_NAME } from "@constants/constants";
import { User, UserModel } from "@entities/User";
import { getCookieConfig } from "@utils/utils";

@Resolver()
export class LoginResolver {
  @Mutation(() => User)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() context: ApiContext
  ) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw Error("Wrong email or password.");
    }

    const valid = bcrypt.compare(
      password + process.env.PASSWORD_SECRET,
      user.password
    );

    if (!valid) {
      throw Error("Wrong email or password.");
    }

    const { token } = await TokenModel.findOneAndUpdate(
      {
        user: user.id,
      },
      {
        token: uidgen.generateSync(),
        user: user.id,
        creationDate: new Date(),
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    context.res.cookie(AUTH_COOKIE_NAME, token, getCookieConfig());
    context.res.cookie(USER_ID_COOKIE_NAME, user.id, getCookieConfig());

    return user;
  }
}
