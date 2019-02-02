import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { TokenDto } from '../auth/dto/token.dto';

import { UserStatusDto } from './dto/status.dto';
import { UserExtendedStatusDto } from './dto/extendedStatus.dto';
import { Token } from '../auth/auth.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';
import { LikeService } from '../like/like.service';
import { FindOneDto } from './dto/findOne.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly likeService: LikeService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('me')
  async userStatus(@Token() token: TokenDto): Promise<UserStatusDto> {
    const user = await this.userService.findOneOrFail({ id: token.id });
    return {
      username: user.username,
    };
  }

  @Get(':username')
  async findOne(@Param() params: FindOneDto): Promise<UserExtendedStatusDto> {
    // get user
    const user = await this.userService.findOneOrFail({
      username: params.username,
    });

    // get likes
    const likes = await this.likeService.countTarget(user);

    return {
      username: user.username,
      likes,
    } as UserExtendedStatusDto;
  }
}
