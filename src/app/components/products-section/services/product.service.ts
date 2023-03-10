import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseURL: string = environment.apiUrl;
  constructor(private Http: HttpClient) {}
  getAllProducts() {
    return this.Http.get(`${this.baseURL}products`);
  }
  getAllPages()
  {
    return this.Http.get(`${this.baseURL}pages`);
  }
  getProductsByPge(page:number)
  {
    return this.Http.get(`${this.baseURL}someproducts?page=${page}`); 
  }
  getSomePages()
  {
    return this.Http.get(`${this.baseURL}someproducts`); 
  }
  getAllCatogries() {
    return this.Http.get(`${this.baseURL}category`);
  }
  getProductsByCatogries(categoryId: any) {
    return this.Http.get(`${this.baseURL}category/${categoryId}`);
  }
  getOneProducts(id: any) {
    return this.Http.get(`${this.baseURL}products/${id}`);
  }
  addNewProduct(product: any) {
    const postData = new FormData();
    postData.append('category', product.category);
    postData.append('countInStock', product.countInStock);
    postData.append('description', product.description);
    postData.append('image', product.image);
    postData.append('name', product.name);
    postData.append('price', product.price);
    return this.Http.post(`${this.baseURL}products`, postData);
  }

  updateProduct(productId: any, product: any) {
    const postData = new FormData();
    postData.append('category', product.category);
    postData.append('countInStock', product.countInStock);
    postData.append('description', product.description);
    postData.append('image', product.image);
    postData.append('name', product.name);
    postData.append('price', product.price);

    return this.Http.patch(`${this.baseURL}products/${productId}`, postData);
  }

  deletProduct(productId: any) {
    return this.Http.delete(`${this.baseURL}products/${productId}`);
  }
}
