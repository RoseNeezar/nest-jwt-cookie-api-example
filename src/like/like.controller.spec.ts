import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';

import * as supertest from 'supertest';
import { Connection } from 'typeorm';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { globalPipes } from '../pipes';
import { UserEntity } from '../user/user.entity';

describe('AuthController', () => {
  let app: INestApplication;
  let connection: Connection;
  let userService: UserService;
  let authService: AuthService;
  let server;
  let agent;

  const authDetails1 = {
    username: 'spec-like-controller-1',
    password: 'random-dice-4',
  };

  const authDetails2 = {
    username: 'spec-like-controller-2',
    password: 'random-dice-6',
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    connection = module.get<Connection>(Connection);
    userService = module.get<UserService>(UserService);
    authService = module.get<AuthService>(AuthService);
    app = module.createNestApplication();
    globalPipes(app);
    server = app.getHttpServer();
    await app.init();
    agent = supertest.agent(server);

    // create users
    await authService.signup(authDetails1 as UserEntity);
    await authService.signup(authDetails2 as UserEntity);
  });

  it('should log in', async () => {
    await agent
      .post('/login')
      .send(authDetails1)
      .expect({ username: authDetails1.username });
  });

  it('should like user 1', async () => {
    await agent.post(`/user/${authDetails1.username}/like`).expect(204);
  });

  it('should like user 2', async () => {
    await agent.post(`/user/${authDetails2.username}/like`).expect(204);
  });

  it('should unlike user 2', async () => {
    await agent.post(`/user/${authDetails2.username}/like`).expect(204);
  });

  it('should unlike user 1', async () => {
    await agent.post(`/user/${authDetails2.username}/like`).expect(204);
  });

  afterAll(async () => {
    await userService.delete(undefined, authDetails1.username);
    await userService.delete(undefined, authDetails2.username);
    await connection.close();
    await app.close();
  });
});
