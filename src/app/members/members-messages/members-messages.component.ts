import { MessageService } from 'src/app/_services/message.service';
import { NgForm } from '@angular/forms';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Message } from 'src/app/_models/message';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-members-messages',
  templateUrl: './members-messages.component.html',
  styleUrls: ['./members-messages.component.css']
})
export class MembersMessagesComponent implements OnInit {
  @Input() messages: Message[];
  @Input() userName: string;
  messageContent: string;
  currentUserName: string;
  @ViewChild('messageForm') messageForm: NgForm;
  constructor(private messageService: MessageService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe((user) => {
      this.currentUserName = user.userName;
    });
  }

  sendMesssage() {
    if (this.messageContent) {
      this.messageService.sendMessage(this.userName, this.messageContent).subscribe(message => {
        this.messages.push(message);
        this.messageForm.reset();
      });
    }
  }
}
