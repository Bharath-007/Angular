import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatFooterComponent } from './chat-footer.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, FormsModule, MatButtonModule],
  declarations: [ChatFooterComponent],
  exports: [ChatFooterComponent],
})
export class ChatFooterModule {}
