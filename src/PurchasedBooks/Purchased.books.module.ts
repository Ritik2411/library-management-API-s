import { Module } from '@nestjs/common';
import { PurchasedBooksService } from './Purchased.books.service';
import { PurchasedBooksController } from './Purchased.books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PurchasedBookModule])],
  controllers: [PurchasedBooksController],
  providers: [PurchasedBooksService],
})
export class PurchasedBookModule {}
