import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private accountService: AccountService, private toastr: ToastrService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.accountService.currentUser$.pipe(
        map(user => {
          if (user.roles?.includes('Admin') || user.roles?.includes('Moderator')) {
            return true;
          }
          this.toastr.error('You cannot visit the page.');
        })
      );
  }

}
