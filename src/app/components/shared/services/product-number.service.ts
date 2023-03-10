import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductNumberService {
  numberOfproduct = JSON.parse(localStorage.getItem('cart')!)?.length || 0;
  constructor() {}
}
