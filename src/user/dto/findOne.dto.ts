import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsAlphanumeric,
} from 'class-validator';
import {
  USER_USERNAME_MAX_LENGTH,
  USER_USERNAME_MIN_LENGTH,
} from '../user.entity';

/**
 * Select a user by their username
 */
export class FindOneDto {
  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  @MinLength(USER_USERNAME_MIN_LENGTH)
  @MaxLength(USER_USERNAME_MAX_LENGTH)
  username: string;
}
