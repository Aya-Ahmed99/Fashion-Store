import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  baseURL: string = environment.apiUrl;
  constructor(private Http: HttpClient) {}

  createCarte(model: any) {
    return this.Http.post(`${this.baseURL}orders`, model);
  }
}
