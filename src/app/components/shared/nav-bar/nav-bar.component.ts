import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import {
  faCartShopping,
  faGripHorizontal,
  faStore,
  faRightFromBracket,
  faShoppingBasket,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountService } from '../../account/services/account.service';
import { ProductNumberService } from 'src/app/components/shared/services/product-number.service';
import { UserService } from '../../account/services/user.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  helper = new JwtHelperService();
  userName = this.acountService.userName;
  userId = this.acountService.userId;
  lang = 'en';
  token = JSON.parse(localStorage.getItem('user')!);
  decodedToken: any;
  cartNumber = 0;

  userSub: any;
  constructor(
    public acountService: AccountService,
    public ProductNumberService: ProductNumberService,
    private UserService: UserService,
    private router: Router,
    private ToastrService: ToastrService,
    private TranslateService: TranslateService
  ) {
    this.lang = this.TranslateService.currentLang;
  }
  changeLangauge() {
    if (this.lang == 'en') {
      localStorage.setItem('language', 'ar');
    } else {
      localStorage.setItem('language', 'en');
    }
    window.location.reload();
  }
  updateUser() {
    this.UserService.getUserById(this.userId).subscribe((res: any) => {
      this.router.navigateByUrl(`/Account/update/${res['data']._id}`);
    });
  }
  logout() {
    this.logoutAlert();

    this.acountService.logOut();
  }
  logoutAlert() {
    this.ToastrService.success('logging out...');
  }
  faCartShopping = faCartShopping;
  faGripHorizontal = faGripHorizontal;
  faStore = faStore;
  faRightFromBracket = faRightFromBracket;
  faShoppingBasket = faShoppingBasket;

  faUser = faUser;
}
