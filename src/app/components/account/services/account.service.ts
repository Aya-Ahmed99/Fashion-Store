import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProductNumberService } from '../../shared/services/product-number.service';
import { environment } from '../../../../environments/environment';
import { IUser } from 'src/app/models/user';
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseURL: string = environment.apiUrl;

  helper = new JwtHelperService();
  decodedToken = this.helper.decodeToken(
    JSON.parse(localStorage.getItem('user')!)?.token
  )!;
  userName = this.decodedToken?.userName;
  logged = JSON.parse(localStorage.getItem('user')!)?.loggedin || false;
  isAdmin = this.decodedToken?.role || 'user';
  userId = this.decodedToken?.id || '';
  constructor(
    private Http: HttpClient,
    private router: Router,
    private productNumberService: ProductNumberService
  ) {}

  login(user: any) {
    return this.Http.post(`${this.baseURL}login`, user);
  }
  register(user: any) {
    return this.Http.post(`${this.baseURL}register`, user);
  }

  logOut() {
    this.productNumberService.numberOfproduct = 0;
    this.logged = false;
    this.isAdmin = 'user';
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    this.router.navigateByUrl('/');
  }
}
