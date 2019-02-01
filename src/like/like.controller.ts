import {
  Controller,
  Get
} from '@nestjs/common';

@Controller('like')
export class LikeController {
  @Get('most-liked')
  async mostLiked(): Promise<null> {
    return null;
  }
}

