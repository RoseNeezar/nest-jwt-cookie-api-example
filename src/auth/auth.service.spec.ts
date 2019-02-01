import {
  BadRequestException,
  NotFoundException
} from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { AuthService } from './auth.service';

// todo mock import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from '../app.module';

import { Connection } from 'typeorm';


describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let connection: Connection;
  let user: UserEntity;
  // let app: INestApplication;
  // let server;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // app = module.createNestApplication();
    // server = app.getHttpServer();
    userService = module.get<UserService>(UserService);
    authService = module.get<AuthService>(AuthService);
    connection = module.get<Connection>(Connection);
    //await app.init();
  });

  it('should fail unknown username', async () => {
    let error;
    try {
      await authService.login({
        username: 'non-existing-username',
        password: 'chgiunriurebxmrbgeumb',
      });
    } catch (e) {
      error = e;
    }
    expect(error).toBeInstanceOf(NotFoundException);
  });

  it('should register new user', async () => {
    user = await authService.signup({
      username: 'testing-username',
      password: 'some random password',
    });
  });

  it('should fail register existing user', async () => {
    let error;
    try {
      await await authService.signup({
        username: 'testing-username',
        password: 'some random password',
      });
    } catch (e) {
      error = e;
    }
    expect(error).toBeInstanceOf(BadRequestException);
  });

  it('should fail wrong password', async () => {
    let error;
    try {
      await authService.login({
        username: 'testing-username',
        password: 'wrong password',
      });
    } catch (e) {
      error = e;
    }
    expect(error).toBeInstanceOf(BadRequestException);
  });

  it('should get user from username and password', async () => {
    user = await authService.login({
      username: 'testing-username',
      password: 'some random password',
    });
    expect(user).toBeInstanceOf(UserEntity);
  });

  afterAll(async () => {
    await userService.delete(user.id);
    await connection.close();
    // await app.close();
  });
});
