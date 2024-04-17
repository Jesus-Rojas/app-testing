import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { Status } from 'src/app/types/status.enum';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  limit = 10;
  offset = 0;
  status: Status = Status.Init;
  Status = Status;

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.status = Status.Loading;
    this.productsService
      .getAll(this.limit, this.offset)
      .subscribe({
        next: (products) => {
          this.products = [ ...this.products, ...products ];
          this.offset += this.limit;
          this.status = Status.Success;
        },
        error: () => {
          setTimeout(() => {
            this.products = [];
            this.status = Status.Error;
          }, 3000);
        },
      });
  }
}
