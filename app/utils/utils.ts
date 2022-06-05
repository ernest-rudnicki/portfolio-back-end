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
