import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/interface/task';
import { TaskServiceService } from '../../services/task.service/task-service.service';
import { UserService } from 'src/app/services/user/user.service';
import { Subscription, interval } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-fovourites',
  templateUrl: './fovourites.component.html',
  styleUrls: ['./fovourites.component.css'],
})
export class FovouritesComponent implements OnInit {
  userId!: string;
  favouriteTasks$!: Task[];
  favouriteTaskSubscription!: Subscription;

  constructor(
    private taskService: TaskServiceService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userId = this.userService.userId;
    // console.log(this.userId);
    this.updateFavouriteTasks();
    this.favouriteTaskSubscription = interval(2000).subscribe(() => {
      this.updateFavouriteTasks();
    });
  }

  updateFavouriteTasks() {
    return this.taskService
      .getFavouriteTasks(this.userId)
      .subscribe((tasks: any) => {
        this.favouriteTasks$ = tasks;
        this.favouritesLength = this.favouriteTasks$.length;
      });
  }

  // paginator
  pageOptions = [3, 5, 10];
  pageSize = 3;
  currentPage = 1;
  favouritesLength!: number;

  handlePageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
  }
}
