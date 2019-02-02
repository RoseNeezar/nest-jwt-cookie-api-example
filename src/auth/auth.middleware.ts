import {
  Injectable,
  NestMiddleware,
  MiddlewareFunction,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from './dto/token.dto';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => {
      if (req.cookies && req.cookies.token) {
        const tokenString = req.cookies.token;

        try {
          if (this.jwtService.verify(tokenString)) {
            const token = this.jwtService.decode(tokenString) as TokenDto;

            delete token.exp;
            delete token.iat;

            // extend the life of the cookie
            res.cookie('token', this.jwtService.sign(token), {
              httpOnly: true,
            });

            req.token = token;
          }
        } catch (e) {
          if (e instanceof TokenExpiredError) {
            throw new BadRequestException('Token is expired.');
          }
          throw new BadRequestException('Could not verify token.');
        }
      } else {
        req.token = null;
      }

      next();
    };
  }
}
