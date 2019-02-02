import {
  Module,
  NestModule,
  forwardRef,
  MiddlewareConsumer,
} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { ConfigService } from 'nestjs-config';
import { UserModule } from '../user/user.module';
import { AuthMiddleware } from './auth.middleware';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secretOrPrivateKey: config.get('auth.secret_key'),
        signOptions: {
          expiresIn: config.get('auth.jwt_ttl'),
        },
      }),
      inject: [ConfigService],
    }),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthMiddleware],
  exports: [AuthMiddleware],
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
