import { Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { IUser } from 'src/dto/user-dto';

@Injectable()
export class UserService {
  addUser(user: IUser): Promise<IUser> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(user);
      }, 3000);
    });
  }

  getUser(id: String): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(process.env.JWT_SECRET);
      }, 3000);
    });
  }
}
