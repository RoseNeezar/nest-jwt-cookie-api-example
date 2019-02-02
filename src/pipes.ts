import { router } from './router';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

export function globalPipes(app) {
  app.disable('x-powered-by');

  /**
   * Route custom endpoints to canonical ones
   */
  app.use(router());

  /**
   * Use cookies in req
   * todo, move to user/auth.interceptor.ts
   */
  app.use(cookieParser());

  /*
   Global validation pipe
   - Input is forced into internal classes
  */
  app.useGlobalPipes(
    new ValidationPipe({
      // only pass whitelisted params
      whitelist: true,
      // convert payloads to DTO classes
      transform: true,
      // todo hide error details
      // disableErrorMessages: true
    }),
  );
}
