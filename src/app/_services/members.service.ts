import { LikeParams } from './../_models/like-prams.model';
import { LikeDto } from './../_models/likedto.model';
import { Member } from './../_models/member.model';
import { AccountService } from './account.service';
import { User } from 'src/app/_models/user.model';
import { UserParams } from './../_models/user-params.model';
import { PaginatedResult } from './../_models/pagination.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, take, map } from 'rxjs';
import { Constants } from '../_constants/constants';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  members: Member[] = [];
  userParams: UserParams;
  likeParams: LikeParams;
  public getLikeParams(): LikeParams {
    return this.likeParams;
  }
  public setLikeParams(value: LikeParams) {
    this.likeParams = value;
  }
  user: User;
  memberCache = new Map();
  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user);
    });
    this.likeParams = new LikeParams();
  }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(params: UserParams) {
    this.userParams = params;
  }

  resetUserParams() {
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }

  getMembers(userParams: UserParams) {
    var response = this.memberCache.get(Object.values(userParams).join('-'));
    this.setUserParams(userParams);
    if (response) {
      return of(response);
    }
    let params = this.setParams(userParams.pageNumber, userParams.pageSize);
    params = params.append('gender', userParams.gender)
    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('orderBy', userParams.orderBy);
    return this.getPaginaterResult<Member[]>(Constants.BASE_URL + Constants.USER_URL, params).pipe(map(response => {
      // Set to memberCache
      this.memberCache.set(Object.values(this.userParams).join('-'), response);
      return response;
    }));
  }

  private getPaginaterResult<T>(url: string, params: HttpParams) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult();
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  private setParams(pageNumber: number, pageSize: number) {
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return params;
  }

  getMemberByUserName(username: string) {
    if (this.memberCache.values()) {
      const member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: Member) => member.userName === username);
      if (member) return of(member);
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

  setMainPhoto(photoId: number) {
    return this.http.put(Constants.BASE_URL + Constants.PHOTO_SET_MAIN_URL, { id: photoId });
  }

  deletePhoto(photoId: number) {
    return this.http.delete(Constants.BASE_URL + Constants.PHOTO_DELETE_URL + photoId.toString());
  }

  addLike(username: string) {
    return this.http.post(Constants.BASE_URL + Constants.LIKES_URL + '/' +username, {});
  }

  getLikes(likeParams:LikeParams) {
    var params = new HttpParams().append(Constants.PREDICATE_PARAM, likeParams.predicate);
    params = params.append('pageSize', likeParams.pageSize);
    params = params.append('pageNumber', likeParams.pageNumber);
    params = params.append('orderBy', likeParams.orderBy);
    return this.getPaginaterResult<LikeDto[]>(Constants.BASE_URL + Constants.LIKES_URL, params);
  }
}
