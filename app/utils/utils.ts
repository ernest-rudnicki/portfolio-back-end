import { AnyObject } from "./types";

export function buildConnectionString(
  username?: string,
  password?: string,
  unparsedConnectionString?: string
): string {
  if (!username) {
    throw new Error("Username was not provided for a connection string");
  }

  if (!password) {
    throw new Error("Password was not provided for a connection string");
  }

  if (!unparsedConnectionString) {
    throw new Error("Connection string was not provided");
  }

  let connectionString = unparsedConnectionString;
  connectionString = connectionString.replace("<username>", username);
  connectionString = connectionString.replace("<password>", password);

  return connectionString;
}

export function isAnyObject(object: unknown): object is AnyObject {
  return !!object && typeof object === "object";
}

export function getCookieExpirationDate(): Date {
  if (!process.env.COOKIE_EXPIRATION_PERIOD) {
    throw Error("Cookie expiration period was not provided");
  }

  return new Date(
    Date.now() + parseInt(process.env.COOKIE_EXPIRATION_PERIOD) * 60 * 60 * 1000
  );
}

export function isLessThanHoursAgo(date: Date, hours: number) {
  const hoursInMs = hours * 60 * 60 * 1000;

  const hoursAgo = Date.now() - hoursInMs;

  return date.getTime() > hoursAgo;
}

export function getCookieConfig() {
  return {
    expires: getCookieExpirationDate(),
    httpOnly: true,
    signed: true,
  };
}
