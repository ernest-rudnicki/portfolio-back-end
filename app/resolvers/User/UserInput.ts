import { InputType, Field } from 'type-graphql';
import { IsEmail, Length } from 'class-validator';
import { User, UserModel } from '../../entities/User';
import { isStrongPassword } from '../../custom-validators/isStrongPassword';
import { Unique } from '../../custom-validators/Unique';

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  @Length(1, 255)
  firstName: string;

  @Length(1, 255)
  @Field()
  lastName: string;

  @Field()
  @IsEmail()
  @Unique(UserModel)
  email: string;
  
  @Field()
  @Length(1, 255)
  @isStrongPassword()
  password: string;
}
