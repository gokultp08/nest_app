import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { resolve } from 'path';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from './chat.schema';
import { ChatDto } from './dto/chat.dto';

// @Injectable()
@Injectable({ scope: Scope.REQUEST })
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private readonly messageModel: Model<Chat>,
  ) {}

  async add(user: ChatDto): Promise<ChatDto> {
    console.log('create');
    const newChat = await this.messageModel.create(user);
    console.log('after create', newChat);
    return newChat;
  }

  async find(id: String): Promise<ChatDto> {
    const chat = await this.messageModel.findById({ _id: id }).exec();

    if (!chat) {
      throw new NotFoundException(`User not found`);
    }

    return chat;
  }

  async findAll(sender: string, receiver: string): Promise<ChatDto[]> {
    const chats = await this.messageModel.find({ sender, receiver }).exec();
    return chats;
  }

  async markAsSeen(id: String, sender: string): Promise<ChatDto> {
    const oldChat = await this.find(id);
    if (oldChat.seen) {
      return oldChat;
    }
    if (oldChat.receiver !== sender) {
      throw new UnauthorizedException(`Not authorized`);
    }
    oldChat.seen = true;

    const newChat = await this.messageModel.findByIdAndUpdate(
      { _id: id },
      oldChat,
    );

    return newChat;
  }

  async delete(id: String, sender: string): Promise<boolean> {
    const oldChat = await this.find(id);
    if (oldChat.sender !== sender) {
      throw new UnauthorizedException(`Not authorized`);
    }
    const newChat = await this.messageModel.findByIdAndDelete({ _id: id });

    if (!newChat) {
      throw new NotFoundException(`UCannot delete the chat`);
    }

    return true;
  }
}
