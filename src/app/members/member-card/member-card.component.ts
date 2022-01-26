import { Subscription } from 'rxjs';
import { LikeDto } from './../../_models/likedto.model';
import { ToastrService } from 'ngx-toastr';
import { MembersService } from './../../_services/members.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Member } from './../../_models/member.model';
import { Component, Input, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit, OnDestroy {
  @Input() memberInput: Member;
  @Input() memberMode: string;
  // getLikedSubscription: Subscription;
  addLikedSubscription: Subscription;
  constructor(private router: Router, private membersService: MembersService, private toastr: ToastrService) { }
  ngOnDestroy(): void {
    this.addLikedSubscription?.unsubscribe();
  }

  ngOnInit(): void {
  }

  onMemberClick() {
    if (this.memberInput) {
      this.router.navigate(['/members/' + this.memberInput.userName])
    }
  }

  likeOnClick() {
    const userName = this.memberInput.userName;
    this.addLikedSubscription = this.membersService.addLike(userName).subscribe(() => {
      this.toastr.success('Member liked success', 'Member liked');
    });
  }

}
