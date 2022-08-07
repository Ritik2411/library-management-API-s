import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchasedBooksEntity } from './Context/Purchased.books.entity';

@Injectable()
export class PurchasedBooksService {
  constructor(
    @InjectRepository(PurchasedBooksEntity)
    private purchasedBookRepository: Repository<PurchasedBooksEntity>
  ) {}

  getAllBooks() {
    return 'Get all purchased book data';
  }

  addBook() {
    return 'Add a book';
  }
}
