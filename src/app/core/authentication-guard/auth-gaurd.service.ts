import { Observable } from 'rxjs';
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
export class AuthGaurdService implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let role = this.accountService.isAdmin;

    if (role == 'admin') {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
