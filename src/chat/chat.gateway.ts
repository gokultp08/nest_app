import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { IChatNotification } from 'src/utils/interfaces/interfaces';

@WebSocketGateway({
  port: 4000,
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private connectedClients: Map<string, Socket> = new Map<string, Socket>();

  afterInit(server: Server) {
    console.log('initialized *******************************');
  }

  handleConnection(client: Socket) {
    this.connectedClients.set(client.id, client);
  }

  handleDisconnect(client: Socket) {
    this.connectedClients.delete(client.id);
  }

  // @SubscribeMessage('sendMessage')
  // async handleSendMessage(client: Socket, payload: string): Promise<void> {
  //   this.server.emit('receiveMessage', 'dsafsdf');
  // }

  emitChangeToClients(change: IChatNotification, clientId: string[]) {
    const targetClients = clientId
      .map((item) => this.connectedClients.get(item))
      .filter((item) => item !== null && item !== undefined);
    targetClients.forEach((client) => {
      client.emit(change.type.toString(), change);
    });
  }
}
