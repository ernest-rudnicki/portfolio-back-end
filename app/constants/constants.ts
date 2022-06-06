export const PASSWORD_REGEX =
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
export const AUTH_COOKIE_NAME = "token";
export const USER_ID_COOKIE_NAME = "userId";

export const enum EnvironmentType {
  DEVELOPMENT = "DEVELOPMENT",
  PRODUCTION = "PRODUCTION",
}
