import { NgForm } from '@angular/forms';
import { UserParams } from './../../_models/user-params.model';
import { AccountService } from './../../_services/account.service';
import { Member } from './../../_models/member.model';
import { PaginatedResult } from './../../_models/pagination.model';
import { MembersService } from './../../_services/members.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription, Observable, take } from 'rxjs';
import { Pagination } from 'src/app/_models/pagination.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { User } from 'src/app/_models/user.model';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members: Member[];
  pagination: Pagination;
  userParams: UserParams;
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];
  user: User;
  @ViewChild('form',{static: true}) filterForm: NgForm;
  constructor(private membersService:MembersService) {
    this.userParams = this.membersService.getUserParams();
  }
  ngOnInit(): void {
    this.loadMembers();
  }

  public loadMembers() {
    this.membersService.setUserParams(this.userParams);
    this.membersService.getMembers(this.userParams).subscribe((result: PaginatedResult<Member[]>) => {
      this.pagination = result.pagination;
      this.members = result.result;
    });
  }

  pageChanged(event: PageChangedEvent): void {
    this.userParams.pageNumber = event.page;
    this.loadMembers();
  }

  resetForm() {
    this.userParams = this.membersService.resetUserParams();
    this.loadMembers();
  }

}
