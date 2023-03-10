import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseURL: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}
  getUserById(userId: any) {
    return this.httpClient.get(`${this.baseURL}users/${userId}`);
  }

  updateUser(userId: any, form: any) {
    const user = {
      id: userId,
      fullname: form.fullName,
      password: form.password,
      email: form.email,
      phone: form.phone,
      isAdmin: form.isAdmin,
    };
    return this.httpClient.patch(`${this.baseURL}users`, user);
  }
}
