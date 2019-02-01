import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';

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
  async userStatus(
    @Token() token: TokenDto
  ): Promise<UserStatusDto> {
    let user = await this.userService.findOneOrFail({ id: token.id });
    return {
      username: user.username
    }
  }

  @Get(':username')
  async findOne(@Param('username') username: FindOneDto): Promise<UserStatusDto> {
    let user = await this.userService.findOneOrFail({username: username});
    return {
      username: user.username
    }
  }


}

