import { Injectable, Scope } from '@nestjs/common';
import { resolve } from 'path';
import { User } from 'src/dto/user-dto';
import { UserSchema } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// @Injectable()
@Injectable({ scope: Scope.REQUEST })
export class UserService {
  private valuee = 0;

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  addUser(user: User): Promise<User> {
   const newUser = await this.userModel.create(user);
   return newCustomer;
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(user);
    //   }, 3000);
    // });
  }

  getUser(id: String): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.valuee.toString());
        this.valuee = this.valuee + 1;
        // resolve(process.env.JWT_SECRET);
      }, 0);
    });
  }
}
