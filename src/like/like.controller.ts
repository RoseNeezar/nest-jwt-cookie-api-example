import {
  Controller,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { LikeService } from './like.service';
import { FindOneDto } from '../user/dto/findOne.dto';
import { Token } from '../auth/auth.decorator';
import { TokenDto } from '../auth/dto/token.dto';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(AuthGuard)
  @Post('user/:username/like')
  async likeUser(
    @Res() res,
    @Req() req,
    @Param() params: FindOneDto,
    @Token() token: TokenDto,
  ): Promise<null> {
    await this.likeService.likeUsername(token.id, params.username);
    res.status(HttpStatus.NO_CONTENT);
    return res.send();
  }

  @UseGuards(AuthGuard)
  @Post('user/:username/unlike')
  async unlikeUser(
    @Res() res,
    @Param() params: FindOneDto,
    @Token() token: TokenDto,
  ): Promise<null> {
    await this.likeService.unlikeUsername(token.id, params.username);
    res.status(HttpStatus.NO_CONTENT);
    return res.send();
  }
}
