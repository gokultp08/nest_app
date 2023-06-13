import {
  Body,
  Controller,
  Delete,
  Get,
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
import { MessageDto } from './dto/chat.dto';

const API = 'v1/message';
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Controller()
@UseGuards(RolesGuard)
@Roles('admin')
@UseInterceptors(LoggingInterceptor)
// @UseFilters(new HttpExceptionFilter())
export class ChatController {
  constructor(private readonly messageService: ChatService) {}

  @Post(`${API}`)
  async createMessage(@Body() user: MessageDto) {
    console.log('received', user);
    try {
      const result = await this.messageService.add(user);
      return result;
    } catch (err) {
      throw err;
    }
  }

  @Get(`${API}`)
  async getAllMessages(): Promise<any> {
    try {
      const result = await this.messageService.findAll();
      return result;
    } catch (err) {
      throw err;
    }
  }

  @Get(`${API}/:id`)
  async getMessage(@Param('id') id: string): Promise<any> {
    try {
      const result = await this.messageService.find(id);
      return result;
    } catch (err) {
      throw err;
    }
  }

  @Put(`${API}/:id`)
  async updateMessage(
    @Param('id') id: string,
    @Body() user: MessageDto,
  ): Promise<any> {
    try {
      const result = await this.messageService.update(id, user);
      return result;
    } catch (err) {
      throw err;
    }
  }

  @Delete(`${API}/:id`)
  async deleteMessage(@Param('id') id: string): Promise<boolean> {
    try {
      const result = await this.messageService.delete(id);
      return result;
    } catch (err) {
      throw err;
    }
  }
}
