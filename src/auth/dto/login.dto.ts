import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import {
  USER_PASSWORD_MAX_LENGTH,
  USER_PASSWORD_MIN_LENGTH,
  USER_USERNAME_MAX_LENGTH,
  USER_USERNAME_MIN_LENGTH,
  USER_USERNAME_REGEX,
} from '../../user/user.entity';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @Matches(USER_USERNAME_REGEX)
  @MinLength(USER_USERNAME_MIN_LENGTH)
  @MaxLength(USER_USERNAME_MAX_LENGTH)
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(USER_PASSWORD_MIN_LENGTH)
  @MaxLength(USER_PASSWORD_MAX_LENGTH)
  readonly password: string;
}
