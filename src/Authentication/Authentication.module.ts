import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationController } from './Authentication.controller';
import { AuthenticationService } from './Authentication.service';
import { AuthenticationEntity } from './Context/Authentication.entity';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  imports: [TypeOrmModule.forFeature([AuthenticationEntity])],
})
export class AuthenticationModule {}
