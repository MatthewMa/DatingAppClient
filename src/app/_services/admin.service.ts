import { UserWithRole } from './../_models/user-with-role.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../_constants/constants';
import { Subject } from 'rxjs';
import { SelectedRoles } from '../_models/selected-roles.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) { }
  rolesSelectedChange: Subject<SelectedRoles> = new Subject();
  getUsers() {
    return this.http.get<UserWithRole[]>(Constants.BASE_URL + Constants.ADMIN_URL + '/users-with-roles')
  }

  editRoles(username: string, roles: string) {
    var params = new HttpParams();
    params = params.append('roles', roles);
    return this.http.put<string[]>(Constants.BASE_URL + Constants.ADMIN_URL + '/edit-roles/' + username, {}, { params: params });
  }
}
