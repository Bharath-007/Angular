import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBodyComponent } from './chat-body.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ChatBodyComponent],
  exports: [ChatBodyComponent],
})
export class ChatBodyModule {}
