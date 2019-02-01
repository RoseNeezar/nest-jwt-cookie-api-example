import {
  Body,
  Controller,
  UseInterceptors,
  Patch,
  Post,
  Req,
  UseGuards,
  Res,
  HttpStatus, BadRequestException,
} from '@nestjs/common';

import { TokenDto } from './dto/token.dto';

import { SignupDto } from './dto/signup.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { UserStatusDto } from '../user/dto/status.dto';
import { Token } from './auth.decorator';
import { AuthGuard } from './auth.guard';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  public async signup(
    @Body() data: SignupDto,
    @Req() req,
    @Res() res,
  ): Promise<UserStatusDto> {
    if (req.token) {
      throw new BadRequestException("Already authed.")
    }
    const user = await this.authService.signup(data);
    res.cookie('token', await this.authService.createToken(user), { httpOnly: true });
    res.status(HttpStatus.CREATED);
    return res.send();
  }

  @Post('login')
  public async login(
    @Body() data: LoginDto,
    @Req() req,
    @Res() res,
  ): Promise<UserStatusDto> {
    const user = await this.authService.login(data);
    res.cookie('token', await this.authService.createToken(user), { httpOnly: true });
    return res.send({
      username: user.username
    });
  }

  @UseGuards(AuthGuard)
  @Patch('update-password')
  async updatePassword(
    @Token() token: TokenDto,
    @Body() data: UpdatePasswordDto,
  ): Promise<UserStatusDto> {
    const id = token.id;
    return await this.authService.changePassword(id, data);
  }
}

