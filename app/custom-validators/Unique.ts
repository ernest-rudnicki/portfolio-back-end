import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";
import { Model } from "mongoose";
import { DocumentType } from "@typegoose/typegoose";
import { BeAnObject } from "@typegoose/typegoose/lib/types";

import { createValidationDecorator } from "./helpers";

type UniqueValidationArguments<Entity> = {
  property: keyof Entity;
  constraints: [Model<Entity>];
} & ValidationArguments;

export type UniqueFindCondition<Model> = {
  [P in keyof DocumentType<Model, BeAnObject>]?: any;
};

@ValidatorConstraint({ name: "unique", async: true })
export class UniqueValidator implements ValidatorConstraintInterface {
  validate<Entity>(value: unknown, args: UniqueValidationArguments<Entity>) {
    const { property } = args;
    const [ModelClass] = args.constraints;
    const findCondition: UniqueFindCondition<Entity> = {};
    findCondition[property] = value;

    return ModelClass.findOne(findCondition).then((entity) => {
      if (entity) {
        return false;
      }
      return true;
    });
  }
  defaultMessage<Entity>(args: UniqueValidationArguments<Entity>) {
    const { property } = args;
    return `${property} value ($value) is not unique.`;
  }
}

export function Unique<Entity>(
  ModelClass: Model<Entity>,
  validationOptions?: ValidationOptions
) {
  return (object: unknown, propertyName: string) =>
    createValidationDecorator(object, propertyName, {
      options: validationOptions,
      constraints: [ModelClass],
      validator: UniqueValidator,
    });
}
