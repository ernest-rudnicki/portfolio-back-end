import { registerDecorator, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { PASSWORD_REGEX } from '../constants/constants';

@ValidatorConstraint({name: 'isStrongPassword'})
export class IsStrongPasswordValidator implements ValidatorConstraintInterface {
  validate(value: any) {
    return typeof value === 'string' && PASSWORD_REGEX.test(value);
  }
  
  defaultMessage() {
      return 'Password ($value) is not a strong password.';
  }
}

export function isStrongPassword() {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      validator: IsStrongPasswordValidator,
    });
  };
}