import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { BookEntity } from './Context/Book.entity';
import { Book } from './Interface/Book.interface';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>
  ) {}

  getAllBook(): Promise<BookEntity[]> {
    return this.bookRepository.find();
  }

  getBookById(id: string) {
    return this.bookRepository.findOneBy({ id });
  }

  addBook(addBook: Book): Promise<BookEntity> {
    const book = this.bookRepository.create();
    book.name = addBook.name;
    book.image = addBook.image;
    book.price = addBook.price;
    book.quantity = addBook.quantity;
    book.rating = addBook.rating;
    book.description = addBook.description;
    return this.bookRepository.save(book);
  }

  editBook(editBook: Book, id: string): Promise<UpdateResult> {
    return this.bookRepository.update(id, {
      name: editBook.name,
      image: editBook.image,
      rating: editBook.rating,
      price: editBook.price,
      quantity: editBook.quantity,
      description: editBook.description,
    });
  }

  patchBook(id: string, data: any) {
    return this.bookRepository.update(id, data);
  }

  deleteBook(id: string) {
    return this.bookRepository.delete({ id });
  }
}
