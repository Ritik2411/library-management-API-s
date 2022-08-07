import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { BookService } from './Book.service';
import { BookDto } from './Dto/Book.dto';
import { PatchDto } from './Dto/Patch.dto';

@ApiTags('books')
@ApiBearerAuth()
@Controller('books')
export class BookController {
  constructor(private bookSerice: BookService) {}
  @Get('get_all_books')
  async getAllBooks(@Res() response: Response) {
    try {
      const result = await this.bookSerice.getAllBook();
      response.send({
        result,
      });
    } catch (err) {
      response.status(400).send(err);
    }
  }

  @Get('get_book_by_id/:id')
  async getBookById(@Param('id') id: string, @Res() response: Response) {
    try {
      const result = await this.bookSerice.getBookById(id);
      response.send(result);
    } catch (err) {
      response.status(400).send(err);
    }
  }

  @Post('add_book')
  async addBook(@Body() addBook: BookDto, @Res() response: Response) {
    try {
      const result = await this.bookSerice.addBook(addBook);
      response.send({
        result,
      });
    } catch (err) {
      response.status(400).send(err);
    }
  }

  @Put('edit_book/:id')
  async editBook(
    @Body() editBook: BookDto,
    @Param('id') id: string,
    @Res() response: Response
  ) {
    try {
      const result = await this.bookSerice.editBook(editBook, id);
      response.send({
        result,
      });
    } catch (err) {
      response.status(400).send(err);
    }
  }

  @Patch('patch_book/:id')
  async patchBook(
    @Param('id') id: string,
    @Body() data: PatchDto,
    @Res() response: Response
  ) {
    try {
      const result = await this.bookSerice.patchBook(id, data);
      response.send(result);
    } catch (err) {
      response.send(err);
    }
  }

  @Delete('delete_book/:id')
  async deleteBook(@Param('id') id: string, @Res() response: Response) {
    try {
      const result = await this.bookSerice.deleteBook(id);
      response.send({
        result,
      });
    } catch (err) {
      response.status(400).send(err);
    }
  }
}
