import { Injectable } from '@angular/core';
import { catchError, retry, Subject, throwError } from 'rxjs';
import { Register } from 'src/app/interface/register';
import { Task } from 'src/app/interface/task';
import { WebRequestService } from '../web.request/web-request.service';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceService {
  constructor(private webRequest: WebRequestService) {}

  //to refresh task
  private refresh = new Subject<void>();

  get refreshRequired() {
    return this.refresh;
  }

  createTask(userId: string, task: Task) {
    // console.log(task);
    return this.webRequest
      .post(`users/${userId}/createTodo`, task)
      .pipe(retry(1), catchError(this.handleError))
      .subscribe((user) => {
        user;
      });
  }

  //get tasks of a user
  getTasks(userId: string) {
    return this.webRequest
      .get(`users/${userId}/todos`)
      .pipe(retry(1), catchError(this.handleError));
  }

  //get Favourite tasks of a user
  getFavouriteTasks(userId: string) {
    return this.webRequest
      .get(`users/${userId}/favTodos`)
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteTask(userId: string, taskId: string) {
    // console.log(`users/${userId}/${taskId}/todos`);
    return this.webRequest
      .delete(`users/${userId}/${taskId}/todos`)
      .pipe(retry(1), catchError(this.handleError));
  }

  updateTask(userId: string, taskId: string, payload: Task) {
    return this.webRequest
      .patch(`users/${userId}/${taskId}/todos`, payload)
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      //client side
      errorMessage = `Error: ${error.error.message}`;
    } else {
      //server side
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
