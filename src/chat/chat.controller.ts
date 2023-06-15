import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Req,
  Res,
  SetMetadata,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RolesGuard } from 'src/utils/guards/role.guard';
import { LoggingInterceptor } from 'src/utils/interceptor/logging.interceptor';
import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat.dto';

const API = 'v1/chat';

@Controller()
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
// @UseFilters(new HttpExceptionFilter())
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post(`${API}`)
  async createMessage(@Body() user: ChatDto) {
    console.log('received', user);
    try {
      const result = await this.chatService.add(user);
      return result;
    } catch (err) {
      throw err;
    }
  }

  @Get(`${API}/:sender/:receiver`)
  async getAllMessages(
    @Param('sender') sender: string,
    @Param('receiver') receiver: string,
  ): Promise<any> {
    try {
      const result = await this.chatService.findAll(sender, receiver);
      return result;
    } catch (err) {
      throw err;
    }
  }

  @Put(`${API}/:id`)
  async updateMessage(
    @Headers('userId') userId: string,
    @Param('id') id: string,
    @Body() user: null | undefined,
  ): Promise<any> {
    try {
      const result = await this.chatService.markAsSeen(id, userId);
      return result;
    } catch (err) {
      throw err;
    }
  }

  @Delete(`${API}/:id`)
  async deleteMessage(
    @Param('id') id: string,
    @Headers('userId') userId: string,
  ): Promise<boolean> {
    try {
      const result = await this.chatService.delete(id, userId);
      return result;
    } catch (err) {
      throw err;
    }
  }
}
