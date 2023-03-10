import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { ProductNumberService } from '../../shared/services/product-number.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  helper = new JwtHelperService();
  loginForm: any;
  isLoading = false;
  decodedToken: any;
  returnUrl =
    this.ActivatedRoute.snapshot.queryParams['returnUrl'] || '/products';

  constructor(
    private accountService: AccountService,
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    private ToastrService: ToastrService,
    public ProductNumberService: ProductNumberService
  ) {}
  ngOnInit() {
    this.goToTop();
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }
  alertUpdate() {
    this.ToastrService.success('login successfully');
  }
  get getEmail() {
    return this.loginForm.controls['email'];
  }
  get getPassword() {
    return this.loginForm.controls['password'];
  }
  onSubmit() {
    if (this.loginForm.status == 'VALID') {
      this.isLoading = true;
      this.accountService
        .login(this.loginForm.value)
        .subscribe((response: any) => {
          response.loggedin = true;
          this.alertUpdate();
          localStorage.setItem('user', JSON.stringify(response));

          this.decodedToken = this.helper.decodeToken(
            JSON.parse(localStorage.getItem('user')!).token
          )!;

          this.accountService.userName = this.decodedToken.userName;
          this.accountService.isAdmin = this.decodedToken.role;
          this.accountService.logged = true;
          this.router.navigateByUrl(this.returnUrl);

          this.isLoading = false;
        });
    }
  }
  goToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
