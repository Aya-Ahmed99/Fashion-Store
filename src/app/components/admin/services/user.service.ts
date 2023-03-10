import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseURL: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}
  getAllUsers() {
    return this.httpClient.get(`${this.baseURL}users`);
  }
  /*  getUserById(userId: any) {
    return this.httpClient.get(`${this.baseURL}users/${userId}`);
  } */
  /*  addNewUser(user: any) {
    return this.httpClient.post(`${this.baseURL}users`, user);
  } */

  /* updateUser(userId: any, form: any) {
    const user = {
      id: userId,
      fullname: form.fullName,
      password: form.password,
      email: form.email,
      phone: form.phone,
      isAdmin: form.isAdmin,
    };
    return this.httpClient.patch(`${this.baseURL}users`, user);
    // return this.httpClient.patch(`${this.baseURL}users`, { body: user });
    // return this.httpClient.patch(`${this.baseURL}users`, user);
  } */
  getTotalSales() {
    return this.httpClient.get(`${this.baseURL}totalsales`);
  }
  getAllOrders() {
    return this.httpClient.get(`${this.baseURL}orders`);
  }
  deletUser(userId: any) {
    return this.httpClient.delete(`${this.baseURL}users`, {
      body: { id: userId },
    });
  }
}
