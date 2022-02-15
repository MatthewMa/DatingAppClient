import { Constants } from './../_constants/constants';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient
} from '@angular/common/http';
import { Observable, catchError, throwError, retry, take } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService, private http: HttpClient) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err) {
          switch (err.status) {
            case Constants.STATUS_400_CODE:
              if (err.error.errors) {
                const modalStateErrors = [];
                for (const key in err.error.errors) {
                  if (err.error.errors[key]) {
                    modalStateErrors.push(err.error.errors[key])
                  }
                }
                console.log(modalStateErrors.flat(1));
                throw modalStateErrors.flat(1);
              } else if(typeof(err.error) === 'object') {
                this.toastr.error(err.error.statusText, err.status);
              } else {
                this.toastr.error(err.error);
              }
              break;
            case Constants.STATUS_401_CODE:
              this.toastr.error(Constants.UNAUTHORIZED_TEXT, err.status);
              break;
            case Constants.STATUS_404_CODE:
              this.router.navigate(['/not-found']);
              break;
            case Constants.STATUS_500_CODE:
              const navigationExtras: NavigationExtras = { state: { error: err.error } };
              this.router.navigate(['/server-error'], navigationExtras);
              break;
            default:
              this.toastr.error('Something unexpected went wrong');
              break;
          }
        }
        return throwError(err);
      })
    );
  }
}
