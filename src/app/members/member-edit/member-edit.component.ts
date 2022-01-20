import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { MembersService } from './../../_services/members.service';
import { AccountService } from './../../_services/account.service';
import { Member } from './../../_models/member.model';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_models/user.model';
import { take } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  currentMember: Member;
  user: User;
  @ViewChild('tabForm', {static: false}) tabForm: NgForm;
  @HostListener('window:beforeunload',['$event']) unloadNotification($event: any) {
    if (this.tabForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private accountService: AccountService, private memberService: MembersService, private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.memberService.getMemberByUserName(this.user.userName).pipe(take(1)).subscribe(member => this.currentMember = member);
  }

  onSaveChanges() {
    this.memberService.updateMember(this.tabForm.value).pipe(take(1)).subscribe(user => {
      setTimeout(() => {
        this.toastr.success('Profile update successfully.');
        this.tabForm.reset(this.currentMember);
      }, 2000);
    });
  }

}
