import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss']
})
export class OthersComponent {
  color = 'blue';
  text = 'roma';
  products: Product[] = [];

  constructor(
    private productsService: ProductsService,
  ) { }

  ngOnInit(): void {
    this.productsService.getAll().subscribe((products) => (this.products = products));
  }
}
