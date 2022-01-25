import { Register } from './../_models/register.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { Constants } from '../_constants/constants';
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(Constants.BASE_URL + Constants.USER_URL)
  }

  login(data: {username: string, password: string}) {
    return this.http.post(Constants.BASE_URL + Constants.ACCOUNT_LOGIN_URL, data).pipe(map((data: User) => {
      return this.SetUserInLocalStorage(data);
    }));
  }

  private SetUserInLocalStorage(data: User) {
    const user = data;
    if (user) {
      localStorage.setItem(Constants.LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
      this.setCurrentUser(user);
    }
    return user;
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  setCurrentUserAndLocalStoragte(user: User) {
    localStorage.setItem(Constants.LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    this.setCurrentUser(user);
  }

  logout() {
    localStorage.removeItem(Constants.LOCAL_STORAGE_USER_KEY);
    this.currentUserSource.next(null);
  }

  register(account: any) {
    return this.http.post(Constants.BASE_URL + Constants.ACCOUNT_REGISTER_URL, account).pipe(map((data:User) => {
      return this.SetUserInLocalStorage(data);
    }));
  }
}
