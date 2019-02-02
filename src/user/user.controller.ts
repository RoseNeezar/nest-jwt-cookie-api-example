import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { TokenDto } from '../auth/dto/token.dto';

import { UserStatusDto } from './dto/status.dto';
import { Token } from '../auth/auth.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';
import { FindOneDto } from './dto/findOne.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  async userStatus(@Token() token: TokenDto): Promise<UserStatusDto> {
    const user = await this.userService.findOneOrFail({ id: token.id });
    return {
      username: user.username,
    };
  }

  @Get(':username')
  async findOne(@Param() params: FindOneDto): Promise<UserStatusDto> {
    const user = await this.userService.findOneOrFail({
      username: params.username,
    });
    return {
      username: user.username,
    };
  }
}
