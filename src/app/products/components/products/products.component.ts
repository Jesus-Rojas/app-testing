import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/models/product.model';
import { ValueService } from 'src/app/services/value.service';
import { Status } from 'src/app/types/status.enum';
import { ProductsService } from '../../services/products.service';

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
  rta = '';

  constructor(
    private productsService: ProductsService,
    private valueService: ValueService,
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

  async callPromise() {
    const rta = await this.valueService.getPromiseValue();
    this.rta = rta;
  }
}
