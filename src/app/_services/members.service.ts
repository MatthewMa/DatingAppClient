import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, take, map } from 'rxjs';
import { Constants } from '../_constants/constants';
import { Member } from '../_models/member.model';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  members: Member[] = [];
  constructor(private http: HttpClient) { }
  getMembers() {
    if (this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>(Constants.BASE_URL + Constants.USER_URL).pipe(map(members => {
      this.members = members;
      return members;
    }));
  }

  getMemberByUserName(username: string) {
    if (this.members.length > 0) {
      const currentMember = this.members.find(m => m.username.toLowerCase() === username.toLowerCase());
      if (currentMember) return of(currentMember);
    }
    return this.http.get<Member>(Constants.BASE_URL + Constants.USER_URL + '/' + username);
  }

  updateMember(member: Member) {
    return this.http.put(Constants.BASE_URL + Constants.USER_URL, member).pipe(map(() => {
      const index = this.members.indexOf(member);
      if (index !== -1) {
        this.members[index] = member;
      }
      return this.members;
    }));
  }
}
