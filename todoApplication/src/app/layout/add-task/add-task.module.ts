import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskRoutingModule } from './add-task-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTaskComponent } from './add-task.component';


@NgModule({
  declarations: [AddTaskComponent],
  imports: [
    CommonModule,
    AddTaskRoutingModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
})
export class AddTaskModule {}
