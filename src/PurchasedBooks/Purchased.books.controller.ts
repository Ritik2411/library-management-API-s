import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { PatchDto } from 'src/Book/Dto/Patch.dto';
import { PurchasedBooksDto } from './Dto/Purchased_books.dto';
import { PurchasedBooksService } from './Purchased.books.service';

@ApiTags('Purchased Books')
@ApiBearerAuth()
@Controller('purchased_books')
export class PurchasedBooksController {
  constructor(private purchasedBooksService: PurchasedBooksService) {}
  @Get('get_all')
  async getAllBooks(@Res() response: Response) {
    try {
      const result = await this.purchasedBooksService.getAllBooks();
      response.status(HttpStatus.OK).send(result);
    } catch (err) {
      response.send(err);
    }
  }

  @Get('get_by_id/:id')
  async getBookById(@Param('id') id: string, @Res() response: Response) {
    try {
      const result = await this.purchasedBooksService.getBooksById(id);
      response.status(HttpStatus.OK).send(result);
    } catch (err) {
      response.send(err);
    }
  }

  @Post('add')
  async addBook(
    @Body() purchasedBook: PurchasedBooksDto,
    @Res() response: Response
  ) {
    try {
      const result = await this.purchasedBooksService.addBook(purchasedBook);
      response.status(HttpStatus.OK).send(result);
    } catch (err) {
      response.send(err);
    }
  }

  @Put('edit/:id')
  async editBook(
    @Body() purchasedBook: PurchasedBooksDto,
    @Param('id') id: string,
    @Res() response: Response
  ) {
    try {
      const result = await this.purchasedBooksService.editBook(
        id,
        purchasedBook
      );
      response.status(HttpStatus.OK).send(result);
    } catch (err) {
      response.send(err);
    }
  }

  @Patch('patch/:id')
  async patchBook(
    @Param('id') id: string,
    @Body() data: PatchDto,
    @Res() response: Response
  ) {
    try {
      const result = await this.purchasedBooksService.patch(id, data);
      response.status(HttpStatus.OK).send(result);
    } catch (err) {
      response.send(err);
    }
  }
}
