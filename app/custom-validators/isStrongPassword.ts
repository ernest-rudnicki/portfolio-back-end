import {
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { PASSWORD_REGEX } from "@constants/constants";

import { AnyObject } from "@utils/types";

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
  return function (object: AnyObject, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      validator: IsStrongPasswordValidator,
    });
  };
}
