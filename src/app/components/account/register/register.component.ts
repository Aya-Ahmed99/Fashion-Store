import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userId: any;
  helper = new JwtHelperService();
  decodedToken: any;
  isLoading = false;
  constructor(
    private router: Router,
    private accountService: AccountService,
    private ToastrService: ToastrService
  ) {}
  ngOnInit() {
    this.goToTop();
  }
  alertUpdate() {
    this.ToastrService.success('Register successfully');
  }
  userForm = new FormGroup({
    fullname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    phone: new FormControl('', [Validators.required, Validators.minLength(11)]),
    isAdmin: new FormControl(false),
  });
  registerUser() {
    if (this.userForm.status == 'VALID') {
      console.log(this.userForm.value);
      this.isLoading = true;
      this.accountService
        .register(this.userForm.value)
        .subscribe((Response: any) => {
          console.log(Response);
          Response.loggedin = true;
          this.alertUpdate();
          localStorage.setItem('user', JSON.stringify(Response));
          this.decodedToken = this.helper.decodeToken(
            JSON.parse(localStorage.getItem('user')!).token
          )!;
          this.accountService.userName = this.decodedToken.userName;
          this.accountService.logged = true;
          this.router.navigate(['./products']);
          this.isLoading = false;
        });
    }
  }
  get getName() {
    return this.userForm.controls['fullname'];
  }
  get getEmail() {
    return this.userForm.controls['email'];
  }
  get getPassword() {
    return this.userForm.controls['password'];
  }
  get getPhone() {
    return this.userForm.controls['phone'];
  }
  goToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
