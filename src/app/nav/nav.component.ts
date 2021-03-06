import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { stringify } from 'querystring';
import { User } from '../_models/user.model';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  currentUser$: Observable<User>;
  constructor(private accountService: AccountService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }

  login(loginForm: NgForm) {
    this.accountService.login(loginForm.value).subscribe((data: User) => {
      this.router.navigate(['/members'], { relativeTo: this.route });
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigate(['/home'], { relativeTo: this.route });
  }
}
