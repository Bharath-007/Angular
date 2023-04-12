import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Observable, Subscription } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TaskServiceService } from 'src/app/services/task.service/task-service.service';
import { UserService } from 'src/app/services/user/user.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { Task } from 'src/app/interface/task';
import { AuthService } from 'src/app/services/user/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit, OnDestroy {
  userId!: string;
  todoLists$!: Task[];
  taskSubscription!: Subscription;
  isFavourite!: boolean;
  isCompleted!: boolean;

  // @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private userSerive: UserService,
    private activatedRoute: ActivatedRoute,
    private taskService: TaskServiceService,
    private auth: AuthService,
    private snackBar: SnackbarService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.params['userId'];
    this.userSerive.userId = this.userId;
    // Get existing tasks
    this.updateTasks();
    //update tasks every 2 seconds
    this.taskSubscription = interval(2000).subscribe(() => {
      this.updateTasks();
    });
  }

  updateTasks() {
    return this.taskService.getTasks(this.userId).subscribe((tasks: any) => {
      this.todoLists$ = tasks;
    });
  }

  addtask() {
    return this.dialog.open(AddTaskComponent, {
      width: '350px',
      height: '400px',
    });
  }

  addFavourites(taskId: string | undefined, event: Event) {
    event.stopPropagation();
    if (typeof taskId === 'string') {
      const taskToUpdate = this.todoLists$.find((task) => task._id === taskId);
      const taskIndex = this.todoLists$.findIndex(
        (task) => task._id === taskId
      );
      if (taskIndex !== -1 && taskToUpdate) {
        taskToUpdate.isFavourite = !taskToUpdate.isFavourite;
        this.isFavourite = taskToUpdate.isFavourite;
        this.taskService
          .updateTask(this.userId, taskId, taskToUpdate)
          .subscribe((updated) => {
            updated;
          });
      }
    }
  }

  addToCompleted(taskId: string | undefined, event: Event) {
    event.stopPropagation();
    if (typeof taskId === 'string') {
      const taskToUpdate = this.todoLists$.find((task) => task._id === taskId);
      const taskIndex = this.todoLists$.findIndex(
        (task) => task._id === taskId
      );
      if (taskIndex !== -1 && taskToUpdate) {
        taskToUpdate.isCompleted = !taskToUpdate.isCompleted;
        this.isCompleted = taskToUpdate.isCompleted;
        this.taskService
          .updateTask(this.userId, taskId, taskToUpdate)
          .subscribe((updated) => {
            updated;
          });
      }
    }
  }

  deleteTask(taskId: string | undefined, event: Event) {
    event.stopPropagation();
    if (!taskId) {
      return { message: 'empty task id' };
    }
    return this.taskService
      .deleteTask(this.userId, taskId)
      .subscribe((deleted) => {
        deleted;
      });
  }

  taskStatusToggler() {}

  // paginator
  pageOptions = [3, 5, 10];
  pageSize = 3;
  currentPage = 1;

  handlePageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
  }

  showFavourites: boolean = false;
  favouritesButton: string = 'View Favourites';
  toggleFavourites() {
    this.showFavourites = !this.showFavourites;
    !this.showFavourites
      ? (this.favouritesButton = 'View Favourites')
      : (this.favouritesButton = 'Hide Favourites');
  }

  logOut() {
    this.auth.isLoggedOut();
    this.snackBar.toastMessage('logged out successfully', 'OK');
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.taskSubscription.unsubscribe();
  }
}
