import { Injectable } from '@nestjs/common';
import { BookDto, CreateBookDto, UpdateBookDto } from 'libs/contracts/src/books';

@Injectable()
export class BooksService {
  private books: BookDto[] = [{ id: 1, title: "Hello World!", author: "Nabin Dhami", rating: 4.5 }]

  create(createBookDto: CreateBookDto) {
    const book: BookDto = {
      ...createBookDto,
      id: this.books.length + 1
    }
    this.books.push(book)
    return book
  }

  findAll() {
    return this.books
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
