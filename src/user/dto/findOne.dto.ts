import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import {
  USER_USERNAME_MAX_LENGTH,
  USER_USERNAME_MIN_LENGTH,
  USER_USERNAME_REGEX,
} from '../user.entity';

/**
 * Select a user by their username
 */
export class FindOneDto {
  @IsNotEmpty()
  @IsString()
  @Matches(USER_USERNAME_REGEX)
  @MinLength(USER_USERNAME_MIN_LENGTH)
  @MaxLength(USER_USERNAME_MAX_LENGTH)
  username: string;
}
