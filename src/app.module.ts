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
import { PurchasedBookModule } from './PurchasedBooks/Purchased.books.module';
import { PurchasedBooksEntity } from './PurchasedBooks/Context/Purchased.books.entity';
import { PurchasedBooksController } from './PurchasedBooks/Purchased.books.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://gsgzxmax:9Bs4JfEpUVOxXa9vleTrxppJxWtu2JZa@kandula.db.elephantsql.com/gsgzxmax',
      entities: [
        BookEntity,
        AuthenticationEntity,
        AddressEntity,
        PurchasedBooksEntity,
      ],
      logging: true,
      synchronize: false,
    }),
    BookModule,
    AuthenticationModule,
    AddressModule,
    PurchasedBookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtAuthMiddleware)
      .forRoutes(BookController, AddressController, PurchasedBooksController);
  }
}
