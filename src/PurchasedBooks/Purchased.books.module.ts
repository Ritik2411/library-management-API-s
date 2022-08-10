import { Module } from '@nestjs/common';
import { PurchasedBooksService } from './Purchased.books.service';
import { PurchasedBooksController } from './Purchased.books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchasedBooksEntity } from './Context/Purchased.books.entity';
import { BookModule } from 'src/Book/Book.module';

@Module({
  imports: [TypeOrmModule.forFeature([PurchasedBooksEntity]), BookModule],
  controllers: [PurchasedBooksController],
  providers: [PurchasedBooksService],
})
export class PurchasedBookModule {}
