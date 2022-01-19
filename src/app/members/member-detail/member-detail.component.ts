import { Photo } from './../../_models/photo.model';
import { MembersService } from './../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Member } from 'src/app/_models/member.model';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery/lib/ngx-gallery-options';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  currentMember: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(private route: ActivatedRoute, private memberService: MembersService) { }

  ngOnInit(): void {
    this.loadMemberData();
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
  }

  private loadMemberData() {
    this.route.params.pipe(take(1)).subscribe(data => {
      this.memberService.getMemberByUserName(data['username']).subscribe((member: Member) => {
        this.currentMember = member;
        this.galleryImages = this.getImages();
      });
    });
  }

  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    for (const photo of this.currentMember.photos) {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      });
    }
    return imageUrls;
  }

}
