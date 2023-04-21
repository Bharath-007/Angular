import { Injectable } from '@angular/core';
import { Chat } from '@chat-app/util';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  webSocket: WebSocket;
  chatMessages: Chat[] = [];

  constructor() {
    this.webSocket = new WebSocket('ws://localhost:8080/chat');
  }

  openWebSocket() {
    this.webSocket.onopen = (event) => {
      console.log('Open ', event);
    };

    this.webSocket.onmessage = (event) => {
      const chatMessage = JSON.parse(event.data);
      this.chatMessages.push(chatMessage);
    };

    this.webSocket.onclose = (event) => {
      console.log('Closed ', event);
    };
  }

  sendMessage(chatMessage: Chat) {
    this.webSocket.send(JSON.stringify(chatMessage));
  }

  closeWebSocket() {
    this.webSocket.close();
  }
}
