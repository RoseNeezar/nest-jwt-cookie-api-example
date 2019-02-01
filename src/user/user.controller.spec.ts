import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';

import * as supertest from 'supertest';
import { Connection } from 'typeorm';
import { UserService } from './user.service';
import { globalPipes } from '../pipes';

describe('AuthController', () => {
  let app: INestApplication;
  let connection: Connection;
  let userService: UserService;
  let server;
  let agent;

  const authDetails = {
    username: 'marko',
    password: 'random-dice-4',
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    connection = module.get<Connection>(Connection);
    userService = module.get<UserService>(UserService);
    app = module.createNestApplication();
    globalPipes(app);
    server = app.getHttpServer();
    await app.init();
    agent = supertest.agent(server);

    // delete test user
    await userService.delete(undefined, authDetails.username);
    await userService.delete(undefined, 'another-user');
  });

  it('should sign up', async () => {
    await agent
      .post('/signup')
      .send(authDetails)
      .expect(201)
      .expect('set-cookie', /token/)
      .expect('set-cookie', /HttpOnly/);
  });

  it('should get me', async () => {
    // yes, the user is already logged in
    await agent
      .get('/me')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('set-cookie', /token/)
      .expect('set-cookie', /HttpOnly/)
      .expect({ username: authDetails.username });
  });

  it('should signup another user', async () => {
    await supertest
      .agent(server)
      .post('/signup')
      .send({
        username: 'another-user',
        password: 'randompassword21',
      })
      .expect(201)
      .expect('set-cookie', /token/)
      .expect('set-cookie', /HttpOnly/);
  });

  it('should get other user', async () => {
    await agent
      .get('/user/another-user')
      .set('Accept', 'application/json')
      .expect(200)
      .expect({ username: 'another-user' });
  });

  afterAll(async () => {
    await userService.delete(undefined, authDetails.username);
    await userService.delete(undefined, 'another-user');
    await connection.close();
    await app.close();
  });
});
