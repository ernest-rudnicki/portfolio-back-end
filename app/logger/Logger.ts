import { EnvironmentType } from "@utils/types";
import winston, { format } from "winston";

export const logger = winston.createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

if (process.env.NODE_ENV !== EnvironmentType.PRODUCTION) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}
