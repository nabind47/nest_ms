import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

import {
  BOOKS_PATTERNS,
  BookDto as ServiceBookDto,
  CreateBookDto as ServiceCreateBookDto,
  UpdateBookDto as ServiceUpdateBookDto
} from 'libs/contracts/src/books';

import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookDto } from './dto/book.dto';

import { BOOKS_CLIENT } from './constants';

@Injectable()
export class BooksService {
  constructor(@Inject(BOOKS_CLIENT) private booksClient: ClientProxy) { }

  private mapBookDto(bookDto: BookDto): BookDto {
    return {
      id: bookDto.id,
      title: bookDto.title
    }
  }

  create(createBookDto: CreateBookDto) {
    return this.booksClient.send<ServiceBookDto, ServiceCreateBookDto>(BOOKS_PATTERNS.CREATE, createBookDto).pipe(map(this.mapBookDto))
  }

  findAll() {
    return this.booksClient.send<ServiceBookDto>(BOOKS_PATTERNS.FIND_ALL, {})
  }

  findOne(id: number) {
    return this.booksClient.send<ServiceBookDto>(BOOKS_PATTERNS.FIND_ONE, { id })
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.booksClient.send<ServiceBookDto, ServiceUpdateBookDto>(BOOKS_PATTERNS.UPDATE, { ...updateBookDto, id })
  }

  remove(id: number) {
    return this.booksClient.send<ServiceBookDto>(BOOKS_PATTERNS.REMOVE, { id })
  }
}
