import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { resolve } from 'path';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from './chat.schema';
import { MessageDto } from './dto/chat.dto';

// @Injectable()
@Injectable({ scope: Scope.REQUEST })
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private readonly messageModel: Model<Chat>,
  ) {}

  async add(user: MessageDto): Promise<MessageDto> {
    console.log('create');
    const newUser = await this.messageModel.create(user);
    console.log('after create', newUser);
    return newUser;
  }

  async find(id: String): Promise<MessageDto> {
    const user = await this.messageModel.findById({ _id: id }).exec();

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }

  async findAll(): Promise<MessageDto[]> {
    const users = await this.messageModel.find().exec();
    return users;
  }

  async update(id: String, user: MessageDto): Promise<MessageDto> {
    const updatedUser = await this.messageModel.findByIdAndUpdate(
      { _id: id },
      user,
    );

    if (!updatedUser) {
      throw new NotFoundException(`User #${updatedUser} not found`);
    }

    return updatedUser;
  }

  async delete(id: String): Promise<boolean> {
    const updatedUser = await this.messageModel.findByIdAndDelete({ _id: id });

    if (!updatedUser) {
      throw new NotFoundException(`User #${updatedUser} not found`);
    }

    return true;
  }
}
