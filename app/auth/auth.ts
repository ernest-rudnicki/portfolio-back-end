import { TokenModel } from "@entities/Token";
import { isDocument } from "@typegoose/typegoose";
import { ApiContext, Role } from "@utils/types";
import { isLessThan24HourAgo } from "@utils/utils";

export async function authChecker(
  { context }: { context: ApiContext },
  roles?: Role[]
): Promise<boolean> {
  const { signedCookies } = context.req;

  if (!signedCookies.token) {
    return false;
  }

  const token = await TokenModel.findOne({
    token: signedCookies.token,
  });

  if (!token) {
    return false;
  }

  const { creationDate } = token;
  if (!isLessThan24HourAgo(creationDate)) {
    return false;
  }

  await token.populate("user");
  const { user } = token;

  if (!isDocument(user)) {
    return false;
  }

  if (!roles) {
    return true;
  }

  return roles.includes(user.role);
}
