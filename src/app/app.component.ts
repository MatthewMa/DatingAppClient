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
  appUsers: AppUser[];
  constructor(private accountService: AccountService) {}
  ngOnInit() {
    this.getUsers();
    this.setCurrentUser();
  }

  private getUsers() {
    this.accountService.getUsers().subscribe((data: AppUser[]) => {
      this.appUsers = data;
    }, error => console.log(error));
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }
}

