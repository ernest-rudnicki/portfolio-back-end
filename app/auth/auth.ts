import { isDocument } from "@typegoose/typegoose";

import { AUTH_COOKIE_NAME } from "@constants/constants";
import { TokenModel } from "@entities/Token";
import { ApiContext, Role } from "@utils/types";
import { isLessThanHoursAgo } from "@utils/utils";

export async function authChecker(
  { context }: { context: ApiContext },
  roles: Role[]
): Promise<boolean> {
  // for some reason typegraphql wraps roles with array even though its undefined
  if (!roles[0]) {
    return true;
  }

  const { signedCookies } = context.req;
  const tokenValue = signedCookies[AUTH_COOKIE_NAME];

  if (!tokenValue) {
    return false;
  }

  const token = await TokenModel.findOne({
    token: tokenValue,
  });

  if (!token) {
    return false;
  }

  const { creationDate } = token;
  if (!isLessThanHoursAgo(creationDate, 24)) {
    return false;
  }

  await token.populate("user");
  const { user } = token;

  if (!isDocument(user)) {
    return false;
  }

  if (Array.isArray(roles)) {
    return roles.includes(user.role);
  }

  if (roles === Role.ANY) {
    return true;
  }

  return roles === user.role;
}
