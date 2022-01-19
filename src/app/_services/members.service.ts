import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../_constants/constants';
import { Member } from '../_models/member.model';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  constructor(private http: HttpClient) { }
  getMembers() {
    return this.http.get<Member[]>(Constants.BASE_URL + Constants.USER_URL);
  }

  getMemberByUserName(username: string) {
    return this.http.get<Member>(Constants.BASE_URL + Constants.USER_URL + '/' + username);
  }
}
