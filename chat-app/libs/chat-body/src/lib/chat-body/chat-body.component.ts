import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chat } from '@chat-app/util';
import { SocketService } from '@chat-app/util';

@Component({
  selector: 'chat-app-chat-body',
  templateUrl: './chat-body.component.html',
  styleUrls: ['./chat-body.component.css'],
})
export class ChatBodyComponent implements OnInit, OnDestroy {
  chatMessages: Chat[] = [];
  constructor(private chatService: SocketService) {}

  ngOnInit(): void {
    this.chatMessages = this.chatService.chatMessages;
  }

  ngOnDestroy(): void {
    this.chatService.closeWebSocket();
  }
}
