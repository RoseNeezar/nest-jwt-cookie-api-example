import { Test } from '@nestjs/testing';

import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { LikeService } from './like.service';

import { AppModule } from '../app.module';

import { Connection } from 'typeorm';

describe('LikeService', () => {
  let userService: UserService;
  let likeService: LikeService;
  let connection: Connection;

  let user1: UserEntity;
  const authDetails1 = {
    username: 'spec-like-service-1',
    password: 'random-dice-4',
  };

  let user2: UserEntity;
  const authDetails2 = {
    username: 'spec-like-service-2',
    password: 'random-dice-6',
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    userService = module.get<UserService>(UserService);
    likeService = module.get<LikeService>(LikeService);
    connection = module.get<Connection>(Connection);

    // create users
    user1 = await userService.create(authDetails1 as UserEntity);
    user2 = await userService.create(authDetails2 as UserEntity);
  });

  it('should not have a like', async () => {
    expect(await likeService.isLiked(user1.id, user2.username)).toBe(false);
  });

  it('should like a user', async () => {
    await likeService.likeUsername(user1.id, user2.username);
    expect(await likeService.isLiked(user1.id, user2.username)).toBe(true);
  });

  it('should unlike a user', async () => {
    await likeService.unlikeUsername(user1.id, user2.username);
    expect(await likeService.isLiked(user1.id, user2.username)).toBe(false);
  });

  afterAll(async () => {
    // create users
    await userService.delete(undefined, authDetails1.username);
    await userService.delete(undefined, authDetails2.username);
    await connection.close();
  });
});
