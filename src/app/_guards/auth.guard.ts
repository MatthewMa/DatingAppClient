import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { User } from '../_models/user.model';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService: AccountService, private toastr: ToastrService, private router: Router){}
  canActivate(): Observable<boolean> {
      return this.accountService.currentUser$.pipe(map(user => {
        if (user) return true;
        this.toastr.error('You should log in first.');
        this.router.navigate(['/home']);
      }));
  }

}
