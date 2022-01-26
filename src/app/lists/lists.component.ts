import { LikeParams } from './../_models/like-prams.model';
import { Subscription } from 'rxjs';
import { MembersService } from './../_services/members.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Member } from '../_models/member.model';
import { LikeDto } from '../_models/likedto.model';
import { ThisReceiver } from '@angular/compiler';
import { Pagination } from '../_models/pagination.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit, OnDestroy {
  members: LikeDto[];
  getLikedSubscription: Subscription;
  pagination: Pagination;
  likeParams: LikeParams;
  constructor(private membersService: MembersService) { }
  ngOnDestroy(): void {
    this.getLikedSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.likeParams = this.membersService.getLikeParams();
    this.loadLikes();
  }

  loadLikes() {
    this.getLikedSubscription = this.membersService.getLikes(this.likeParams).subscribe((data) => {
      this.pagination = data.pagination;
      this.members = data.result;
    });
  }

  pageChanged(event: PageChangedEvent): void {
    this.likeParams.pageNumber = event.page;
    this.loadLikes();
  }
}
