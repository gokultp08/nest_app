import { ChatDto } from 'src/chat/dto/chat.dto';
import { ChatEvents } from '../enums/enum';

export interface IChatNotification {
  type: ChatEvents;
  chatId: string;
  chat?: ChatDto;
}
