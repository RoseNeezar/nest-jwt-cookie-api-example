import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => {
      if (req.cookies && req.cookies.token) {
        const tokenString = req.cookies.token;
        if (this.jwtService.verify(tokenString)) {
          const token = this.jwtService.decode(tokenString) as TokenDto;

          delete token.exp;
          delete token.iat;

          // extend the life of the cookie
          res.cookie('token', this.jwtService.sign(token), { httpOnly: true });

          req.token = token;
        }
      } else {
        req.token = null;
      }

      next();
    };
  }
}
