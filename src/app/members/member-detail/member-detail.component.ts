import { MessageService } from './../../_services/message.service';
import { Photo } from './../../_models/photo.model';
import { MembersService } from './../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Member } from 'src/app/_models/member.model';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery/lib/ngx-gallery-options';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Message } from 'src/app/_models/message';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('memberTabs') memberTabs: TabsetComponent;
  currentMember: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  activeTab: TabDirective;
  messages: Message[] = [];
  constructor(private route: ActivatedRoute, private memberService: MembersService, private messageService: MessageService) { }
  ngAfterViewInit(): void {
    this.route.queryParams.subscribe(params => {
      params.tab ? this.selectTab(+params.tab) : this.selectTab(0);
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.currentMember = data.member;
    });
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
    this.galleryImages = this.getImages();
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

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.messages.length === 0) {
      this.loadMessages();
    }
  }

  loadMessages() {
    this.messageService.getMessageThread(this.currentMember.userName).subscribe(messages => {
      this.messages = messages;
    });
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }
}
