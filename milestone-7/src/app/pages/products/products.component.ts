import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataServiceService } from 'src/app/data-service/data-service.service';
import {
  Products,
  Response,
  limitedProducts,
} from 'src/app/interface/Products';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subject, of } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  //products
  products$!: limitedProducts[];
  length!: number;
  pageSize: number = 3;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //using subject to notify changes
  unSubscribe$: Subject<void> = new Subject<void>();

  //using SUBSCRIBTION to get the data from the observable
  constructor(private userService: DataServiceService) {}

  ngOnInit(): void {
    //loading the products
    this.syncProducts(0, this.paginator?.pageSize ?? this.pageSize);
  }

  syncProducts(pageIndex: number, pageSize: number) {
    this.userService
      .getProducts()
      .pipe(
        map((data: Response) => {
          //to slice the data based on the pageSize
          const startIndex = pageIndex * pageSize;
          const endIndex = startIndex + pageSize;
          this.length = data.products.length;

          //allowing only limited datas to the map operator
          return data.products
            .slice(startIndex, endIndex)
            .map((products: Products) => {
              return {
                title: products.title,
                brand: products.brand,
              };
            });
        }),
        catchError((err) => of(err.status, err.message)),
        takeUntil(this.unSubscribe$)
      )
      .subscribe((products: limitedProducts[]) => {
        this.products$ = products;
        // console.log(this.products$);
      });
  }

  // products paginator
  onPageChange(event: PageEvent) {
    this.syncProducts(event.pageIndex, event.pageSize);
  }

  ngOnDestroy(): void {
    // console.log(`destroyed - ${JSON.stringify(this.unSubscribe$)}`);
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
  
}
