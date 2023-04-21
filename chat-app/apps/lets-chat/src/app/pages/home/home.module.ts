import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ChatHeaderModule } from '@chat-app/chat-header';
import { ChatFooterModule } from '@chat-app/chat-footer';
import { ChatBodyModule } from '@chat-app/chat-body';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ChatHeaderModule,
    ChatBodyModule,
    ChatFooterModule,
  ],
})
export class HomeModule {}
