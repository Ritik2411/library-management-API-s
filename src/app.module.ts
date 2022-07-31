import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './Book/Book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './Book/Context/Book.entity';
import { AuthenticationModule } from './Authentication/Authentication.module';
import { AuthenticationEntity } from './Authentication/Context/Authentication.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'ritik2411',
      database: 'book',
      entities: [BookEntity, AuthenticationEntity],
      logging: true,
      synchronize: false,
    }),
    BookModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
