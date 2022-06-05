import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

import { PASSWORD_REGEX } from "@constants/constants";
import { createValidationDecorator } from "./helpers";
@ValidatorConstraint({ name: "isStrongPassword" })
export class IsStrongPasswordValidator implements ValidatorConstraintInterface {
  validate(value: unknown) {
    return typeof value === "string" && PASSWORD_REGEX.test(value);
  }

  defaultMessage() {
    return "Password ($value) is not a strong password.";
  }
}

export function isStrongPassword() {
  return (object: unknown, propertyName: string) =>
    createValidationDecorator(object, propertyName, {
      validator: IsStrongPasswordValidator,
    });
}
