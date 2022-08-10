import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { PurchasedBooksEntity } from './Context/Purchased.books.entity';
import { IPurchasedBooks } from './Interface/Purchased_books.interface';

@Injectable()
export class PurchasedBooksService {
  constructor(
    @InjectRepository(PurchasedBooksEntity)
    private purchasedBookRepository: Repository<PurchasedBooksEntity>
  ) {}

  async getAllBooks(): Promise<PurchasedBooksEntity[]> {
    return await this.purchasedBookRepository.find();
  }

  async getBooksById(id: string): Promise<PurchasedBooksEntity> {
    return await this.purchasedBookRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async addBook(data: IPurchasedBooks): Promise<InsertResult> {
    return await this.purchasedBookRepository.insert(data);
  }

  async editBook(id: string, data: IPurchasedBooks): Promise<UpdateResult> {
    return await this.purchasedBookRepository.update(id, {
      name: data.name,
      price: data.price,
      quantity: data.quantity,
      bookId: data.bookId,
      userId: data.userId,
    });
  }

  async patch(id: string, data: any): Promise<UpdateResult> {
    return await this.purchasedBookRepository.update(id, data);
  }
}
