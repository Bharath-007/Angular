import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SocketService } from '@chat-app/util';

@Component({
  selector: 'chat-app-chat-footer',
  templateUrl: './chat-footer.component.html',
  styleUrls: ['./chat-footer.component.css'],
})
export class ChatFooterComponent implements OnInit {
  constructor(private chatService: SocketService) {}

  ngOnInit(): void {
    this.chatService.openWebSocket();
  }

  onSend(form: NgForm) {
    const chatDetails = {
      user: form.value.username,
      message: form.value.message,
    };
    this.chatService.sendMessage(chatDetails);
    form.controls['message'].reset();
    console.log(chatDetails);
  }
}
