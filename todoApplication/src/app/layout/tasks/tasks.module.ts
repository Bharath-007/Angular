import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FovouritesComponent } from '../favourites/fovourites.component';

@NgModule({
  declarations: [TasksComponent, FovouritesComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MatTableModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    MatExpansionModule,
    MatPaginatorModule,
  ],
})
export class TasksModule {}
