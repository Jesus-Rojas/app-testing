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
      .subscribe((products) => {
        products = products.map(product => {
          if (product.images[0].includes('[')) {
            product.images = JSON.parse(product.images.join(','));
          }
          return product;
        });

        const imagesNotFound = [
          'https://placeimg.com/640/480/any',
          'https://placeimg.com/640/640/any',
          'https://placeimg.com/640/48',
          'https://img.com/64/1222',
          'https://image.com'
        ];

        const productsImagesNotFound = products
          .filter((product) => product.images.some((image) => imagesNotFound.includes(image)))
          .map((product) => product.id);
        
        this.products = [
          ...this.products,
          ...products.filter((product) => !productsImagesNotFound.includes(product.id)),
        ];
        this.offset += this.limit;
        this.status = Status.Success;
      });
  }
}
