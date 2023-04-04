import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UserService } from 'src/app/service/user.service';
import { User } from '../interface/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users!: User[];
  @ViewChild('MatPaginator1') MatPaginator1!: MatPaginator;
  pageSizeOptions: number[] = [2, 3, 5, 1];
  pageSize: number = 1;
  pageIndex!: number;
  length!: number;
  dataSource: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }
  ngAfterViewInit() {
    this.dataSource.data = this.users; // JSON data coming from API
    this.dataSource.paginator = this.MatPaginator1;
  }
  onPageChange(event: PageEvent) {
    this.pageIndex = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.MatPaginator1 = this.dataSource.paginator;
  }
}
