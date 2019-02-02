import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Connection } from 'typeorm';
import { INestApplication } from '@nestjs/common';
import { globalPipes } from '../src/pipes';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    connection = module.get<Connection>(Connection);
    app = module.createNestApplication();
    globalPipes(app);
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(404);
  });

  afterAll(async () => {
    await connection.close();
    await app.close();
  });
});
