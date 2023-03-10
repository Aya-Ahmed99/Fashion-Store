import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toaster: ToastrService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error.message === 'Error: Not Authenticated') {
          this.toaster.error('You are not authenticated');
          this.router.navigate(['/register']);
        } else if (error.error.message.match(/duplicate/g)) {
          this.toaster.error('this account already exists!');
          this.router.navigate(['/Account/login']);
        } else {
          this.toaster.error('we face some problems, please try again');

          this.router.navigate(['/products']);
        }
        throw error;
      })
    );
  }
}
