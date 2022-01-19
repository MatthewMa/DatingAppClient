import { User } from './_models/user.model';
import { AppUser } from './_models/app-user.model';
import { AccountService } from './_services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private accountService: AccountService) {}
  ngOnInit() {
    this.getUsers();
    this.setCurrentUser();
  }

  private getUsers() {

  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }
}

