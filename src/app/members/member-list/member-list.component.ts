import { MembersService } from './../../_services/members.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit, OnDestroy {
  members: Member[];
  membersSubscription: Subscription;
  constructor(private membersService:MembersService) { }
  ngOnDestroy(): void {
    this.membersSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.membersSubscription = this.membersService.getMembers().subscribe((members: Member[]) => {
      this.members = members;
    });
  }

}
