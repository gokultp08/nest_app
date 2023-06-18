import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { resolve } from 'path';
import { User, UserSchema } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/user-dto';
import { InvalidRequestException } from 'src/utils/exceptions/invalid-request.exception';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  private valuee = 0;

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async login(user: { username: string; password: string }): Promise<any> {
    console.log('create');
    const userDetails = await this.userModel
      .findOne({ email: user.username })
      .exec();
    if (userDetails === null) {
      throw new InvalidRequestException();
    }
    const isSame = await bcrypt.compare(user.password, userDetails.password);
    if (!isSame) {
      throw new InvalidRequestException();
    }
    const payload = { id: userDetails._id, username: userDetails.email };
    const token = await this.jwtService.signAsync(payload);
    return {
      user: userDetails,
      token,
    };
  }

  async add(user: UserDto): Promise<UserDto> {
    console.log('create');
    user.password = await this.hashPassword(user.password);
    const newUser = await this.userModel.create(user);
    console.log('after create', newUser);
    return newUser;
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
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
