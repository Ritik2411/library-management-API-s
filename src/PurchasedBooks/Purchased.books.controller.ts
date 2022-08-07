import { Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PurchasedBooksService } from './Purchased.books.service';

@ApiTags('Purchased Books')
@ApiBearerAuth()
@Controller('purchased_books')
export class PurchasedBooksController {
  constructor(private purchasedBooksService: PurchasedBooksService) {}
  @Get('get_all')
  getAllBooks() {
    const result = this.purchasedBooksService.getAllBooks();
    return result;
  }

  @Post('add')
  addBook() {
    const result = this.purchasedBooksService.addBook();
    return result;
  }
}
