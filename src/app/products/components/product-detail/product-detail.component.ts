import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from 'src/app/models/product.model';
import { Status } from 'src/app/types/status.enum';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  product: Product | null = null;
  status: Status = Status.Init;
  typeCustomer: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe((params) => {
        const productId = params.get('id');
        if (productId) {
          this.getProductDetail(productId);
          return;
        }
        this.goToBack();
      });

    this.route.queryParamMap.subscribe((params) => {
      this.typeCustomer = params.get('type');
    })
  }

  private getProductDetail(productId: string) {
    this.status = Status.Loading;
    this.productsService.getOne(productId)
    .subscribe({
      next: (product) => {
        this.product = product;
        this.status = Status.Success;
      },
      error: this.goToBack,
    })
  }

  goToBack() {
    this.location.back();
  }
}
