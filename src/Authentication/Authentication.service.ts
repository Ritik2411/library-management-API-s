import { Injectable } from '@nestjs/common';
import { Register } from './Interface/Register.interface';
import * as bcrypt from 'bcrypt';
import { AuthenticationEntity } from './Context/Authentication.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Login } from './Interface/Login.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(AuthenticationEntity)
    private authenticationRepository: Repository<AuthenticationEntity>
  ) {}

  private saltRounds: number = 10;

  async register(data: Register): Promise<AuthenticationEntity> {
    return bcrypt
      .hash(data.password, this.saltRounds)
      .then((hash) => {
        const user = this.authenticationRepository.create();

        user.username = data.username;
        user.email = data.email;
        user.password = hash;

        return this.authenticationRepository.save(user);
      })
      .catch((err) => {
        return err;
      });
  }

  login(login: Login): Promise<AuthenticationEntity> {
    return this.authenticationRepository.findOne({
      where: {
        email: login.email,
      },
    });
  }
}
