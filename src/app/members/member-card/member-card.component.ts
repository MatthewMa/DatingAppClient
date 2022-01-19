import { Router, ActivatedRoute } from '@angular/router';
import { Member } from './../../_models/member.model';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() memberInput: Member;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onMemberClick() {
    if (this.memberInput.username) {
      this.router.navigate(['/members/' + this.memberInput.username])
    }
  }

}
