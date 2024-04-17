import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { Observable, throwError, zip } from 'rxjs';

import { Product, CreateProductDTO, UpdateProductDTO } from './../models/product.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.API_URL}/api/v1`;

  constructor(
    private http: HttpClient
  ) { }

  updateImages(products: Product[]) {
    const imagesNotFound = [
      'https://placeimg.com/640/480/any',
      'https://placeimg.com/640/640/any',
      'https://placeimg.com/640/48',
      'https://img.com/64/1222',
      'https://image.com'
    ];

    products = products.map(product => {
      if (product.images[0].includes('[')) {
        product.images = JSON.parse(product.images.join(','));
      }
      return product;
    });

    const productsImagesNotFound = products
      .filter((product) => product.images.some((image) => imagesNotFound.includes(image)))
      .map((product) => product.id);

    return products.filter((product) => !productsImagesNotFound.includes(product.id));
  }

  getByCategory(categoryId: string, limit?: number, offset?: number){
    let params = new HttpParams();
    if (limit && offset != null) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }

    return (
      this
        .http
        .get<Product[]>(`${this.apiUrl}/categories/${categoryId}/products`, { params })
        .pipe(map(this.updateImages))
    );
  }

  getAllSimple() {
    return (
      this
        .http
        .get<Product[]>(`${this.apiUrl}/products`)
        .pipe(map(this.updateImages))
    );
  }

  getAll(limit?: number, offset?: number): Observable<Product[]> {
    let params = new HttpParams();
    if (limit && offset != null) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }

    return (
      this
        .http
        .get<Product[]>(`${this.apiUrl}/products`, { params })
        .pipe(
          retry(3),
          map((products) => (
            products.map((product) => ({
              ...product,
              taxes: product.price > 0 ? .19 * product.price : 0,
            }))
          )),
          map(this.updateImages),
        )
    );
  }

  fetchReadAndUpdate(id: string, dto: UpdateProductDTO) {
    return zip(
      this.getOne(id),
      this.update(id, dto)
    );
  }

  getOne(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`)
    .pipe(
      map((product) => {
        const [newProduct] = this.updateImages([product]);
        return newProduct;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError(() => 'Algo esta fallando en el server');
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError(() => 'El producto no existe');
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError(() => 'No estas permitido');
        }
        return throwError(() => 'Ups algo salio mal');
      })
    )
  }

  create(dto: CreateProductDTO) {
    return this.http.post<Product>(`${this.apiUrl}/products`, dto);
  }

  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }
}
