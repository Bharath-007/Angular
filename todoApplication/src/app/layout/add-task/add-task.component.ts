import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TaskServiceService } from 'src/app/services/task.service/task-service.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  todoForm!: FormGroup;

  userId!: string;
  constructor(
    private todoService: TaskServiceService,
    private userService: UserService,
    private snackBar: SnackbarService,
    private dialogRef: MatDialogRef<AddTaskComponent>
  ) {}

  ngOnInit(): void {
    this.todoForm = new FormGroup({
      todoName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      todoDescription: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
    //getting userId
    this.userId = this.userService.userId;
    console.log(this.userId);
  }

  addTodo() {
    const todos = {
      ...this.todoForm.value,
      isCompleted: false,
      isFavourite: false,
    };
    // console.log(todos);
    this.snackBar.toastMessage(`${todos.todoName} added successfully`, 'Ok');
    this.todoService.createTask(this.userId, todos);
    return this.dialogRef.close();
  }
}
