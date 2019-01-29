import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import {UserEntity} from "./user/user.entity";

@Module({
  imports : [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([UserEntity ]),
  ],
  controllers : [
  ]
})
export class AppModule {}