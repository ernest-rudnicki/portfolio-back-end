import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { AnyParamConstructor, BeAnObject } from '@typegoose/typegoose/lib/types';
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
  
  type UniqueFindCondition<Model> = { [P in keyof DocumentType<Model, BeAnObject>]?: any; };
  type Model<Entity> = ReturnModelType<AnyParamConstructor<Entity>, BeAnObject>;

  type UniqueValidationArguments<Entity> = {
    property: keyof Entity;
    constraints: [Model<Entity>];
  } & ValidationArguments
  
  @ValidatorConstraint({name: 'unique', async: true })
  export class UniqueValidator implements ValidatorConstraintInterface {
    validate<Entity>(value: any, args: UniqueValidationArguments<Entity>) {
        const { property } = args;
        const [ModelClass] = args.constraints;
        const findCondition: UniqueFindCondition<Entity> = {};
        findCondition[property] = value;

        return ModelClass.findOne(findCondition).then(entity => {
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

  export function Unique<Entity>(ModelClass: Model<Entity>, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [ModelClass],
        validator: UniqueValidator,
      });
    };
  }