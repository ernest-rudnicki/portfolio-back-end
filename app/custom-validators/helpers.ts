import { isAnyObject } from "@utils/utils";
import { registerDecorator, ValidationDecoratorOptions } from "class-validator";

export function createValidationDecorator(
  object: unknown,
  propertyName: string,
  options: Omit<ValidationDecoratorOptions, "target" | "propertyName">
) {
  if (!isAnyObject(object)) {
    throw Error("First param provided to decorator must be an object");
  }

  registerDecorator({
    target: object.constructor,
    propertyName,
    ...options,
  });
}
