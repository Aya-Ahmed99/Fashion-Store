import {
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AccountService } from '../../components/account/services/account.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGaurdUserService implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let role = this.accountService.isAdmin;
    console.log(role);
    if (role == 'user') {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
