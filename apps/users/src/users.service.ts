import { Injectable } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UsersService {
  private users: UserDto[] = [{
    id: 1, firstName: "Nabin", lastName: "Dhami", age: 23
  }]

  findAll() {
    return this.users
  }
}
