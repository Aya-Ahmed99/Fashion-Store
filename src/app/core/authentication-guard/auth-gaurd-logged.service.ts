import { Injectable } from '@angular/core';
import {
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { AccountService } from '../../components/account/services/account.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGaurdLoggedService {
  constructor(private accountService: AccountService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let logged = this.accountService.logged;

    if (!logged) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
