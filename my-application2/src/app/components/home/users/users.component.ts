import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { UserService } from 'src/app/service/user.service';
import { User } from '../interface/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users!: User[];
  // pageSizeOptions: number[] = [5, 10, 25];
  // pageSize: number = 5;
  // pageIndex!: number;
  // length!: number;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  // onPageChange(event: PageEvent) {
  //   this.pageIndex = event.pageIndex;
  // }
}
