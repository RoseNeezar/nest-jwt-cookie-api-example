import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';

import { TokenDto } from '../auth/dto/token.dto';

import { UserStatusDto } from './dto/status.dto';
import { Token } from '../auth/auth.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  async userStatus(
    @Token() token: TokenDto
  ): Promise<UserStatusDto> {
    let user = await this.userService.findOneOrFail({ id: token.id });
    return {
      username: user.username
    }
  }
}

