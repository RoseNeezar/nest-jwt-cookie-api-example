import { Module, NestModule } from '@nestjs/common';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeService } from './like.service';
import { LikeEntity } from './like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LikeEntity]),
  ],
  controllers: [LikeController],
  providers: [
    LikeService
  ]
})
export class LikeModule implements NestModule {
  public configure() {}
}
