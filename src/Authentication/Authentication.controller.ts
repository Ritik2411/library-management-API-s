import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthenticationService } from './Authentication.service';
import { LoginDto } from './Dto/Login.dto';
import { RegisterDto } from './Dto/Register.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { EmailDto } from './Dto/Email.dto';

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Get('get_all_users')
  async getAllUsers() {
    const users = await this.authenticationService.getAllUsers();
    return users;
  }

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

  @Post('reset_password')
  async resetPassword(
    @Body() resetPassword: LoginDto,
    @Res() response: Response
  ) {
    try {
      const user = await this.authenticationService.getByEmail(
        resetPassword.email
      );

      if (user) {
        bcrypt
          .hash(resetPassword.password, 10)
          .then((hash) => {
            bcrypt.compare(
              resetPassword.password,
              user.password,
              async (err, result) => {
                if (result) {
                  response.status(HttpStatus.BAD_REQUEST).send({
                    status: HttpStatus.BAD_REQUEST,
                    msg: 'New password cannot be same as old password',
                  });
                } else {
                  const result = await this.authenticationService.resetPassword(
                    user,
                    hash
                  );
                  response.status(HttpStatus.OK).send(result);
                }
              }
            );
          })
          .catch((err) => {
            response.status(HttpStatus.BAD_REQUEST).send({
              status: HttpStatus.BAD_REQUEST,
              msg: err,
            });
          });
      }
    } catch (err) {
      response.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        msg: err,
      });
    }
  }

  @Post('get_user_by_email')
  async getByEmail(
    @Body()
    email: EmailDto,
    @Res() response: Response
  ) {
    try {
      const result = await this.authenticationService.getByEmail(email);
      response.status(HttpStatus.OK).send(result);
    } catch (err) {
      response.status(HttpStatus.BAD_REQUEST).send(err);
    }
  }
}
