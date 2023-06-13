import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { resolve } from 'path';
import { User, UserSchema } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/user-dto';

// @Injectable()
@Injectable({ scope: Scope.REQUEST })
export class UserService {
  private valuee = 0;

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async add(user: UserDto): Promise<UserDto> {
    console.log('create');
    const newUser = await this.userModel.create(user);
    console.log('after create', newUser);
    return newUser;
  }

  async find(id: String): Promise<UserDto> {
    const user = await this.userModel.findById({ _id: id }).exec();

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async update(id: String, user: UserDto): Promise<UserDto> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      { _id: id },
      user,
    );

    if (!updatedUser) {
      throw new NotFoundException(`User #${updatedUser} not found`);
    }

    return updatedUser;
  }
}
