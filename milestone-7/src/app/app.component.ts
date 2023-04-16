import { Component, OnInit, ViewChild } from '@angular/core';
import { DataServiceService } from './data-service/data-service.service';
import { Root } from './interface/Root';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { Products, Response, limitedProducts } from './interface/Products';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Advanced Angular';

  //users
  data$!: Root[];

  //products
  products$!: limitedProducts[];
  searchControl: FormControl = new FormControl();

  displayedColumns: string[] = ['name', 'username', 'phone', 'company'];
  dataSource = new MatTableDataSource<Root>();

  //using SUBSCRIBTION to get the data from the observable
  constructor(private userService: DataServiceService) {}

  ngOnInit(): void {
    this.dataSource.data = [];
    //users
    this.userService
      .getUsers()
      .pipe(catchError((err) => of(err.status, err.message)))
      .subscribe((next: Root[]) => {
        this.data$ = next; //EXECUTION
        this.dataSource.data = next;
      });

    //products
    this.userService
      .getProducts()
      .pipe(
        map((data: Response) => {
          //allowing only limited datas to the map operator
          return data.products.slice(0, 15).map((products: Products) => {
            return {
              title: products.title,
              brand: products.brand,
            };
          });
        }),
        catchError((err) => of(err.status, err.message))
      )
      .subscribe((products: limitedProducts[]) => {
        this.products$ = products;
      });
  }

  //paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  //TO OBSERVABLE WILL BE DESTRUCTED AUTOMATICALLY

  //click btn
  productsView = () => {
    console.log(this.products$);
  };

  // products paginator
  pageOptions = [3, 5, 10];
  pageSize = 3;
  currentPage = 1;

  handlePageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
  }
}
