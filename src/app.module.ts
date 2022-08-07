import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './Book/Book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './Book/Context/Book.entity';
import { AuthenticationModule } from './Authentication/Authentication.module';
import { AuthenticationEntity } from './Authentication/Context/Authentication.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthMiddleware } from './Middlewares/Jwt.middleware';
import { BookController } from './Book/Book.controller';
import { AddressModule } from './Address/Address.module';
import { AddressEntity } from './Address/Context/Address.context';
import { AddressController } from './Address/Address.controller';

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
      entities: [BookEntity, AuthenticationEntity, AddressEntity],
      logging: true,
      synchronize: false,
    }),
    BookModule,
    AuthenticationModule,
    AddressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtAuthMiddleware)
      .forRoutes(BookController, AddressController);
  }
}
