import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataServiceService } from 'src/app/data-service/data-service.service';
import { Root } from 'src/app/interface/Root';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subject, of } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, OnDestroy {
  //users
  data$!: Root[];
  displayedColumns: string[] = ['name', 'username', 'phone', 'company'];
  dataSource = new MatTableDataSource<Root>();

  unSubscribe$: Subject<void> = new Subject<void>();

  constructor(private userService: DataServiceService) {}

  ngOnInit(): void {
    this.dataSource.data = [];
    //users
    this.userService
      .getUsers()
      .pipe(
        catchError((err) => of(err.status, err.message)),
        takeUntil(this.unSubscribe$)
      )
      .subscribe((next: Root[]) => {
        this.data$ = next; //EXECUTION
        this.dataSource.data = next;
      });

    //subjects to update the page number
    this.pageChange.subscribe((pageIndex: number) => {
      this.paginator.pageIndex = pageIndex;
    });
  }

  //paginator
  pageChange: Subject<number> = new Subject(); //using subjects to update the page number
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
}
