import { AccountService } from './../_services/account.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { stringify } from 'querystring';
import { User } from '../_models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isLoggedIn = false;
  currentUser$: Observable<User>;
  constructor(private accountService: AccountService ) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }

  login(loginForm: NgForm) {
    this.accountService.login(loginForm.value).subscribe((data: User) => {
      this.isLoggedIn = true;
    },error => {
      console.log(error.error);
    });
  }

  logout() {
    this.isLoggedIn = false;
    this.accountService.logout();
  }
}
