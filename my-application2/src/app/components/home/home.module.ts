import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { HomeRoutingModule } from './home-routing.module';
import { UsersComponent } from './users/users.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    CommonModule,
    HomeRoutingModule,
    NgxPaginationModule,
    MatPaginatorModule,
    NgbModule,
    MatTableModule,
  ],
  exports: [],
})
export class HomeModule {}
