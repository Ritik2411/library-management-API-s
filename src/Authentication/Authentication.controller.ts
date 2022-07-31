import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthenticationService } from './Authentication.service';
import { LoginDto } from './Dto/Login.dto';
import { RegisterDto } from './Dto/Register.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() register: RegisterDto, @Res() response: Response) {
    if (register.password !== register.confirm_password) {
      response.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        msg: 'Password do not match',
      });
    } else {
      try {
        const result = await this.authenticationService.register(register);
        response.send(result);
      } catch (err) {
        response.send(err);
      }
    }
  }

  @Post('login')
  async login(@Body() login: LoginDto, @Res() response: Response) {
    try {
      const result = await this.authenticationService.login(login);
      if (result) {
        bcrypt.compare(login.password, result.password, (err, result) => {
          if (result) {
            jwt.sign(
              { result },
              process.env.PRIVATEKEY,
              { expiresIn: '84600s' },
              (err, token) => {
                if (err) {
                  response.status(HttpStatus.UNAUTHORIZED).send(err);
                } else {
                  response.status(HttpStatus.OK).send({
                    status: HttpStatus.OK,
                    tkn: token,
                  });
                }
              }
            );
          } else {
            response.status(HttpStatus.UNAUTHORIZED).send({
              status: HttpStatus.UNAUTHORIZED,
              msg: 'Invalid Password',
            });
          }
        });
      }
    } catch (err) {
      response.send(err);
    }
  }
}
