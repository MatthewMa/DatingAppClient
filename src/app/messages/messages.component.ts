import { ToastrService } from 'ngx-toastr';
import { Pagination } from './../_models/pagination.model';
import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  container = 'Unread';
  pageNumber = 1;
  pageSize = 3;
  loading = false;
  constructor(private messageService: MessageService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.loading = true;
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe((data) => {
      this.messages = data.result;
      this.pagination = data.pagination;
      this.loading = false;
    });
  }

  pageChanged(event: any) {
    if (event.page !== this.pageNumber) {
      this.pageNumber = event.page;
      this.loadMessages();
    }
  }

  onDeleteMessage(index: number) {
    this.messageService.deleteMessage(this.messages[index].id).subscribe(() => {
      this.toastr.success('Message delete successfully.');
      // Remove from messages
      this.messages.splice(index, 1);
    });
  }
}
