import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatHeaderComponent } from './chat-header.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [CommonModule, MatToolbarModule],
  declarations: [ChatHeaderComponent],
  exports: [ChatHeaderComponent],
})
export class ChatHeaderModule {}
